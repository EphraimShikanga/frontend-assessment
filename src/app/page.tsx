"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import Image from "next/image";
import LoginForm from "@/components/auth/login-form";

export default function LoginPage() {
  const { user, isHydrated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isHydrated && user) {
      router.replace("/dashboard");
    }
  }, [isHydrated, user, router]);

  if (!isHydrated) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-3 border-coop-200 border-t-coop-600" />
      </div>
    );
  }

  if (user) return null;

  return (
    <div className="flex min-h-screen font-poppins">
      {/* ── Left: Background image ── */}
      <div className="relative hidden w-1/2 lg:block">
        <Image
          src="/login/bg.png"
          alt="Farmer using mobile banking"
          fill
          className="object-cover"
          priority
          sizes="50vw"
        />
        {/* Co-op Bank logo overlay */}
        <div className="absolute left-8 top-8 z-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/login/logo.svg"
            alt="Co-operative Bank of Kenya"
            className="h-16 w-auto"
          />
        </div>
      </div>

      {/* ── Right: Login form ── */}
      <div className="flex w-full flex-col items-center justify-center bg-white px-6 py-12 lg:w-1/2">
        <div className="w-full max-w-md rounded-2xl border border-[#00000029] p-8 shadow-lg shadow-black/25">
          {/* Decorative leaves */}
          <div className="mb-2 flex justify-end">
            <Image
              src="/login/green-leaves-white-background.png"
              alt=""
              width={180}
              height={100}
              className="object-contain"
              aria-hidden="true"
            />
          </div>

          {/* Heading */}
          <div className="mb-8">
            <p className="text-[20px] font-bold text-black">
              WELCOME TO
            </p>
            <h1 className="mt-1 text-3xl font-bold leading-tight text-primary-green sm:text-4xl">
              Inua Mkulima -
              <br />
              Subsidy Program
            </h1>
          </div>

          {/* Form */}
          <LoginForm />

          {/* Logo at bottom — mobile only */}
          <div className="mt-12 flex items-center justify-center lg:hidden">
            <Image
              src="/login/Logo.svg"
              alt="Murang'a County — Growing together"
              width={120}
              height={120}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
