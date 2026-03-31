import { motion } from "framer-motion";
import { useState } from "react";
import { getSupabaseStatus } from "~/lib/supabase";

export function SetupGuide() {
  const status = getSupabaseStatus();
  const [copiedGoogle, setCopiedGoogle] = useState(false);
  const [copiedSupabase, setCopiedSupabase] = useState(false);

  const copyToClipboard = async (text: string, type: "google" | "supabase") => {
    await navigator.clipboard.writeText(text);
    if (type === "google") {
      setCopiedGoogle(true);
      setTimeout(() => setCopiedGoogle(false), 2000);
    } else {
      setCopiedSupabase(true);
      setTimeout(() => setCopiedSupabase(false), 2000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="max-w-2xl mx-auto mb-8 space-y-6"
    >
      {/* Step 1: Supabase Config */}
      {!status.configured && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-amber-50 border border-amber-200 rounded-xl p-6"
        >
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-amber-200 rounded-full flex items-center justify-center text-amber-800 font-bold text-sm flex-shrink-0">
              1
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-amber-800 text-lg mb-2">
                Connect Supabase
              </h3>
              <p className="text-amber-700 text-sm mb-4">
                Create a <code className="bg-amber-100 px-1.5 py-0.5 rounded">.env</code> file in your project root:
              </p>
              <div className="bg-amber-900 text-amber-100 rounded-lg p-4 font-mono text-sm">
                <div className="opacity-60"># .env</div>
                <div>VITE_SUPABASE_URL=https://xxxxx.supabase.co</div>
                <div>VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...</div>
              </div>
              <p className="text-amber-600 text-xs mt-3">
                Find these in Supabase Dashboard → Project Settings → API
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Step 2: Google Cloud Console */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm"
      >
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-800 font-bold text-sm flex-shrink-0">
            {status.configured ? "1" : "2"}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <h3 className="font-semibold text-gray-800 text-lg">
                Google Cloud Console
              </h3>
            </div>

            <p className="text-gray-600 text-sm mb-4">
              Add this URL to your OAuth 2.0 credentials as an <strong>Authorized redirect URI</strong>:
            </p>

            <div className="flex items-center gap-2 mb-4">
              <code className="flex-1 bg-gray-100 text-gray-800 px-4 py-2.5 rounded-lg font-mono text-sm break-all">
                {status.supabaseCallbackUrl}
              </code>
              <button
                onClick={() => copyToClipboard(status.supabaseCallbackUrl, "google")}
                className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors flex-shrink-0"
              >
                {copiedGoogle ? "Copied!" : "Copy"}
              </button>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
              <p className="font-medium text-gray-700 mb-2">Steps:</p>
              <ol className="space-y-1 list-decimal list-inside">
                <li>Go to <strong>APIs & Services → Credentials</strong></li>
                <li>Click your <strong>OAuth 2.0 Client ID</strong> (or create one)</li>
                <li>Under <strong>Authorized redirect URIs</strong>, click Add URI</li>
                <li>Paste the URL above and save</li>
              </ol>
            </div>

            <p className="text-gray-500 text-xs mt-3 flex items-center gap-1">
              <span>💡</span>
              <span>This is where Google sends users after they sign in. Supabase handles the token exchange here.</span>
            </p>
          </div>
        </div>
      </motion.div>

      {/* Step 3: Supabase Redirect URLs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm"
      >
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-800 font-bold text-sm flex-shrink-0">
            {status.configured ? "2" : "3"}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <svg className="w-5 h-5" viewBox="0 0 109 113" fill="none">
                <path d="M63.7076 110.284C60.8481 113.885 55.0502 111.912 54.9813 107.314L53.9738 40.0627L99.1935 40.0627C107.384 40.0627 111.952 49.5228 106.859 55.9374L63.7076 110.284Z" fill="url(#paint0_linear)"/>
                <path d="M63.7076 110.284C60.8481 113.885 55.0502 111.912 54.9813 107.314L53.9738 40.0627L99.1935 40.0627C107.384 40.0627 111.952 49.5228 106.859 55.9374L63.7076 110.284Z" fill="url(#paint1_linear)" fillOpacity="0.2"/>
                <path d="M45.317 2.07103C48.1765 -1.53037 53.9745 0.442937 54.0434 5.041L54.4849 72.2922H9.83113C1.64038 72.2922 -2.92775 62.8321 2.1655 56.4175L45.317 2.07103Z" fill="#3ECF8E"/>
                <defs>
                  <linearGradient id="paint0_linear" x1="53.9738" y1="54.974" x2="94.1635" y2="71.8295" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#249361"/>
                    <stop offset="1" stopColor="#3ECF8E"/>
                  </linearGradient>
                  <linearGradient id="paint1_linear" x1="36.1558" y1="30.578" x2="54.4844" y2="65.0806" gradientUnits="userSpaceOnUse">
                    <stop/>
                    <stop offset="1" stopOpacity="0"/>
                  </linearGradient>
                </defs>
              </svg>
              <h3 className="font-semibold text-gray-800 text-lg">
                Supabase Dashboard
              </h3>
            </div>

            <p className="text-gray-600 text-sm mb-4">
              Add this URL to your <strong>Redirect URLs</strong> (where users land after signing in):
            </p>

            <div className="flex items-center gap-2 mb-4">
              <code className="flex-1 bg-green-50 text-green-800 px-4 py-2.5 rounded-lg font-mono text-sm">
                {status.appRedirectUrl}
              </code>
              <button
                onClick={() => copyToClipboard(status.appRedirectUrl, "supabase")}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors flex-shrink-0"
              >
                {copiedSupabase ? "Copied!" : "Copy"}
              </button>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
              <p className="font-medium text-gray-700 mb-2">Steps:</p>
              <ol className="space-y-1 list-decimal list-inside">
                <li>Go to <strong>Authentication → URL Configuration</strong></li>
                <li>Under <strong>Redirect URLs</strong>, click Add URL</li>
                <li>Paste the URL above and save</li>
              </ol>
            </div>

            <p className="text-gray-500 text-xs mt-3 flex items-center gap-1">
              <span>💡</span>
              <span>This is your app's callback page. Supabase redirects here after authentication completes.</span>
            </p>
          </div>
        </div>
      </motion.div>

      {/* Summary Card */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="bg-blue-50 border border-blue-200 rounded-xl p-5"
      >
        <h4 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
          <span>🔄</span> How the OAuth Flow Works
        </h4>
        <div className="text-sm text-blue-700 space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center text-xs font-bold">1</span>
            <span>User clicks "Sign in with Google"</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center text-xs font-bold">2</span>
            <span>Google authenticates → redirects to <strong>Supabase callback</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center text-xs font-bold">3</span>
            <span>Supabase exchanges tokens → redirects to <strong>your app</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 bg-green-200 rounded-full flex items-center justify-center text-xs font-bold">✓</span>
            <span>User is signed in!</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function StatusBadge({ configured }: { configured: boolean }) {
  return (
    <motion.span
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
        configured
          ? "bg-green-100 text-green-700"
          : "bg-amber-100 text-amber-700"
      }`}
    >
      <span className={`w-2 h-2 rounded-full ${configured ? "bg-green-500" : "bg-amber-500"}`} />
      {configured ? "Configured" : "Setup Required"}
    </motion.span>
  );
}
