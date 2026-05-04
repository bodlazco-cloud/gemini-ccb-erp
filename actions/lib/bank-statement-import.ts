// lib/bank-reconciler.ts
export const parseBankStatement = (csvData: any[]) => {
  return csvData.map(row => {
    const bankAmount = parseFloat(row.amount);
    const bankRef = row.reference_no;

    // Logic: Look for a matching ERP record that is 'Approved' but 'Unpaid'
    const match = findInternalRecord(bankAmount, bankRef);

    if (match) {
      return {
        ...row,
        status: 'MATCHED',
        erp_record_id: match.id,
        variance: 0
      };
    }

    return {
      ...row,
      status: 'UNRECONCILED',
      variance: bankAmount
    };
  });
};
