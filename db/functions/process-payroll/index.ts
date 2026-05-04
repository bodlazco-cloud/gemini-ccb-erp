import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-client@2"

serve(async (req) => {
  const { project_id, is_30th } = await req.json()
  
  // 1. Initialize Supabase Client
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  )

  // 2. Fetch all active employees for this project
  const { data: employees } = await supabase
    .from('employee_registry')
    .select('*')
    .eq('status', 'active')

  const records = employees.map(emp => {
    // Apply the 2025 Statutories Logic
    const basicPay = emp.monthly_basic / 2;
    const grossPay = basicPay + (emp.allowances / 2); // Simplified for demo
    
    // PhilHealth 5% Split (2.5% EE)
    const phicEE = Math.min(Math.max(grossPay * 0.025, 250), 2500);
    
    // Pag-IBIG 2% (Max 100)
    const hdmfEE = Math.min(emp.monthly_basic * 0.02, 100);

    // SSS (30th Only)
    let sssRegular = 0;
    if (is_30th) {
      const msc = Math.min(Math.max(Math.ceil(grossPay / 500) * 500, 5000), 35000);
      sssRegular = msc <= 20000 ? msc * 0.05 : 1000;
    }

    const netPay = grossPay - (phicEE + hdmfEE + sssRegular);

    return {
      employee_id: emp.id,
      project_id,
      gross_pay: grossPay,
      net_pay: netPay,
      is_second_half: is_30th,
      status: 'pending_audit'
    }
  })

  // 3. Batch Insert into payroll_records
  const { error } = await supabase.from('payroll_records').insert(records)

  return new Response(JSON.stringify({ success: !error }), { headers: { "Content-Type": "application/json" } })
})
