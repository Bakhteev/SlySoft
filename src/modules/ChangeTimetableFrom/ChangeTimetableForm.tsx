import React, { ChangeEvent, MouseEvent, useReducer } from 'react';
import { initialState, reducer } from '@/modules/ChangeTimetableFrom/reducer';
import {
  brakeTimeOptions,
  hourTypes,
  studyRooms,
  teachersNames,
  workingDaysData,
} from '@/modules/ChangeTimetableFrom/const';
import {
  setBrakeTime,
  setDateFrom,
  setDateTo,
  setEndTime,
  setHoursPerDay,
  setHourType,
  setStartTime,
  setTotalHours,
  setWorkingDays,
} from '@/modules/ChangeTimetableFrom/actions/ChangeTimetable.actions';
import { calcDate } from '@/shared/utils/calcDate';
import { calcTime } from '@/shared/utils';
import { DaysEnum } from '@/shared/enums';
import UiButton from '../../shared/ui/UiButton/UiButton';
//TODO: add functions
const ChangeTimetableForm = () => {
  const [
    {
      totalHours,
      dateFrom,
      dateTo,
      hourType,
      brakeTime,
      hoursPerDay,
      workingDays,
      startTime,
      endTime,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const handleChangeHourType = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setHourType(+e.target.value));
    dispatch(
      setEndTime(calcTime(startTime, +e.target.value, hoursPerDay, brakeTime))
    );
  };

  const setTotalHoursFunctions = (value: number) => {
    //TODO: zero
    if (value >= 0) {
      dispatch(setTotalHours(value));
      dispatch(setDateTo(calcDate(dateFrom, value, hoursPerDay, workingDays)));
    }
  };

  const handleClickTotalHours = (value: number) => {
    return (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setTotalHoursFunctions(value);
    };
  };

  const handleChangeTotalHours = (e: ChangeEvent<HTMLInputElement>) => {
    setTotalHoursFunctions(e.target.valueAsNumber);
  };

  const handleChangeDateFrom = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setDateFrom(e.target.value));
    dispatch(
      setDateTo(calcDate(e.target.value, totalHours, hoursPerDay, workingDays))
    );
  };

  const setWorkingDaysFunction = (value: DaysEnum[]) => {
    dispatch(setWorkingDays(value));
    dispatch(setDateTo(calcDate(dateFrom, totalHours, hoursPerDay, value)));
  };

  const handleClickMultiWorkingDays = (value: DaysEnum[]) => {
    return (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setWorkingDaysFunction(value);
    };
  };

  const handleClickWorkingDays = (value: DaysEnum) => {
    return (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      let days;
      if (workingDays.includes(value)) {
        days = workingDays.filter((item) => item !== value);
      } else {
        days = workingDays.concat(value);
      }
      setWorkingDaysFunction(days);
    };
  };

  const handleChangeBrakeTime = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setBrakeTime(+e.target.value));
    dispatch(
      setEndTime(calcTime(startTime, hourType, hoursPerDay, +e.target.value))
    );
  };

  const setHoursPerDayFunction = (value: number) => {
    //TODO: zero
    if (hoursPerDay >= 0) {
      dispatch(setHoursPerDay(value));
      dispatch(setDateTo(calcDate(dateFrom, totalHours, value, workingDays)));
      dispatch(setEndTime(calcTime(startTime, hourType, value, brakeTime)));
    }
  };

  const handleClickHoursPerDay = (value: number) => {
    return (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setHoursPerDayFunction(value);
    };
  };

  const handleChangeHoursPerDay = (e: ChangeEvent<HTMLInputElement>) => {
    setHoursPerDayFunction(e.target.valueAsNumber);
  };

  const handleChangeStartTime = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setStartTime(e.target.value));
    dispatch(
      setEndTime(calcTime(e.target.value, hourType, hoursPerDay, brakeTime))
    );
  };

  return (
    <form>
      <div className={'flex'} style={{ gap: '20px' }}>
        <select onChange={handleChangeHourType} defaultValue={hourType}>
          {hourTypes.map(({ label, type }) => (
            <option key={type} value={type}>
              {label}
            </option>
          ))}
        </select>
        <div className={'flex'}>
          <UiButton roundedLeft onClick={handleClickTotalHours(totalHours - 1)}>
            -
          </UiButton>
          <input
            type="number"
            value={totalHours}
            onChange={handleChangeTotalHours}
          />
          <span
            style={{
              maxWidth: '44px',
              padding: '5px',
              fontSize: '12px',
              background: '#dfeeff',
              textAlign: 'center',
            }}
          >
            Всего часов
          </span>
          <UiButton
            roundedRight
            onClick={handleClickTotalHours(totalHours + 1)}
          >
            +
          </UiButton>
        </div>
        <div className={'flex'}>
          <input type="date" value={dateFrom} onChange={handleChangeDateFrom} />
          <span
            style={{
              padding: '10px',
              background: 'grey',
              color: 'white',
              textTransform: 'lowercase',
              textAlign: 'center',
            }}
          >
            до
          </span>
          <input disabled type="date" value={dateTo} />
        </div>
      </div>
      <div className={'flex'}>
        <UiButton
          variant={'white'}
          onClick={handleClickMultiWorkingDays([
            DaysEnum.MONDAY,
            DaysEnum.WEDNESDAY,
            DaysEnum.FRIDAY,
          ])}
        >
          пн/ср/пт
        </UiButton>
        <UiButton
          variant={'white'}
          onClick={handleClickMultiWorkingDays([
            DaysEnum.TUESDAY,
            DaysEnum.THURSDAY,
          ])}
        >
          вт/чт
        </UiButton>
        {workingDaysData.map(({ value, label }) => {
          return (
            <UiButton
              key={value}
              variant={workingDays.includes(value) ? 'blue' : 'white'}
              onClick={handleClickWorkingDays(value)}
            >
              {label}
            </UiButton>
          );
        })}
      </div>
      <div className={'flex'}>
        <select defaultValue={brakeTime} onChange={handleChangeBrakeTime}>
          {brakeTimeOptions.map(({ label, value }) => (
            <option value={value} key={value}>
              {label}
            </option>
          ))}
        </select>
        <div className={'flex'}>
          <UiButton
            roundedLeft
            onClick={handleClickHoursPerDay(hoursPerDay - 1)}
          >
            -
          </UiButton>
          <input
            type="number"
            value={hoursPerDay}
            onChange={handleChangeHoursPerDay}
          />
          <span
            style={{
              maxWidth: '44px',
              padding: '5px',
              fontSize: '12px',
              background: '#dfeeff',
              textAlign: 'center',
            }}
          >
            Часов в день
          </span>
          <UiButton
            roundedRight
            onClick={handleClickHoursPerDay(hoursPerDay + 1)}
          >
            +
          </UiButton>
        </div>
        <div className={'flex'}>
          <input
            type="time"
            value={startTime}
            onChange={handleChangeStartTime}
          />
          <span
            style={{
              padding: '10px',
              background: 'grey',
              color: 'white',
              textTransform: 'lowercase',
              textAlign: 'center',
            }}
          >
            до
          </span>
          <input type="time" value={endTime} disabled />
        </div>
      </div>
      <div className={'flex'}>
        <select>
          {teachersNames.map(({ label, value }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        <select>
          {studyRooms.map(({ label, value }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
};

export default ChangeTimetableForm;
