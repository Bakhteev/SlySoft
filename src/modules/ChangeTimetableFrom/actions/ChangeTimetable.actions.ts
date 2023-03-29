export const TOTAL_HOURS_INC = 'TOTAL_HOURS_INC';
export const TOTAL_HOURS_DEC = 'TOTAL_HOURS_DEC';
export const SET_TOTAL_HOURS = 'SET_TOTAL_HOURS';
export const SET_DATE_FROM = 'SET_DATE_FROM';
export const SET_DATE_TO = 'SET_DATE_TO';
export const SET_HOUR_TYPE = 'SET_HOUR_TYPE';
export const SET_BRAKE_TIME = 'SET_BRAKE_TIME';

export const SET_HOURS_PER_DAY = 'SET_HOURS_PER_DAY';
export const totalHoursInc = () => ({
    type: TOTAL_HOURS_INC,
});
export const totalHoursDec = () => ({
    type: TOTAL_HOURS_DEC,
});
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
