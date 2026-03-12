function ArrowTopBoxIcon({ className }: { className?: string }) {
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
          d="M5.4743 0.75C3.34572 0.753832 2.23107 0.806099 1.51874 1.51855C0.75 2.28741 0.75 3.52487 0.75 5.99975C0.75 8.47469 0.75 9.71215 1.51874 10.481C2.28746 11.2499 3.52473 11.2499 5.99927 11.2499C8.47374 11.2499 9.71101 11.2499 10.4798 10.481C11.1921 9.76856 11.2443 8.65371 11.2482 6.52481M10.9908 1.03948L5.44486 6.6176M10.9908 1.03948C10.7026 0.750949 8.76148 0.777844 8.35112 0.783683M10.9908 1.03948C11.2789 1.328 11.2521 3.27166 11.2463 3.68257"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export default ArrowTopBoxIcon;
