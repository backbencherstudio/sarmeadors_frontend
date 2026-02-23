interface LoginHeaderProps {
  title?: string;
  heading?: string;
  subtitle?: string;
}

function LoginHeader({ title, heading, subtitle }: LoginHeaderProps) {
  return (
    <div>
      <div>
        <h1 className="text-2xl md:text-3xl lg:text-[32px] text-gray3Color tracking-widest font-medium text-center  font-[Changa]">
          {heading || "COAST TO COAST NANNIES"}
        </h1>
        <h2 className="text-2xl font-bold text-center text-headerColor mt-5">
          {title || " Family Login"}
        </h2>
        <p className="text-sm text-lightblackColor text-center mt-0.5">
          {subtitle || "Welcome back! Please enter your details."}
        </p>
      </div>
    </div>
  );
}

export default LoginHeader;
