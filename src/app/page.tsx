import PronunciationPracticeSimple from "@/components/PronunciationPracticeSimple";
import { PWAInstallPrompt } from "@/components/PWAInstallPrompt";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#5BA3E8]">
      <div className="container mx-auto px-4 py-6 md:py-12">
        <PronunciationPracticeSimple />
      </div>
      <PWAInstallPrompt />
    </div>
  );
}
