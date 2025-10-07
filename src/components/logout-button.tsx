"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/auth/login");
    router.refresh();
  };

  return (
    <Button
      onClick={handleLogout}
      variant="outline"
      className="bg-white/10 border-white/20 text-white hover:bg-white/20"
    >
      Déconnexion
    </Button>
  );
}
