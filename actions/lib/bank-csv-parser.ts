import Papa from "papaparse";

export const parseBankCSV = (file: File): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (h) => h.toLowerCase().replace(/\s/g, "_"),
      complete: (results) => resolve(results.data),
      error: (err) => reject(err),
    });
  });
};
