import { defaultDateFrom } from '@/modules/ChangeTimetableFrom/const';
import {
  SET_BRAKE_TIME,
  SET_DATE_FROM,
  SET_DATE_TO,
  SET_END_TIME,
  SET_HOUR_TYPE,
  SET_HOURS_PER_DAY,
  SET_START_TIME,
  SET_TOTAL_HOURS,
  SET_WORKING_DAYS,
} from '@/modules/ChangeTimetableFrom/actions/ChangeTimetable.actions';
import { calcDate } from '@/shared/utils/calcDate';
import { DaysEnum } from '@/shared/enums';

//TODO: destruct

export interface IChangeTimetableState {
  isLoading: boolean;
  totalHours: number;
  dateFrom: string;
  dateTo: string;
  hourType: number;
  brakeTime: number;
  hoursPerDay: number;
  workingDays: DaysEnum[];
  startTime: string;
  endTime: string;
}

export interface Action {
  type: string;
  payload?: any;
}

export const initialState: IChangeTimetableState = {
  isLoading: false,
  totalHours: 1,
  dateFrom: defaultDateFrom,
  dateTo: calcDate(defaultDateFrom, 1, 1, [
    DaysEnum.MONDAY,
    DaysEnum.WEDNESDAY,
    DaysEnum.FRIDAY,
  ]),
  hourType: 0,
  brakeTime: 0,
  hoursPerDay: 1,
  workingDays: [DaysEnum.MONDAY, DaysEnum.WEDNESDAY, DaysEnum.FRIDAY],
  startTime: '07:00',
  endTime: '07:45',
};

export const reducer = (
  state: IChangeTimetableState,
  { type, payload }: Action
): IChangeTimetableState => {
  switch (type) {
    case SET_TOTAL_HOURS:
      return { ...state, totalHours: payload };
    case SET_DATE_TO:
      return { ...state, dateTo: payload };
    case SET_DATE_FROM:
      return { ...state, dateFrom: payload };
    case SET_HOUR_TYPE:
      return { ...state, hourType: payload };
    case SET_BRAKE_TIME:
      return { ...state, brakeTime: payload };
    case SET_HOURS_PER_DAY:
      return { ...state, hoursPerDay: payload };
    case SET_START_TIME:
      return { ...state, startTime: payload };
    case SET_END_TIME:
      return { ...state, endTime: payload };
    case SET_WORKING_DAYS:
      return { ...state, workingDays: payload };
    default:
      return state;
  }
};
