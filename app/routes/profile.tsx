import { Link } from "react-router";

export default function Profile() {
  // TODO: Get the current user with supabase.auth.getUser()
  // TODO: Display user's Google profile info (name, email, avatar)
  // TODO: Implement sign out

  return (
    <div className="max-w-md mx-auto p-8 text-center">
      <h2 className="text-2xl font-bold mb-4">Your Profile</h2>
      <div className="bg-white rounded-xl shadow p-6">
        <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4" />
        <p className="text-gray-500 mb-4">
          TODO: Display Google profile info here
        </p>
        <button className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700">
          Sign Out
        </button>
      </div>
      <Link to="/" className="text-blue-600 hover:underline text-sm mt-4 inline-block">
        Back to Home
      </Link>
    </div>
  );
}