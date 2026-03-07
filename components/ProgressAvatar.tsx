import Image from "next/image";

interface ProgressAvatarProps {
  src: string;
  alt: string;
  percentage: number;
  width?: number;
  height?: number;
}

export default function ProgressAvatar({
  src,
  alt,
  percentage,
  width = 80,
  height = 80,
}: ProgressAvatarProps) {
  const strokeWidth = 5;
  const radius = (Math.min(width, height) - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  const imageSize = width - strokeWidth * 3.1;

  return (
    <div
      className="relative flex items-center justify-center flex-shrink-0"
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      {/* Circular Progress Background */}
      <svg
        className="absolute inset-0 -rotate-90"
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
      >
        {/* Background circle */}
        <circle
          cx={width / 2}
          cy={height / 2}
          r={radius}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <circle
          cx={width / 2}
          cy={height / 2}
          r={radius}
          fill="none"
          stroke="#04A755"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{
            transition: "stroke-dashoffset 0.5s ease",
          }}
        />
      </svg>

      {/* Avatar Image */}
      <div
        className="relative rounded-full overflow-hidden flex items-center justify-center"
        style={{ width: `${imageSize}px`, height: `${imageSize}px` }}
      >
        <Image
          src={src}
          alt={alt}
          width={imageSize}
          height={imageSize}
          className="object-cover rounded-full w-full h-full"
        />
        <div className=" absolute top-0 left-0 flex items-center justify-center text-whiteColor w-full h-full bg-blackColor/40 font-semibold text-sm">
          {percentage}%
        </div>
      </div>

      {/* Percentage Badge */}
      {/* <div className="absolute -top-1 -right-1 bg-white text-blackColor text-xs font-bold rounded-full w-9 h-9 flex items-center justify-center border-2 border-primaryColor shadow-sm">
        {percentage}%
      </div> */}
    </div>
  );
}
