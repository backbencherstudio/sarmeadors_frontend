import ProgressAvatar from "../ProgressAvatar";

function UserInfo({ clientInfo }) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <ProgressAvatar
          src={clientInfo?.image_url}
          alt="User Avatar"
          percentage={70}
          width={66}
          height={66}
        />
        <div>
          <p className="text-sm text-descriptionColor">
            Welcome back, {clientInfo?.first_name}
          </p>
          <p className="text-lg md:text-xl font-semibold text-blackColor">
            Welcome, {clientInfo?.first_name}
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
