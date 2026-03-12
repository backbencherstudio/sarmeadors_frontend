import ProgressAvatar from "../ProgressAvatar";

function UserInfo() {
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <ProgressAvatar
          src="/profile.png"
          alt="User Avatar"
          percentage={70}
          width={66}
          height={66}
        />
        <div>
          <p className="text-sm text-descriptionColor">Welcome back, Alex</p>
          <p className="text-lg md:text-xl font-semibold text-blackColor">
            Welcome, Alex 👋
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
