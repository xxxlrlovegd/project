import dayjs from 'dayjs';

// Initialize dayjs plugins if needed
// import relativeTime from 'dayjs/plugin/relativeTime';
// dayjs.extend(relativeTime);

export const formatDate = (date: string) => {
  return dayjs(date).format('MMM D, YYYY');
};

export const isDateInRange = (date: string, startDate: any, endDate: any) => {
  if (!startDate || !endDate) return true;
  return dayjs(date).isAfter(startDate) && dayjs(date).isBefore(endDate);
};