import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { UserDropdown } from "@/components/user-dropdown";
import Image from "next/image";

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
          <div className="flex items-center gap-3">
            <Image
              src="/app-icon.png"
              alt="Répéter Logo"
              width={32}
              height={32}
              className="rounded-lg"
            />
            <h1 className="text-xl font-bold text-white">Répéter</h1>
          </div>
          <UserDropdown user={user} />
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
