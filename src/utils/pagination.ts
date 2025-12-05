
export function getPagination(page = 1, limit = 20) {
  const p = Number(page) || 1;
  const l = Math.min(Number(limit) || 20, 100);
  const skip = (p - 1) * l;
  const take = l; 
  return { page: p, limit: l, skip, take };
}