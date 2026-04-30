'use server'
import { supabase } from '@/lib/supabase';

export async function getExecutiveMetrics() {
  // We query the view just like a table
  const { data, error } = await supabase
    .from('site_profitability') 
    .select('*');

  if (error) throw new Error(error.message);

  // Aggregate the view data for the Global Cockpit
  const totalRevenue = data.reduce((acc, curr) => acc + curr.contract_price, 0);
  const totalProfit = data.reduce((acc, curr) => acc + curr.net_profit_margin, 0);
  const avgMargin = (totalProfit / totalRevenue) * 100;

  return {
    netMargin: avgMargin.toFixed(1) + '%',
    // Additional logic for Liquidity/Cash would come from your Finance tables
  };
}
