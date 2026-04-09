export default function Limit() {
  return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg text-center text-gray-900 dark:text-gray-100">
        <div className="flex justify-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-10 h-10 text-yellow-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h1 className="text-xl font-semibold mb-2">Daily Limit Reached</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          You’ve used up all your credits for today. Please try again tomorrow.
        </p>
      </div>
    </div>
  );
}
