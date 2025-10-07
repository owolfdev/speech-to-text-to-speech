"use client";

import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { UserDropdown } from "@/components/user-dropdown";
import Link from "next/link";

export function AuthHeader() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

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
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <header>
      <div className="container mx-auto px-4 pt-4 pb-2 md:py-4 flex justify-between items-center">
        <div className="flex items-center gap-2 md:gap-3">
          <img
            src="/app-icon.png"
            alt="Répéter Logo"
            width={28}
            height={28}
            className="rounded-lg md:w-9 md:h-9"
          />
          <h1 className="text-xl md:text-2xl font-bold text-white">Répéter</h1>
        </div>
        <div className="flex items-center gap-3">
          {loading ? (
            <div className="w-8 h-8 bg-white/20 rounded animate-pulse" />
          ) : user ? (
            <UserDropdown user={user} />
          ) : (
            <div className="flex gap-2">
              <Link
                href="/auth/login"
                className="text-white/80 hover:text-white text-sm md:text-base transition-colors"
              >
                Login
              </Link>
              <span className="text-white/40">|</span>
              <Link
                href="/auth/sign-up"
                className="text-white/80 hover:text-white text-sm md:text-base transition-colors"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
