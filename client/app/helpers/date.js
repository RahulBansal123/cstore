const dateOptions = {
  timeZone: 'UTC',
  weekday: 'long',
  year: 'numeric',
  month: 'short',
  day: 'numeric',
};

export const formatDate = (date) => {
  const newDate = new Date(date);

  return newDate.toLocaleDateString('en-US', dateOptions);
};
