import React, { useReducer } from 'react';
import { initialState, reducer } from '@/modules/ChangeTimetableFrom/reducer';
import {
  brakeTimeOptions,
  hourTypes,
} from '@/modules/ChangeTimetableFrom/const';
import {
  setBrakeTime,
  setDateFrom,
  setDateTo,
  setHoursPerDay,
  setHourType,
  setTotalHours,
} from '@/modules/ChangeTimetableFrom/actions/ChangeTimetable.actions';
import moment from 'moment';

const ChangeTimetableForm = () => {
  const [
    { totalHours, dateFrom, dateTo, hourType, brakeTime, hoursPerDay },
    dispatch,
  ] = useReducer(reducer, initialState);
  return (
    <form>
      <div className={'flex'}>
        <select
          onChange={(e) => {
            dispatch(setHourType(+e.target.value));
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
              if (totalHours) {
                dispatch(setTotalHours(totalHours - 1));
                dispatch(
                  setDateTo(
                    moment(dateFrom)
                      .add(totalHours, 'hours')
                      .format('yyyy-MM-DD')
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
              const n = e.target.value;
              console.log(e.target.value);
              dispatch(setTotalHours(+n));
              console.log(totalHours);
              dispatch(
                setDateTo(
                  moment(dateFrom).add(totalHours, 'hours').format('yyyy-MM-DD')
                )
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
                  moment(dateFrom).add(totalHours, 'hours').format('yyyy-MM-DD')
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
          <input
            disabled
            type="date"
            value={dateTo}
            // onChange={(e) => dispatch(setDateTo(e.target.value))}
          />
        </div>
      </div>
      <div className={'flex'}>
        <button>пн/ср/пт</button>
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
            // dispatch(setDateTo(moment(dateFrom).add()));
            dispatch(setBrakeTime(+e.target.value));
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
              if (hoursPerDay) {
                dispatch(setHoursPerDay(hoursPerDay - 1));
              }
            }}
          >
            -
          </button>
          <input
            type="text"
            value={hoursPerDay}
            onChange={(e) => dispatch(setHoursPerDay(+e.target.value))}
          />
          <span>Часов в день</span>
          <button
            onClick={(e) => {
              e.preventDefault();
              dispatch(setHoursPerDay(hoursPerDay + 1));
            }}
          >
            +
          </button>
        </div>
        <div className={'flex'}>
          <input type="time" onChange={(e) => console.log(e.target.value)} />
          <span>до</span>
          <input type="time" />
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
