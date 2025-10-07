import { AuthHeader } from "@/components/AuthHeader";
import { AppFooter } from "@/components/AppFooter";
import { SignUpForm } from "@/components/sign-up-form";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-[#5BA3E8] flex flex-col">
      <AuthHeader />
      <main className="flex-1 flex items-center justify-center p-4">
        <SignUpForm />
      </main>
      <AppFooter />
    </div>
  );
}
