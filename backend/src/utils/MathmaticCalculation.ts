

export const getHoursDiff = (from: Date, to: Date = new Date()) => {
  return (to.getTime() - from.getTime()) / (1000 * 60 * 60);
};
