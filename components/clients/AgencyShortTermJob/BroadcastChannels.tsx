"use client";

import PushNotification from "./PushNotification";
import SmsBroadcast from "./SmsBroadcast";

export function BroadcastChannels() {
  return (
    <div className="mt-6">
      <div className="grid grid-cols-2 gap-6">
        {/* SMS Column */}
        <SmsBroadcast />
        {/* Push Notification Column */}
        <PushNotification />
      </div>
    </div>
  );
}
