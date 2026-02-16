import ClientEmailandSmsFrom from "./ClientandSmsFrom";
import EmailorMessagesent from "./EmailorMessagesent";

export default function EmailOrSmsLog() {
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Email/SMS Log</h1>
      <ClientEmailandSmsFrom />
      <hr />
      <div className="">
        <EmailorMessagesent />
      </div>
    </div>
  );
}
