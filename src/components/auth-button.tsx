import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export async function AuthButton() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ? (
    <form action="/auth/logout" method="post">
      <Button
        type="submit"
        variant="outline"
        className="bg-white/10 border-white/20 text-white hover:bg-white/20"
      >
        Sign out
      </Button>
    </form>
  ) : (
    <div className="flex items-center gap-2">
      <Link href="/auth/login">
        <Button
          variant="outline"
          className="bg-white/10 border-white/20 text-white hover:bg-white/20"
        >
          Sign in
        </Button>
      </Link>
      <Link href="/auth/sign-up">
        <Button className="bg-white text-[#5BA3E8] hover:bg-gray-100">
          Sign up
        </Button>
      </Link>
    </div>
  );
}
