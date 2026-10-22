import type { AgeGroup, SizeCode, SizeInfo } from '../types/product';

/**
 * Size labels used across the catalogue. Garment measurements aren't listed yet;
 * add them here once confirmed with the supplier (see README → "Missing information").
 */
export const sizes: SizeInfo[] = [
  { code: 'NB', kind: 'age', label: 'NB', ageRange: 'Newborn', minMonths: 0, maxMonths: 1 },
  { code: '0-3M', kind: 'age', label: '0–3 M', ageRange: '0–3 months', minMonths: 0, maxMonths: 3 },
  { code: '3-6M', kind: 'age', label: '3–6 M', ageRange: '3–6 months', minMonths: 3, maxMonths: 6 },
  { code: '6-9M', kind: 'age', label: '6–9 M', ageRange: '6–9 months', minMonths: 6, maxMonths: 9 },
  { code: '9-12M', kind: 'age', label: '9–12 M', ageRange: '9–12 months', minMonths: 9, maxMonths: 12 },
  { code: '12-18M', kind: 'age', label: '12–18 M', ageRange: '12–18 months', minMonths: 12, maxMonths: 18 },
  { code: '18-24M', kind: 'age', label: '18–24 M', ageRange: '18–24 months', minMonths: 18, maxMonths: 24 },
  { code: '12-24M', kind: 'age', label: '12–24 M', ageRange: '12–24 months', minMonths: 12, maxMonths: 24 },
  // Dimensions from the supplier invoice. Age fields are unused for these.
  { code: '75x150CM', kind: 'dimension', label: '75 × 150 cm', ageRange: '75 × 150 cm', minMonths: 0, maxMonths: 0 },
  { code: '100x100CM', kind: 'dimension', label: '100 × 100 cm', ageRange: '100 × 100 cm', minMonths: 0, maxMonths: 0 },
  { code: '75x75CM', kind: 'dimension', label: '75 × 75 cm', ageRange: '75 × 75 cm', minMonths: 0, maxMonths: 0 },
  { code: '27x27CM', kind: 'dimension', label: '27 × 27 cm', ageRange: '27 × 27 cm', minMonths: 0, maxMonths: 0 },
];

export const ageGroups: AgeGroup[] = [
  {
    slug: '0-3-months',
    name: '0–3 months',
    description: 'Gentle first pieces for the very littlest ones.',
    minMonths: 0,
    maxMonths: 3,
  },
  {
    slug: '3-6-months',
    name: '3–6 months',
    description: 'Soft, simple outfits for growing babies.',
    minMonths: 3,
    maxMonths: 6,
  },
  {
    slug: '6-12-months',
    name: '6–12 months',
    description: 'Easy outfits for sitting, crawling and first adventures.',
    minMonths: 6,
    maxMonths: 12,
  },
  {
    slug: '12-24-months',
    name: '1–2 years',
    description: 'Playful co-ords and frocks for busy little toddlers.',
    minMonths: 12,
    maxMonths: 24,
  },
];

const sizeMap = new Map(sizes.map((s) => [s.code, s]));

export function getSize(code: SizeCode): SizeInfo {
  return sizeMap.get(code)!;
}

export function isAgeSize(code: SizeCode): boolean {
  return getSize(code).kind === 'age';
}

/** An age size belongs to an age group when their month ranges overlap. Dimension sizes never do. */
export function sizeFitsAgeGroup(code: SizeCode, group: AgeGroup): boolean {
  const s = getSize(code);
  return s.kind === 'age' && s.minMonths < group.maxMonths && s.maxMonths > group.minMonths;
}

export function sortSizes(codes: SizeCode[]): SizeCode[] {
  const order = sizes.map((s) => s.code);
  return [...codes].sort((a, b) => order.indexOf(a) - order.indexOf(b));
}
