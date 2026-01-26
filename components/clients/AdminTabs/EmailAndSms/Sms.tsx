
export default function Sms() {
    return (
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-2xl p-6">
            {/* Title */}
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Send SMS
            </h2>

            {/* Phone Number */}
            <p className="text-sm text-gray-700 mb-4">
                +8801816524119
            </p>

            {/* Template Select */}
            <div className="mb-4">
                <select className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <option>Select Template</option>
                    <option>Welcome SMS</option>
                    <option>Verification Code</option>
                </select>
            </div>

            {/* Message Box */}
            <div className="mb-4">
                <textarea
                    rows={4}
                    placeholder="Enter a description..."
                    className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>

            {/* Checkbox */}
            <div className="flex items-center gap-2 mb-5">
                <input
                    type="checkbox"
                    id="log"
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor="log" className="text-sm text-gray-700">
                    Log email as note
                </label>
            </div>

            {/* Send Button */}
            <button className="w-full bg-[#111827] text-white rounded-xl py-3 text-sm font-medium hover:bg-black transition">
                Send
            </button>
        </div>
    );
}
