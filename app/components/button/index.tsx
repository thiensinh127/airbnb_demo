import IconLoading from "@/app/icons/loading";
import { ButtonProps } from "@/app/utils/interface";
import type { MouseEventHandler, ReactNode } from "react";
import React from "react";
import { buttonStyles } from "./styles";

export const Button: React.FC<ButtonProps> = ({
  variant = "default",
  color = "primary",
  size = "md",
  type = "button",
  classes = "",
  className = "",
  href = "",
  fullWidth = false,
  disabled = false,
  startIcon = null,
  endIcon = null,
  children,
  onClick,
  borderRadius = "md",
  loading = false,
  style,
  ...rest
}) => {
  const isBorderInclude = ["none", "md", "lg", "full"].includes(
    borderRadius.toString()
  );

  const loadingSize = {
    sm: 12,
    md: 16,
    lg: 20,
  };

  const renderButton = (
    <button
      className={buttonStyles.button({
        variant,
        color,
        size,
        fullWidth,
        disabled,
        borderRadius: typeof borderRadius === "number" ? "none" : borderRadius,
        className: className + classes,
      })}
      disabled={disabled || loading}
      onClick={onClick}
      type={type}
      style={{
        borderRadius: isBorderInclude ? undefined : +borderRadius,
        ...style,
      }}
      {...rest}
    >
      {loading ? (
        <IconLoading width={loadingSize[size]} />
      ) : (
        startIcon && <span className="">{startIcon}</span>
      )}
      {children}
      {!loading && endIcon && <span>{endIcon}</span>}
    </button>
  );

  if (href) {
    return <a href={href}>{renderButton}</a>;
  }
  return renderButton;
};
