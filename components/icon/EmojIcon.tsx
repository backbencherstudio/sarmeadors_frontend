function EmojIcon({ className }: { className?: string }) {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="17"
        height="17"
        viewBox="0 0 17 17"
        fill="none"
        className={className}
      >
        <path
          d="M5.75 6.58333H5.75833M10.75 6.58333H10.7583M6.16667 10.75C6.43823 11.0272 6.76237 11.2474 7.12011 11.3977C7.47784 11.548 7.86197 11.6254 8.25 11.6254C8.63803 11.6254 9.02216 11.548 9.37989 11.3977C9.73763 11.2474 10.0618 11.0272 10.3333 10.75M15.75 8.25C15.75 12.3921 12.3921 15.75 8.25 15.75C4.10786 15.75 0.75 12.3921 0.75 8.25C0.75 4.10786 4.10786 0.75 8.25 0.75C12.3921 0.75 15.75 4.10786 15.75 8.25Z"
          stroke="#9DA4AE"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export default EmojIcon;
