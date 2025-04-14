"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { auth } from "../firebase";
import { applyActionCode } from "firebase/auth";

export default function HomePage() {
  const [verified, setVerified] = useState(false);
  const [deepLinkReady, setDeepLinkReady] = useState(false);

  useEffect(() => {
    // Ensure we’re on the client to avoid hydration issues
    setDeepLinkReady(true);
  }, []);

  useEffect(() => {
    if (!deepLinkReady) return;

    const verify = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const oobCode = urlParams.get("oobCode");

      if (!oobCode) return;

      try {
        await applyActionCode(auth, oobCode);
        setVerified(true);
        console.log("✅ Email verified");

        // Redirect to app
        window.location.href = "thisway://emailVerified";
      } catch (error) {
        console.error("❌ Verification error:", error.message);
      }
    };

    verify();
  }, [deepLinkReady]);

  if (!deepLinkReady) return null;

  const handleOpenApp = () => {
    window.location.href = "thisway://emailVerified";
  };

  return (
    <div className="w-screen h-screen bg-black flex flex-col justify-center items-center gap-8 text-white">
      <Image
        src="/adaptive-icon.png"
        alt="ThisWay logo"
        width={120}
        height={120}
      />
      {verified ? (
        <>
          <p>Email verified! 🎉</p>
          <button
            onClick={handleOpenApp}
            className="px-4 py-2 bg-cyan-500 rounded-md text-white font-bold"
          >
            Tap here to continue in the app
          </button>
        </>
      ) : (
        <p>Verifying your email...</p>
      )}
    </div>
  );
}
