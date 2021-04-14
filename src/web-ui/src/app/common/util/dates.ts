export const getDate = (date: Date) => {
  const month = date.getMonth() + 1;
  let monthString = '';

  if (month < 10) {
    monthString = '0' + month;
  }

  const dateString =
    date.getFullYear() + '-' + monthString + '-' + date.getDate();

  return dateString;
};

export const getTime = (time: string) => {
  return time.slice(0, -3);
};
