import PronunciationPracticeSimple from "@/components/PronunciationPracticeSimple";
import { PWAInstallPrompt } from "@/components/PWAInstallPrompt";

export default function ProtectedHome() {
  return (
    <div className="container mx-auto px-4 py-6 md:py-12">
      <PronunciationPracticeSimple />
      <PWAInstallPrompt />
    </div>
  );
}
