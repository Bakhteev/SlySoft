import React, { ChangeEvent, FC, InputHTMLAttributes } from 'react';
import cn from 'classnames';
import './UiInput.scss';

const UiInput: FC<UiInputProps> = ({
  type = 'number',
  onChange,
  className,
  roundedLeft,
  roundedRight,
  ...meta
}) => {
  const classNames = cn(
    'ui-input',
    className,
    { 'ui-input--rounded-left': roundedLeft },
    { 'ui-input--rounded-right': roundedRight }
  );

  if (type !== 'number') {
    return (
      <label className={classNames}>
        <input
          type={type}
          onChange={onChange}
          {...meta}
          onClick={(e) => e.currentTarget.showPicker()}
        />
      </label>
    );
  }

  return (
    <label className={classNames}>
      <input type={type} onChange={onChange} {...meta} />
    </label>
  );
};

type UiInputProps = {
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: 'number' | 'date' | 'time' | 'text';
  roundedLeft?: boolean;
  roundedRight?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

export default UiInput;
