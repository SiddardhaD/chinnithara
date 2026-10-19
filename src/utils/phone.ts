/** "919985091823" → "+91 99850 91823" (Indian numbers), otherwise "+<digits>". */
export function formatPhone(digits: string): string {
  if (/^91\d{10}$/.test(digits)) return `+91 ${digits.slice(2, 7)} ${digits.slice(7)}`;
  return digits ? `+${digits}` : '';
}
