import { DaysEnum } from '@/shared/enums';
import {
  RESTORE_STATE,
  SET_BRAKE_TIME,
  SET_DATE_FROM,
  SET_DATE_TO,
  SET_END_TIME,
  SET_GROUP_COLOR_ID,
  SET_HOUR_TYPE,
  SET_HOURS_PER_DAY,
  SET_SCHOOL_ID,
  SET_START_TIME,
  SET_STUDY_ROOM_ID,
  SET_TEACHER_ID,
  SET_TOTAL_HOURS,
  SET_WORKING_DAYS,
} from './actions.types';

export const setTotalHours = (payload: number) => ({
  type: SET_TOTAL_HOURS,
  payload,
});

export const setDateFrom = (payload: string) => ({
  type: SET_DATE_FROM,
  payload,
});

export const setDateTo = (payload: string) => ({ type: SET_DATE_TO, payload });
export const setHourType = (payload: number) => ({
  type: SET_HOUR_TYPE,
  payload,
});

export const setBrakeTime = (payload: number) => ({
  type: SET_BRAKE_TIME,
  payload,
});

export const setHoursPerDay = (payload: number) => ({
  type: SET_HOURS_PER_DAY,
  payload,
});

export const setStartTime = (payload: string) => ({
  type: SET_START_TIME,
  payload,
});
export const setEndTime = (payload: string) => ({
  type: SET_END_TIME,
  payload,
});
export const setWorkingDays = (payload: DaysEnum[]) => ({
  type: SET_WORKING_DAYS,
  payload,
});
export const restoreState = () => ({
  type: RESTORE_STATE,
});
export const setStudyRoomId = (payload: number) => ({
  type: SET_STUDY_ROOM_ID,
  payload,
});
export const setTeacherId = (payload: number) => ({
  type: SET_TEACHER_ID,
  payload,
});
export const setSchoolId = (payload: number) => ({
  type: SET_SCHOOL_ID,
  payload,
});
export const setGroupColorId = (payload: number) => ({
  type: SET_GROUP_COLOR_ID,
  payload,
});
