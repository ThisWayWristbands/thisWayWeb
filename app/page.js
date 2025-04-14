"use client";
import { useEffect } from "react";
import Image from "next/image";
import { auth } from "../firebase";
import { applyActionCode } from "firebase/auth";

export default function EmailVerifiedPage() {
  useEffect(() => {
    const confirmEmail = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const oobCode = urlParams.get("oobCode");

      if (oobCode) {
        try {
          await applyActionCode(auth, oobCode);
          console.log("✅ Email verified!");
          window.location.href = "thisway://emailVerified";
        } catch (err) {
          console.error("❌ Email verification failed:", err.message);
        }
      }
    };

    confirmEmail();
  }, []);

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-black">
      <div className="flex items-center justify-center">
        <Image
          className=""
          src="/adaptive-icon.png"
          alt="ThisWay logo"
          width={180}
          height={180}
          priority
        />
      </div>
    </div>
  );
}
