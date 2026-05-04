export const calculateEquipmentROI = (
  internalRevenue: number, 
  maintenanceCosts: number, 
  fuelCosts: number,
  operatorPayroll: number
) => {
  const totalOperatingExpenses = maintenanceCosts + fuelCosts + operatorPayroll;
  const netOperatingIncome = internalRevenue - totalOperatingExpenses;
  
  // Logic: "Fix or Flip"
  // If expenses exceed revenue for 3 consecutive months, flag for "Flip" (Sale)
  const healthStatus = netOperatingIncome > 0 ? 'Asset' : 'Liability';
  
  return {
    netOperatingIncome,
    healthStatus,
    efficiencyRatio: (internalRevenue / totalOperatingExpenses).toFixed(2)
  };
};
