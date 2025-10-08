"use client";

import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { UserDropdown } from "@/components/user-dropdown";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { isPWA } from "@/lib/pwa-utils";

export function AuthHeader() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();

    // Get initial user
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };

    getUser();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);

      // Redirect to home route when user logs in and we're on landing page
      if (
        session?.user &&
        window.location.pathname === "/" &&
        !window.location.search.includes("source=pwa")
      ) {
        router.push("/");
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  // Handle initial redirect for authenticated users
  useEffect(() => {
    if (
      user &&
      window.location.pathname === "/" &&
      !window.location.search.includes("source=pwa")
    ) {
      router.push("/");
    }
  }, [user, router]);

  return (
    <header>
      <div className="container mx-auto px-4 pt-4 pb-2 md:py-4 flex justify-between items-center">
        <Link
          href="/"
          className="flex items-center gap-2 md:gap-3 hover:opacity-80 transition-opacity"
        >
          <Image
            src="/app-icon.png"
            alt="Répéter Logo"
            width={28}
            height={28}
            className="rounded-lg md:w-9 md:h-9"
          />
          <div className="flex items-center gap-2">
            <h1 className="text-xl md:text-2xl font-bold text-white">
              Répéter
            </h1>
            <span className="text-xs text-white/60 font-mono bg-white/10 px-2 py-0.5 rounded">
              v-107-MINIMAL-MANIFEST
            </span>
          </div>
        </Link>
        <div className="flex items-center gap-3">
          {loading ? (
            <div className="w-8 h-8 bg-white/20 rounded animate-pulse" />
          ) : user ? (
            <UserDropdown user={user} />
          ) : (
            <div className="flex gap-2">
              <button
                onClick={() => router.push("/auth/login")}
                className="text-white/80 hover:text-white text-sm md:text-base transition-colors"
              >
                Login
              </button>
              <span className="text-white/40">|</span>
              <button
                onClick={() => router.push("/auth/sign-up")}
                className="text-white/80 hover:text-white text-sm md:text-base transition-colors"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
