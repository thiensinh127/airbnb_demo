import { IconProps } from "@/app/utils/interface";

export default function IconClose({
  color = "#4B5565",
  width = 28,
  className = "",
}: IconProps) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={width}
      color={color}
      className={className}
    >
      <path
        fill="currentFill"
        d="M15 5L5 15M5 5L15 15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
