import React, { ButtonHTMLAttributes, MouseEventHandler } from "react";

type ButtonTypes = ButtonHTMLAttributes<HTMLButtonElement>;

type ButtonProps = {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type: HTMLButtonElement["type"];
  children: React.ReactNode;
} & ButtonTypes;

const Button = ({ children, type, onClick, style, ...props }: ButtonProps) => (
  <button type={type} onClick={onClick} {...props}>
    {children}
  </button>
);

export default Button;
