const normalizeDigits = (value) => (value < 10 ? `0${value}` : value);
export const formatDate = (date) => {
  const day = normalizeDigits(date.getDate());
  const month = normalizeDigits(date.getMonth() + 1);
  const year = date.getFullYear();

  return `${year}-${month}-${day}`;
};
export const formatTime = (date) => {
  const hours = normalizeDigits(date.getHours());
  const mins = normalizeDigits(date.getMinutes());

  return `${hours}:${mins}`;
};
