import React, { ChangeEvent, FormEvent, MouseEvent, useReducer } from 'react';
import {
  initialState,
  reducer,
} from '@/modules/ChangeTimetableFrom/state/reducer';
import {
  brakeTimeOptions,
  hourTypes,
  studyRooms,
  teachersNames,
  workingDaysData,
} from '@/modules/ChangeTimetableFrom/const';
import {
  restoreState,
  setBrakeTime,
  setDateFrom,
  setDateTo,
  setEndTime,
  setHoursPerDay,
  setHourType,
  setStartTime,
  setStudyRoomId,
  setTeacherId,
  setTotalHours,
  setWorkingDays,
} from '@/modules/ChangeTimetableFrom/state/actions/ChangeTimetable.actions';
import { calcDate } from '@/shared/utils/calcDate';
import { calcTime } from '@/shared/utils';
import { DaysEnum } from '@/shared/enums';
import { UiButton, UiInput, UiSelect } from '@/shared/ui';
import './ChangeTimeTableForm.scss';

const ChangeTimetableForm = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    totalHours,
    dateFrom,
    dateTo,
    hourType,
    brakeTime,
    hoursPerDay,
    workingDays,
    startTime,
    endTime,
    teacherId,
    studyRoomId,
  } = state;
  const handleChangeHourType = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setHourType(+e.target.value));
    dispatch(
      setEndTime(calcTime(startTime, +e.target.value, hoursPerDay, brakeTime))
    );
  };

  const setTotalHoursFunctions = (value: number) => {
    if (value >= 1) {
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
    if (value >= 1) {
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
    console.log(e.target.valueAsNumber);
    setHoursPerDayFunction(e.target.valueAsNumber);
  };

  const handleChangeStartTime = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setStartTime(e.target.value));
    dispatch(
      setEndTime(calcTime(e.target.value, hourType, hoursPerDay, brakeTime))
    );
  };

  const handleClickCancel = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(restoreState());
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(JSON.stringify(state, null, 2));
  };

  const handleChangeStudyRoomId = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setStudyRoomId(+e.target.value));
  };

  const handleChangeTeacherId = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setTeacherId(+e.target.value));
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className={'change-timetable-form gap-20'}
    >
      <div className="change-timetable-form__header form-header flex align-items-center justify-content-space-between">
        <h2 className={'form-header__title'}>Редактирование расписания</h2>
        <button
          className={'form-header__close-btn'}
          onClick={(e) => e.preventDefault()}
        >
          &times;
        </button>
      </div>
      <div
        className={'flex flex-direction-column gap-20'}
        style={{ padding: '10px' }}
      >
        <div
          className={'flex align-items-center justify-content-space-between'}
        >
          <UiInput
            style={{
              textAlign: 'left',
            }}
            value={'Школа N'}
            type={'text'}
            disabled
            roundedLeft
            roundedRight
          />
          <div>
            <span>Цвет группы: </span>
            <span
              style={{
                marginLeft: '10px',
                display: 'inline-block',
                background: 'grey',
                border: '1px solid grey',
                width: 15,
                height: 10,
              }}
            ></span>
          </div>
        </div>
        <div className={'flex gap-20'}>
          <UiSelect
            onChange={handleChangeHourType}
            defaultValue={hourType}
            className={'flex-1'}
          >
            {hourTypes.map(({ label, type }) => (
              <option key={type} value={type}>
                {label}
              </option>
            ))}
          </UiSelect>
          <div className={'flex flex-1'}>
            <UiButton
              roundedLeft
              onClick={handleClickTotalHours(totalHours - 1)}
            >
              -
            </UiButton>
            <UiInput
              type="number"
              value={totalHours}
              onChange={handleChangeTotalHours}
            />
            <span className={'change-timetable-form__text'}>Всего часов</span>
            <UiButton
              roundedRight
              onClick={handleClickTotalHours(totalHours + 1)}
            >
              +
            </UiButton>
          </div>
          <div className={'flex flex-1'}>
            <UiInput
              type="date"
              roundedLeft
              value={dateFrom}
              onChange={handleChangeDateFrom}
            />
            <span className={'change-timetable-form__short-text'}>до</span>
            <UiInput disabled type="date" roundedRight value={dateTo} />
          </div>
        </div>
        <div className={'flex'}>
          <UiButton
            className={'flex-1 white-space-no-wrap'}
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
            className={'flex-1'}
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
                className={'flex-1'}
                key={value}
                variant={workingDays.includes(value) ? 'blue' : 'white'}
                onClick={handleClickWorkingDays(value)}
              >
                {label}
              </UiButton>
            );
          })}
        </div>
        <div className={'flex gap-20'}>
          <UiSelect
            defaultValue={brakeTime}
            onChange={handleChangeBrakeTime}
            className={'flex-1'}
          >
            {brakeTimeOptions.map(({ label, value }) => (
              <option value={value} key={value}>
                {label}
              </option>
            ))}
          </UiSelect>
          <div className={'flex flex-1'}>
            <UiButton
              roundedLeft
              onClick={handleClickHoursPerDay(hoursPerDay - 1)}
            >
              -
            </UiButton>
            <UiInput
              type="number"
              value={hoursPerDay}
              onChange={handleChangeHoursPerDay}
            />
            <span className={'change-timetable-form__text'}>Часов в день</span>
            <UiButton
              roundedRight
              onClick={handleClickHoursPerDay(hoursPerDay + 1)}
            >
              +
            </UiButton>
          </div>
          <div className={'flex flex-1'}>
            <UiInput
              type="time"
              roundedLeft
              className={'flex-1'}
              value={startTime}
              onChange={handleChangeStartTime}
            />
            <span className={'change-timetable-form__short-text'}>до</span>
            <UiInput
              roundedRight
              type="time"
              value={endTime}
              disabled
              className={'flex-1'}
            />
          </div>
        </div>
        <div className={'flex gap-20'}>
          <UiSelect
            defaultValue={teacherId}
            onChange={handleChangeTeacherId}
            className={'change-timetable-form__choose-teacher'}
          >
            {teachersNames.map(({ label, value }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </UiSelect>
          <UiSelect
            defaultValue={studyRoomId}
            onChange={handleChangeStudyRoomId}
            className={'change-timetable-form__choose-room'}
          >
            {studyRooms.map(({ label, value }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </UiSelect>
        </div>
        <div className={'change-timetable-form__info'}>
          <p>
            Выбор <b>преподователя</b> и <b>аудитории</b> не обязателен
          </p>
        </div>
        <div className={'change-timetable-form__footer form-footer flex'}>
          <button
            className={'form-footer__cancel-btn'}
            onClick={handleClickCancel}
          >
            Отмена
          </button>
          <button type={'submit'} className={'form-footer__add-btn'}>
            Добавить расписание
          </button>
        </div>
      </div>
    </form>
  );
};

export default ChangeTimetableForm;
