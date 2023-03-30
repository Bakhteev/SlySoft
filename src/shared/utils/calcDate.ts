import moment from 'moment';
import { DaysEnum } from '@/shared/enums';

const map: Record<DaysEnum, number> = {
  пн: 1,
  вт: 2,
  ср: 3,
  чт: 4,
  пт: 5,
  сб: 6,
  вс: 0,
};

export const calcDate = (
  startDate: string,
  totalHours: number,
  hoursPerDay: number,
  workingDays: DaysEnum[]
) => {
  const localWorkingDays = workingDays.map((day) => map[day]);
  let daysNumber = Math.ceil(totalHours / hoursPerDay);
  const date = moment(startDate);
  do {
    if (localWorkingDays.includes(date.get('day'))) {
      daysNumber--;
    }
    date.add(24, 'hours');
  } while (daysNumber > 0);

  return date.add(-24, 'hours').format('yyyy-MM-DD');
};
