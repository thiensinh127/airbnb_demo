import {
  CSSProperties,
  HTMLAttributes,
  MouseEventHandler,
  ReactNode,
} from "react";

export interface IconProps {
  color?: string;
  width?: number | string;
  height?: number | string;
  fill?: string;
  className?: HTMLAttributes<HTMLOrSVGElement>["className"];
}

export interface ModalProps {
  open?: boolean;
  title?: ReactNode;
  description?: ReactNode;
  maskClosable?: boolean;
  className?: string;
  closeClass?: string;
  okText?: string;
  outlineText?: string;
  cancelText?: string;
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
  loading?: boolean;
  disabled?: boolean;
  primaryButton?: boolean;
  outlineButton?: boolean;
  secondaryButton?: boolean;
  buttonBorder?: boolean;
  buttonFullWidth?: boolean;
  actionIcon?: ReactNode;
  children?: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
  form?: string;
  onClose?: () => void;
  onOutlineClick?: () => void;
  onSubmit?: () => void;
  onSecondaryClick?: () => void;
  hasHeader?: boolean;
  hasFooter?: boolean;
  hasCloseIcon?: boolean;
  childrenClassName?: HTMLAttributes<HTMLDivElement>["className"];
  popupClassName?: HTMLAttributes<HTMLDivElement>["className"];
  overlayClassName?: HTMLAttributes<HTMLDivElement>["className"];
  secondaryButtonClassName?: string;
  primaryButtonClassName?: string;
  renderActionContent?: React.ReactNode;
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outlined" | "text";
  color?: "primary" | "secondary" | "danger" | "success";
  size?: "sm" | "md" | "lg";
  type?: "button" | "submit" | "reset";
  /**
   * @deprecated Use className instead.
   */
  classes?: React.ComponentProps<"button">["className"];
  href?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  borderRadius?: "none" | "md" | "lg" | "full" | number;
  loading?: boolean;
}
