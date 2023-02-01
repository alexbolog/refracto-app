export const formatDateOnly = (date: Date) => {
  return `${date.getUTCDate()}-${date.getUTCMonth()}-${date.getUTCFullYear()}`;
};
