function StarEmptyIcon({ className }: { className?: string }) {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        className={className}
      >
        <g clipPath="url(#clip0_8675_264979)">
          <path
            d="M7.23535 0.966309C7.58018 0.400242 8.41982 0.40025 8.76465 0.966309L8.83105 1.09619L10.459 5.01221L14.6895 5.35205C15.4874 5.41603 15.8111 6.41231 15.2031 6.93311L11.9805 9.69287L12.9658 13.8208C13.1513 14.5993 12.3042 15.2145 11.6211 14.7974L8 12.5854L4.37891 14.7974C3.69582 15.2145 2.84873 14.5993 3.03418 13.8208L4.01855 9.69287L0.796875 6.93311C0.188889 6.4123 0.512562 5.41603 1.31055 5.35205L5.54004 5.01221L7.16895 1.09619L7.23535 0.966309Z"
            stroke="currentColor"
          />
        </g>
        <defs>
          <clipPath id="clip0_8675_264979">
            <rect width="16" height="16" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

export default StarEmptyIcon;
