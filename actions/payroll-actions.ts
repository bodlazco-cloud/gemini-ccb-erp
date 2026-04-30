// actions/payroll-actions.ts
export async function validateAndProcessPayroll(dept_id: string, period: string) {
  // 1. Get Logged Hours from Construction/Plant/Fleet
  const { data: loggedHours } = await supabase.rpc('get_dept_manpower_logs', { p_dept: dept_id, p_period: period });

  // 2. Get DTR Uploaded Hours
  const { data: dtrHours } = await supabase.rpc('get_dtr_summary', { p_dept: dept_id, p_period: period });

  // 3. LOCK: If DTR > Logs, flag for Audit
  if (dtrHours > loggedHours) {
    return { status: 'FLAGGED', message: 'DTR hours exceed Site Manpower Logs. Audit required.' };
  }

  // 4. PROCESS: Execute automated calculations (SSS, PhilHealth, Taxes)
  return await supabase.rpc('calculate_and_post_payroll', { p_dept: dept_id });
}
