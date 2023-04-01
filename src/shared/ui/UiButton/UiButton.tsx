import React, { ButtonHTMLAttributes, FC, MouseEvent } from 'react';
import './UiButton.scss';
import cn from 'classnames';

const UiButton: FC<UiButtonProps> = ({
  children,
  onClick,
  className,
  roundedRight,
  roundedLeft,
  variant = 'blue',
  ...meta
}) => {
  const classNames = cn(
    'ui-button',
    className,
    { 'ui-button--rounded-left': roundedLeft },
    { 'ui-button--rounded-right': roundedRight },
    `ui-button--${variant}`
  );
  return (
    <button className={classNames} onClick={onClick} {...meta}>
      {children}
    </button>
  );
};

type UiButtonProps = {
  children?: JSX.Element | string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  roundedLeft?: boolean;
  roundedRight?: boolean;
  variant?: 'blue' | 'white';
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default UiButton;
