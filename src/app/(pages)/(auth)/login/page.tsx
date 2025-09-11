import Image from "next/image";
import LoginLogo from "@/public/svg/login/login-logo.svg";
import { LoginIntroTextEffect } from "../_components/login-intro-text-effect";
import { LoginBtnSection } from "../_components/login-btn-section";

export default function LoginPage() {
  return (
    <>
        <div className="fixed inset-0 mobile-area bg-[url('/img/login/login-background.png')] bg-cover bg-center" />
        <div className="relative w-full h-full">
          <div className="fixed top-27 mobile-area flex-center">
            <LoginLogo />
          </div>
          <div className="w-full h-full flex flex-col justify-end gap-9">
            <LoginIntroTextEffect />
            <LoginBtnSection/>
          </div>
          <div className="fixed bottom-0 mobile-area h-[50vh] bg-[linear-gradient(0deg,#0B111A_60%,rgba(14,47,47,0)_100%)] opacity-60" />
        </div>
    </>
  );
}