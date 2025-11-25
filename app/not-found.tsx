import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-24 text-center">
      <h1 className="text-6xl font-bold text-brand-jet mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">
        Page Not Found
      </h2>
      <p className="text-gray-600 mb-8">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <div className="flex justify-center space-x-4">
        <Link
          href="/"
          className="bg-brand-blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Go Home
        </Link>
        <Link
          href="/issues"
          className="bg-brand-jet text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
        >
          Browse Issues
        </Link>
      </div>
    </div>
  );
}
