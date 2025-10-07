import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export async function AuthButton() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ? (
    <div className="flex items-center gap-4">
      <span className="text-sm text-white">Bonjour, {user.email}</span>
      <form action="/auth/logout" method="post">
        <Button
          type="submit"
          variant="outline"
          className="bg-white/10 border-white/20 text-white hover:bg-white/20"
        >
          Déconnexion
        </Button>
      </form>
    </div>
  ) : (
    <div className="flex items-center gap-2">
      <Link href="/auth/login">
        <Button
          variant="outline"
          className="bg-white/10 border-white/20 text-white hover:bg-white/20"
        >
          Connexion
        </Button>
      </Link>
      <Link href="/auth/sign-up">
        <Button className="bg-white text-[#5BA3E8] hover:bg-gray-100">
          S&apos;inscrire
        </Button>
      </Link>
    </div>
  );
}
