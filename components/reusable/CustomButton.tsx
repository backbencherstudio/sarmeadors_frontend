type ButtonProps = {
  title?: string;
  className?: string;
  onClick?: () => void;
  icon?: any;
  loading?: boolean;
  sendingMsg?: string;
  type?: "button" | "submit" | "reset";
};

export default function ButtonReuseable({
  title,
  className,
  onClick,
  icon,
  loading,
  sendingMsg,
  type,
}: ButtonProps) {
  return (
    <button
      disabled={loading}
      className={`md:py-3 disabled:bg-grayColor1 text-nowrap disabled:text-white/50 disabled:cursor-not-allowed md:px-4 text-sm md:text-base justify-center flex items-center gap-2 py-2.5 px-3 rounded-md md:rounded-lg cursor-pointer text-white bg-blackColor h-full hover:scale-105 transition-all shadow-md duration-200 ${className}`}
      onClick={onClick}
      type={type}
    >
      {loading ? (
        sendingMsg
      ) : (
        <div className=" flex  h-full items-center gap-1.5">
          {icon} {title}{" "}
        </div>
      )}
    </button>
  );
}
