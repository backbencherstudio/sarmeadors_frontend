export function CancelModal({ onClose, onDelete }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      {/* Modal Box */}
      <div className="bg-white rounded-2xl p-8 max-w-lg w-full shadow-xl text-center">
        <h2 className="text-2xl font-semibold text-gray-900">
          Are you sure to cancel the interview?
        </h2>

        <p className="text-gray-900 mt-4">
          Are you sure you want to cancel the interview with
          <span className="font-semibold"> Charlotte Hamlin </span>
          for the <span className="font-semibold">After School Nanny</span>{" "}
          position? This action cannot be undone.
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={onClose}
            className="px-6 py-3 rounded-lg bg-gray-200 hover:bg-gray-300 cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={onDelete}
            className="px-6 py-3 rounded-lg bg-red-600 text-white hover:bg-red-700 cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
