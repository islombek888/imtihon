export function getMonthRange() {
  const start = new Date();
  start.setDate(1);

  const end = new Date();
  end.setMonth(end.getMonth() + 1);
  end.setDate(0);

  return { start, end };
}