import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { AuthButton } from "@/components/auth-button";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  return (
    <div className="min-h-screen bg-[#5BA3E8]">
      <header className="bg-white/10 backdrop-blur-sm border-b border-white/20">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-white">Répéter</h1>
          <AuthButton />
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
