export function getPagination(page = 1, limit = 20) {
  const take = +limit;
  const skip = (page - 1) * limit;
  return { skip, take };
}