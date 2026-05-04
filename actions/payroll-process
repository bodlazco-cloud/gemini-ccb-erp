// Updated for 2025 SSS Circular 2024-006 and PHIC 5%
export const calculateStatutories = (grossPay: number, basicPay: number, is30th: boolean) => {
  // 1. PhilHealth: 5% total, 2.5% EE share
  // Min: 250, Max: 2,500 per semi-monthly (based on 100k cap)
  const phicEE = Math.min(Math.max(grossPay * 0.025, 250), 2500);

  // 2. Pag-IBIG: 2% of basic, max 100 per semi-monthly
  const hdmfEE = Math.min(basicPay * 0.02, 100);

  // 3. SSS & MPF (Only for 30th Payday)
  let sssRegular = 0;
  let sssMPF = 0;
  let sssEC = 0;

  if (is30th) {
    // SSS MSC logic: 5% of MSC
    const msc = Math.min(Math.max(Math.ceil(grossPay / 500) * 500, 5000), 35000);
    
    if (msc <= 20000) {
      sssRegular = msc * 0.05;
    } else {
      sssRegular = 1000; // Capped at 20k MSC
      sssMPF = (msc - 20000) * 0.05; // Excess up to 35k MSC
    }
    
    // SSS EC (Employer side impact for total cost tracking)
    sssEC = grossPay > 14750 ? 30 : 10;
  }

  return { phicEE, hdmfEE, sssRegular, sssMPF, sssEC };
};
