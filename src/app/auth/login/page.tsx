import { AuthHeader } from "@/components/AuthHeader";
import { AppFooter } from "@/components/AppFooter";
import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#5BA3E8] flex flex-col">
      <AuthHeader />
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <LoginForm />
        </div>
      </main>
      <AppFooter />
    </div>
  );
}
