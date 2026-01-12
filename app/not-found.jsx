"use client";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 px-4">
      <h1 className="text-8xl font-extrabold text-gray-900 dark:text-gray-100">
        404
      </h1>

      <h2 className="mt-4 text-2xl font-semibold text-gray-800 dark:text-gray-200">
        Page not found
      </h2>

      <p className="mt-2 text-center text-gray-600 dark:text-gray-400 max-w-md">
        Sorry, the page you’re looking for doesn’t exist or has been moved.
      </p>

      <div className="mt-6 flex gap-4">
        <Link
          href="/"
          className="px-6 py-2 rounded-lg bg-[#0a8f3c] text-white font-medium hover:bg-[#087332] transition"
        >
          Go Home
        </Link>

        <button
          onClick={() => window.history.back()}
          className="px-6 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}
