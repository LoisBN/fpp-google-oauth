import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { supabase, getSupabaseStatus } from "~/lib/supabase";

type CallbackState = "loading" | "success" | "error";

interface OAuthError {
  error: string;
  errorDescription: string;
}

export default function Callback() {
  const navigate = useNavigate();
  const [state, setState] = useState<CallbackState>("loading");
  const [error, setError] = useState<OAuthError | null>(null);
  const status = getSupabaseStatus();

  useEffect(() => {
    const handleCallback = async () => {
      // Check URL for OAuth errors
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const queryParams = new URLSearchParams(window.location.search);

      const errorParam = hashParams.get("error") || queryParams.get("error");
      const errorDescription = hashParams.get("error_description") || queryParams.get("error_description");

      if (errorParam) {
        setError({
          error: errorParam,
          errorDescription: errorDescription || "An unknown error occurred",
        });
        setState("error");
        return;
      }

      // Let Supabase handle the token exchange
      const { data, error: authError } = await supabase.auth.getSession();

      if (authError) {
        setError({
          error: "Authentication Error",
          errorDescription: authError.message,
        });
        setState("error");
        return;
      }

      if (data.session) {
        setState("success");
        setTimeout(() => navigate("/profile"), 1500);
      } else {
        // No session yet, might still be processing
        const { data: userData, error: userError } = await supabase.auth.getUser();

        if (userError || !userData.user) {
          setError({
            error: "No Session Found",
            errorDescription: "The authentication flow did not complete. Please try signing in again.",
          });
          setState("error");
        } else {
          setState("success");
          setTimeout(() => navigate("/profile"), 1500);
        }
      }
    };

    handleCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="max-w-lg w-full"
      >
        {state === "loading" && <LoadingState />}
        {state === "success" && <SuccessState />}
        {state === "error" && error && (
          <ErrorState error={error} appRedirectUrl={status.appRedirectUrl} supabaseCallbackUrl={status.supabaseCallbackUrl} />
        )}
      </motion.div>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"
      />
      <h2 className="text-xl font-semibold mb-2">Completing Sign In</h2>
      <p className="text-gray-600">Please wait while we verify your credentials...</p>
    </div>
  );
}

function SuccessState() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-green-200 p-8 text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
      >
        <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </motion.div>
      <h2 className="text-xl font-semibold text-green-800 mb-2">Sign In Successful!</h2>
      <p className="text-gray-600">Redirecting to your profile...</p>
    </div>
  );
}

function ErrorState({ error, appRedirectUrl, supabaseCallbackUrl }: { error: OAuthError; appRedirectUrl: string; supabaseCallbackUrl: string }) {
  return (
    <div className="space-y-4">
      {/* Error Message */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm border border-red-200 p-6"
      >
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-red-800 mb-1">{error.error}</h2>
            <p className="text-red-600 text-sm">{error.errorDescription}</p>
          </div>
        </div>
      </motion.div>

      {/* Common Fixes */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-amber-50 border border-amber-200 rounded-xl p-6"
      >
        <h3 className="font-semibold text-amber-800 mb-3 flex items-center gap-2">
          <span>💡</span> Common Fixes
        </h3>
        <ul className="space-y-3 text-sm text-amber-700">
          <li className="flex items-start gap-2">
            <span className="text-amber-500 mt-0.5">•</span>
            <span>Check that <strong>Google provider is enabled</strong> in Supabase Dashboard → Authentication → Providers</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-500 mt-0.5">•</span>
            <span>Ensure your <strong>Google Client ID and Secret</strong> are added in Supabase</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-500 mt-0.5">•</span>
            <span>Verify the <strong>OAuth consent screen</strong> is configured in Google Cloud Console</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-500 mt-0.5">•</span>
            <span>Check that redirect URIs match <strong>exactly</strong> (no trailing slash)</span>
          </li>
        </ul>
      </motion.div>

      {/* Redirect URLs Reminder */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-blue-50 border border-blue-200 rounded-xl p-6"
      >
        <h3 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
          <span>📋</span> Required Redirect URLs
        </h3>
        <div className="space-y-3 text-sm">
          <div className="bg-white rounded-lg p-3 border border-blue-100">
            <p className="text-blue-700 font-medium mb-1">Google Cloud Console (Authorized redirect URI):</p>
            <code className="text-xs text-gray-600 break-all">{supabaseCallbackUrl}</code>
          </div>
          <div className="bg-white rounded-lg p-3 border border-blue-100">
            <p className="text-green-700 font-medium mb-1">Supabase Dashboard (Redirect URLs):</p>
            <code className="text-xs text-gray-600 break-all">{appRedirectUrl}</code>
          </div>
        </div>
      </motion.div>

      {/* Try Again Button */}
      <motion.a
        href="/"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="block w-full bg-gray-900 hover:bg-gray-800 text-white text-center py-3 rounded-lg font-medium transition-colors"
      >
        ← Try Again
      </motion.a>
    </div>
  );
}
