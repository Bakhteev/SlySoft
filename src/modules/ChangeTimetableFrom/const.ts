import moment from 'moment';

export const hourTypes = [
    { label: 'Академический', type: 0 },
    { label: 'Астронамический', type: 1 },
];
export const defaultDate = moment().format('yyyy-MM-DD');

export const days = [''];

export const brakeTimeOptions = [
    { value: 0, label: 'Без перерыва' },
    { value: 1000 * 5, label: '5 мин' },
    { value: 1000 * 10, label: '10 мин' },
    { value: 1000 * 15, label: '15 мин' },
    { value: 1000 * 20, label: '20 мин' },
    { value: 1000 * 25, label: '25 мин' },
    { value: 1000 * 30, label: '30 мин' },
];

export const teachersName = [{ name: '', value: 1 }];
export const studyRooms = [{ label: '345', value: 1 }];
