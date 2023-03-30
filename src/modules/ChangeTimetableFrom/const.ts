import moment from 'moment';
import { DaysEnum } from '@/shared/enums';

export const hourTypes = [
  { label: 'Академический', type: 0 },
  { label: 'Астронамический', type: 1 },
];
export const defaultDateFrom = moment().format('yyyy-MM-DD');
export const defaultDateTo = moment().add(24, 'hours').format('yyyy-MM-DD');
export const workingDaysData = [
  {
    value: [DaysEnum.MONDAY, DaysEnum.WEDNESDAY, DaysEnum.FRIDAY],
    label: 'пн/ср/пт',
  },
  {
    value: [DaysEnum.TUESDAY, DaysEnum.THURSDAY],
    label: 'вт/чт',
  },
  {
    value: DaysEnum.MONDAY,
    label: DaysEnum.MONDAY.valueOf(),
  },
  {
    value: DaysEnum.TUESDAY,
    label: DaysEnum.TUESDAY.valueOf(),
  },
  {
    value: DaysEnum.WEDNESDAY,
    label: DaysEnum.WEDNESDAY.valueOf(),
  },
  {
    value: DaysEnum.THURSDAY,
    label: DaysEnum.THURSDAY.valueOf(),
  },
  {
    value: DaysEnum.SATURDAY,
    label: DaysEnum.SATURDAY.valueOf(),
  },
  {
    value: DaysEnum.SUNDAY,
    label: DaysEnum.SUNDAY.valueOf(),
  },
];

export const brakeTimeOptions = [
  { value: 0, label: 'Без перерыва' },
  { value: 5, label: '5 мин' },
  { value: 10, label: '10 мин' },
  { value: 15, label: '15 мин' },
  { value: 20, label: '20 мин' },
  { value: 25, label: '25 мин' },
  { value: 30, label: '30 мин' },
];

export const teachersName = [{ name: '', value: 1 }];
export const studyRooms = [{ label: '345', value: 1 }];
