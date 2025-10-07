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
        <div className="container mx-auto px-4 py-2 md:py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 md:gap-3">
            <Image
              src="/app-icon.png"
              alt="Répéter Logo"
              width={24}
              height={24}
              className="rounded-lg md:w-8 md:h-8"
            />
            <h1 className="text-lg md:text-xl font-bold text-white">Répéter</h1>
          </div>
          <UserDropdown user={user} />
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
