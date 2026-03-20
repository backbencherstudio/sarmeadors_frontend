function UploadIcon({ className }: { className?: string }) {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="11"
        height="11"
        viewBox="0 0 11 11"
        fill="none"
        className={className}
      >
        <path
          d="M5.41667 0.75L5.41667 6.58333M5.41667 0.75C5.0082 0.75 4.24506 1.91334 3.95833 2.20833M5.41667 0.75C5.82513 0.75 6.58827 1.91334 6.875 2.20833M0.75 7.75C0.75 9.19783 1.05217 9.5 2.5 9.5H8.33333C9.78117 9.5 10.0833 9.19783 10.0833 7.75"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export default UploadIcon;
