import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { UserDropdown } from "@/components/user-dropdown";
import { NavigationFooter } from "@/components/NavigationFooter";
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
    <div className="min-h-screen bg-[#5BA3E8] flex flex-col">
      <header>
        <div className="container mx-auto px-4 pt-4 pb-2 md:py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 md:gap-3">
            <Image
              src="/app-icon.png"
              alt="Répéter Logo"
              width={28}
              height={28}
              className="rounded-lg md:w-9 md:h-9"
            />
            <h1 className="text-xl md:text-2xl font-bold text-white">
              Répéter
            </h1>
          </div>
          <UserDropdown user={user} />
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <NavigationFooter />
    </div>
  );
}
