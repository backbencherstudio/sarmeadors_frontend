function DownloadIcon({ className }: { className?: string }) {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        className={className}
      >
        <path
          d="M5.9974 7.33073L5.9974 0.664062M5.9974 7.33073C5.53058 7.33073 4.65842 6.00119 4.33073 5.66406M5.9974 7.33073C6.46421 7.33073 7.33638 6.0012 7.66406 5.66406M0.664062 8.66406C0.664062 10.3187 1.0094 10.6641 2.66406 10.6641H9.33073C10.9854 10.6641 11.3307 10.3187 11.3307 8.66406"
          stroke="currentColor"
          strokeWidth="1.33"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export default DownloadIcon;
