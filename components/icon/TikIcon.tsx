function TikIcon({className}: {className?: string}) {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="11"
        viewBox="0 0 16 11"
        fill="none"
        className={className}
      >
        <path
          d="M1 5.44444L5.44444 9.88889L14.3333 1"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export default TikIcon;
