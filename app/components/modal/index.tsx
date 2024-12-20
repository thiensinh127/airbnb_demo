"use client";
import { useClickOutside } from "@/app/utils/hooks/useClickOutside";
import { ModalProps } from "@/app/utils/interface";
import React, {
  CSSProperties,
  HTMLAttributes,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { Button } from "../button";
import IconClose from "@/app/icons/close";

const createContainer = () => {
  const portalId = `modalContainer`;
  let element = document.getElementById(portalId);

  if (element) {
    return element;
  }

  element = document.createElement("div");
  element.setAttribute("id", portalId);
  element.className = `fixed z-[50]`;
  document.body.appendChild(element);
  return element;
};

export const Modal: React.FC<ModalProps> = (props) => {
  const {
    title = "",
    description = "",
    className = "",
    okText = "Ok",
    outlineText = "",
    cancelText = "",
    width = 400,
    height,
    maskClosable = true,
    open = false,
    loading = false,
    disabled = false,
    primaryButton = true,
    outlineButton = false,
    secondaryButton = true,
    buttonBorder = true,
    buttonFullWidth = false,
    children = "",
    actionIcon,
    header = "",
    footer = "",
    form = "",
    hasHeader = true,
    hasFooter = true,
    hasCloseIcon = true,
    onClose = () => {},
    onOutlineClick = () => {},
    onSubmit = () => {},
    onSecondaryClick = () => {},
    childrenClassName = "",
    popupClassName = "",
    overlayClassName = "",
    secondaryButtonClassName = "",
    primaryButtonClassName = "",
    renderActionContent,
  } = props;
  const ref = useRef<HTMLDivElement>(null);
  const animateRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useClickOutside({
    ref,
    handler: maskClosable ? onClose : () => {},
  });
  const buttonFullWidthClass = buttonFullWidth
    ? "flex-1 justify-center"
    : "min-w-[100px]";

  useEffect(() => {
    const containerData = createContainer();
    setContainer(containerData);

    window.addEventListener("click", (e) => {
      const x = e.x;
      const y = e.y;
      if (ref.current && animateRef.current) {
        let element: any = ref.current;
        let distanceToLeft = 0;
        let distanceToTop = 0;
        while (element) {
          distanceToLeft += element.offsetLeft;
          distanceToTop += element.offsetTop;
          element = element.offsetParent;
        }
        const animateLeft = -(distanceToLeft - x);
        const animateTop = -(distanceToTop - y);
        animateRef.current.style.transformOrigin = `${animateLeft}px ${animateTop}px`;
      }
    });
  }, []);

  useEffect(() => {
    const htmlElement = document.querySelector("html");
    if (open) {
      animateRef.current?.classList.add("animate-modal");
      overlayRef.current?.classList.add("animate-opacity");
      document.body.classList.add("!overflow-hidden");
      if (htmlElement) htmlElement.classList.add("!overflow-hidden");
    } else {
      animateRef.current?.classList.remove("animate-modal");
      overlayRef.current?.classList.remove("animate-opacity");
    }
    return () => {
      document.body.classList.remove("!overflow-hidden");
      if (htmlElement) htmlElement.classList.remove("!overflow-hidden");
    };
  }, [open]);

  return container ? (
    createPortal(
      <>
        {open ? (
          <div className="flex text-sm">
            <div className="fixed inset-0 z-50 flex select-none items-center justify-center bg-black bg-opacity-50 outline-none focus:outline-none">
              <div
                ref={animateRef}
                className="mx-auto flex max-h-[90vh] w-auto max-w-3xl flex-col items-center justify-center"
              >
                {renderActionContent}
                <div
                  ref={ref}
                  style={{ width, height }}
                  className="relative flex max-h-[90vh] flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none"
                >
                  {hasCloseIcon && (
                    <div
                      onClick={onClose}
                      className={`absolute right-5 top-5 z-10 flex cursor-pointer p-1`}
                    >
                      {<IconClose width={20} />}
                    </div>
                  )}
                  {actionIcon ? (
                    <div className="px-6 pt-6">{actionIcon}</div>
                  ) : null}
                  {hasHeader &&
                    (header || (
                      <div className="px-6 py-5">
                        <h4 className="w-full text-lg font-bold text-text-primary">
                          {title}
                        </h4>
                        <div className="mt-1 text-text-600">{description}</div>
                      </div>
                    ))}
                  {children && (
                    <div className="px-6 pb-5" id="modalBody">
                      {children}
                    </div>
                  )}
                  {hasFooter &&
                    (footer ||
                      (secondaryButton || outlineButton || primaryButton ? (
                        <div
                          className={`flex items-center justify-end gap-4 rounded-b px-6 py-5 ${
                            buttonBorder ? "border-t border-t-border-200" : ""
                          }`}
                        >
                          {secondaryButton && (
                            <Button
                              disabled={loading}
                              onClick={onSecondaryClick}
                              variant="text"
                              color="secondary"
                              className={`${buttonFullWidthClass} ${secondaryButtonClassName}`}
                            >
                              {cancelText}
                            </Button>
                          )}
                          {outlineButton && (
                            <Button
                              disabled={loading}
                              onClick={onOutlineClick}
                              variant="outlined"
                              className={buttonFullWidthClass}
                            >
                              {outlineText}
                            </Button>
                          )}
                          {primaryButton && (
                            <Button
                              onClick={onSubmit}
                              loading={loading}
                              disabled={loading || disabled}
                              variant="default"
                              className={`${buttonFullWidthClass} ${primaryButtonClassName}`}
                              form={form}
                              type={form ? "submit" : "button"}
                            >
                              {okText}
                            </Button>
                          )}
                        </div>
                      ) : null))}
                </div>
              </div>
            </div>
            <div ref={overlayRef} className="fixed inset-0 z-40 black/40" />
          </div>
        ) : null}
      </>,
      container
    )
  ) : (
    <></>
  );
};
