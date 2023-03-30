import React, { useReducer } from 'react';
import { initialState, reducer } from '@/modules/ChangeTimetableFrom/reducer';
import {
  brakeTimeOptions,
  hourTypes,
  // workingDaysData,
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
  // setWorkingDays,
} from '@/modules/ChangeTimetableFrom/actions/ChangeTimetable.actions';
import moment from 'moment';
import { calcDate } from '@/shared/utils/calcDate';
import { calcTime } from '@/shared/utils';
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
  return (
    <form>
      <div className={'flex'}>
        <select
          onChange={(e) => {
            dispatch(setHourType(+e.target.value));
            const minutes = +e.target.value === 0 ? 45 : 60;
            dispatch(
              setEndTime(
                moment(startTime, 'HH:mm')
                  .add(minutes * hoursPerDay, 'minutes')
                  .format('HH:mm')
              )
            );
          }}
          defaultValue={hourType}
        >
          {hourTypes.map(({ label, type }) => (
            <option key={type} value={type}>
              {label}
            </option>
          ))}
        </select>
        <div className={'flex'}>
          <button
            onClick={(e) => {
              e.preventDefault();
              if (totalHours >= 2) {
                dispatch(setTotalHours(totalHours - 1));
                dispatch(
                  setDateTo(
                    calcDate(dateFrom, totalHours - 1, hoursPerDay, workingDays)
                  )
                );
              }
            }}
          >
            -
          </button>
          <input
            type="number"
            value={totalHours}
            onChange={(e) => {
              const n = e.target.valueAsNumber;
              console.log(e.target.valueAsNumber);
              dispatch(setTotalHours(n));
              dispatch(
                setDateTo(calcDate(dateFrom, n, hoursPerDay, workingDays))
              );
            }}
          />
          <span>Всего часов</span>
          <button
            onClick={(e) => {
              e.preventDefault();
              dispatch(setTotalHours(totalHours + 1));
              dispatch(
                setDateTo(
                  calcDate(dateFrom, totalHours + 1, hoursPerDay, workingDays)
                )
              );
            }}
          >
            +
          </button>
        </div>
        <div className={'flex'}>
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => dispatch(setDateFrom(e.target.value))}
          />
          <span>до</span>
          <input disabled type="date" value={dateTo} />
        </div>
      </div>
      <div className={'flex'}>
        {/*{workingDaysData.map(({value, label}) => {*/}
        {/*  if(workingDays.includes(value)){*/}
        {/*    return <button onClick={(e) => {*/}
        {/*      e.preventDefault()*/}
        {/*      // dispatch(setWorkingDays())*/}
        {/*    }*/}
        {/*    }>{label}</button>*/}
        {/*  }*/}
        {/*})}*/}
        <button>вт/чт</button>
        <button>пн</button>
        <button>вт</button>
        <button>ср</button>
        <button>чт</button>
        <button>пт</button>
        <button>сб</button>
        <button>вс</button>
      </div>
      <div className={'flex'}>
        <select
          defaultValue={brakeTime}
          onChange={(e) => {
            dispatch(setBrakeTime(+e.target.value));
            dispatch(
              setEndTime(
                calcTime(startTime, hourType, hoursPerDay, +e.target.value)
              )
            );
          }}
        >
          {brakeTimeOptions.map(({ label, value }) => (
            <option value={value} key={value}>
              {label}
            </option>
          ))}
        </select>
        <div className={'flex'}>
          <button
            onClick={(e) => {
              e.preventDefault();
              if (hoursPerDay >= 2) {
                const hours = hoursPerDay - 1;
                dispatch(setHoursPerDay(hoursPerDay - 1));
                dispatch(
                  setDateTo(
                    calcDate(dateFrom, totalHours, hoursPerDay - 1, workingDays)
                  )
                );
                dispatch(
                  setEndTime(calcTime(startTime, hourType, hours, brakeTime))
                );
              }
            }}
          >
            -
          </button>
          <input
            type="number"
            value={hoursPerDay}
            onChange={(e) => {
              const hours = e.target.valueAsNumber;
              dispatch(setHoursPerDay(hours));
              dispatch(
                setDateTo(calcDate(dateFrom, totalHours, hours, workingDays))
              );
              dispatch(
                setEndTime(calcTime(startTime, hourType, hours, brakeTime))
              );
            }}
          />
          <span>Часов в день</span>
          <button
            onClick={(e) => {
              e.preventDefault();
              const hours = hoursPerDay + 1;
              dispatch(setHoursPerDay(hours));
              dispatch(
                setDateTo(calcDate(dateFrom, totalHours, hours, workingDays))
              );
              dispatch(
                setEndTime(calcTime(startTime, hourType, hours, brakeTime))
              );
            }}
          >
            +
          </button>
        </div>
        <div className={'flex'}>
          <input
            type="time"
            value={startTime}
            onChange={(e) => {
              dispatch(setStartTime(e.target.value));
              dispatch(
                setEndTime(
                  calcTime(e.target.value, hourType, hoursPerDay, brakeTime)
                )
              );
            }}
          />
          <span>до</span>
          <input type="time" value={endTime} disabled />
        </div>
      </div>
      <div className={'flex'}>
        <select name="" id=""></select>
        <select name="" id=""></select>
      </div>
    </form>
  );
};

export default ChangeTimetableForm;
