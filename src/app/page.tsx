import { AuthHeader } from "@/components/AuthHeader";
import { AppFooter } from "@/components/AppFooter";
import PronunciationPracticeSimple from "@/components/PronunciationPracticeSimple";
import { PWAReinstallPrompt } from "@/components/PWAReinstallPrompt";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#5BA3E8] flex flex-col">
      <AuthHeader />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-2 md:py-12">
          <PronunciationPracticeSimple />
        </div>
      </main>
      <AppFooter />
      <PWAReinstallPrompt />
    </div>
  );
}
