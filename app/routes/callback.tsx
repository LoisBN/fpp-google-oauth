import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function Callback() {
  const navigate = useNavigate();
  
  useEffect(() => {
    // TODO: Handle the OAuth callback
    // The URL will contain tokens after Google redirects back
    // Supabase client automatically handles the token exchange
    // After auth is complete, redirect to /profile
    
    // For now, just redirect after a short delay
    const timer = setTimeout(() => navigate("/profile"), 2000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="max-w-md mx-auto p-8 text-center">
      <p className="text-gray-600">Completing sign in...</p>
    </div>
  );
}