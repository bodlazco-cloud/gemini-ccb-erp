// actions/payroll-logic.ts
'use server'
import { supabase } from '@/lib/supabase';

export async function validatePayroll(employeeId: string, date: string, dtrHours: number) {
  // 1. Fetch the headcount log for that specific site/date
  const { data: siteLog } = await supabase
    .from('site_manpower_logs')
    .select('headcount_status')
    .eq('employee_id', employeeId)
    .eq('work_date', date)
    .single();

  // 2. Cross-match: If DTR exists but Site Log is missing, flag for variance
  if (!siteLog) {
    return { 
      status: 'FLAGGED', 
      reason: 'Employee clocked in but not recorded in Site Manpower Log.' 
    };
  }

  return { status: 'VALIDATED' };
}
