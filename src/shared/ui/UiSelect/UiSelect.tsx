import React from 'react';
import './UiSelect.scss';

const UiSelect = ({ options }: UiSelectProps) => {
    return (
        <label className={'ui-select'}>
            <select className={'ui-select__select'}>
                {options.length &&
          options.map(({ data, selected, value }) => (
              <option className={'ui-select__option'} key={value} value={value} selected={selected}>{data}</option>
          ))}
            </select>
        </label>
    );
};

interface UiSelectProps {
  options: { data: string; selected: boolean, value: string }[];
}

export default UiSelect;
