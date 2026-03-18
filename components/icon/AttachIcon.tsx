function AttachIcon({ className }: { className?: string }) {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="17"
        height="18"
        viewBox="0 0 17 18"
        fill="none"
        className={className}
      >
        <path
          d="M15.8166 7.87642L8.30355 15.3894C6.59501 17.098 3.82491 17.098 2.11637 15.3894C0.407825 13.6809 0.407825 10.9108 2.11637 9.20224L9.62938 1.68923C10.7684 0.550204 12.6151 0.550204 13.7542 1.68923C14.8932 2.82826 14.8932 4.67499 13.7542 5.81402L6.53579 13.0324C5.96627 13.6019 5.04291 13.6019 4.47339 13.0324C3.90388 12.4629 3.90388 11.5395 4.47339 10.97L10.8079 4.63551"
          stroke="currentColor"
          strokeWidth="1.67"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export default AttachIcon;
