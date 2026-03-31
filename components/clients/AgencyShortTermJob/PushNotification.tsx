import { useState } from "react";

const PushNotification = () => {
  const [notificationContent, setNotificationContent] = useState(`
    Hi [[name]],
    There is a new opportunity available that may be of interest to you,
    to see all of the details please visit https://nanniescoasttocoast.com/job/10776089
  `);

  const handleNotificationContentChange = (e) => {
    setNotificationContent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Push Notification Broadcasted!");
  };

  return (
    <div className="bg-white rounded-lg border p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-2">
        Push Notification
      </h2>

      <div>
        <textarea
          className="px-3 py-3.5 bg-[#FFFFFF] border rounded-[8px] mb-2 w-full"
          value={notificationContent}
          onChange={handleNotificationContentChange}
        />
      </div>

      <div>
        <p className="mt-3 text-[#111927] font-semibold">
          Use [[name]] for first name.
        </p>
        <p className="mt-3 text-[#111927] font-semibold">
          Use [[name]] for last name
        </p>
      </div>

      <div>
        <button
          className="px-6 py-4 text-white font-medium bg-[#111927] rounded-lg transition mt-2 cursor-pointer"
          onClick={handleSubmit}
        >
          Broadcast Push Notification
        </button>
      </div>

      <p className="text-sm text-[#CB121D] font-medium mt-3">
        *You need to select at least one person before you can broadcast
      </p>
    </div>
  );
};

export default PushNotification;
