export function getPagination(page = 1, limit = 20) {
  const p = Math.max(1, Number(page) || 1);
  const l = Math.max(1, Math.min(Number(limit) || 20, 100)); 
  const skip = (p - 1) * l;
  return { page: p, limit: l, skip };
}