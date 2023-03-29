import { defaultDate } from '@/modules/ChangeTimetableFrom/const';
import {
    SET_BRAKE_TIME,
    SET_DATE_FROM,
    SET_DATE_TO,
    SET_HOUR_TYPE,
    SET_HOURS_PER_DAY,
    SET_TOTAL_HOURS,
} from '@/modules/ChangeTimetableFrom/actions/ChangeTimetable.actions';

export interface IChangeTimetableState {
  isLoading: boolean;
  totalHours: number;
  dateFrom: string;
  dateTo: string;
  hourType: number;
  brakeTime: number;
  hoursPerDay: number;
}

export interface Action {
  type: string;
  payload?: any;
}

export const initialState: IChangeTimetableState = {
    isLoading: false,
    totalHours: 1,
    dateFrom: defaultDate,
    dateTo: defaultDate,
    hourType: 0,
    brakeTime: 0,
    hoursPerDay: 1,
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
    default:
        return state;
    }
};
