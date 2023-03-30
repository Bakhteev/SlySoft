import moment from 'moment/moment';

export const calcTime = (
  startTime: string,
  hourType: number,
  hoursPerDay: number,
  brakeTime: number
) => {
  const minutes = hourType === 0 ? 45 : 60;
  const timeToAdd = minutes * hoursPerDay + brakeTime * (hoursPerDay - 1);
  return moment(startTime, 'HH:mm').add(timeToAdd, 'minutes').format('HH:mm');
};
