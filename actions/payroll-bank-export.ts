export const generateBankExport = (approvedPayroll: any[]) => {
  // Logic: Format data according to Philippine Bank CMS requirements
  const rows = approvedPayroll.map(record => ({
    beneficiary_account: record.account_number,
    amount: record.net_pay,
    remarks: `Payroll_${record.period_end_date}`,
    bank_code: record.bank_code
  }));

  // CSV Generation logic here...
  return convertToCSV(rows);
};
