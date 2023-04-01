import React, { ChangeEvent, ReactNode, SelectHTMLAttributes } from 'react';
import './UiSelect.scss';
import cn from 'classnames';

const UiSelect = ({
  children,
  onChange,
  defaultValue,
  className,
  ...meta
}: UiSelectProps) => {
  const classNames = cn('ui-select', className);
  return (
    <label className={classNames} defaultValue={defaultValue}>
      <select onChange={onChange} {...meta} className={'ui-select__select'}>
        {children}
      </select>
    </label>
  );
};

type UiSelectProps = {
  children?: ReactNode;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
  defaultValue?: string | number | readonly string[] | undefined;
} & SelectHTMLAttributes<HTMLSelectElement>;

export default UiSelect;
