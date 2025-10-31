import { parse } from 'csv-parse';

export async function parseLeadsCsv(buffer) {
  return new Promise((resolve, reject) => {
    const leads = [];
    const parser = parse({ columns: true, skip_empty_lines: true, trim: true });
    parser.on('readable', () => {
      let record;
      while ((record = parser.read()) !== null) leads.push(record);
    });
    parser.on('error', reject);
    parser.on('end', () => resolve(leads));
    parser.write(buffer);
    parser.end();
  });
}
