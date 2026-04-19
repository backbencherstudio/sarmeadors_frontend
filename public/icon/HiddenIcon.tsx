export const HiddenIcon = ({ className }: { className?: string }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 16 16"
    fill="none"
    className={className}
  >
    <path
      d="M3 13c0-2.5 1.5-4 5-4s5 1.5 5 4"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M4 5.5c0 1.5 1.5 3 4 3s4-1.5 4-3"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
      fill="none"
      strokeDasharray="2 1.5"
    />
  </svg>
);
