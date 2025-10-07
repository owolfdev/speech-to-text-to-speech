import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AuthErrorPage() {
  return (
    <div className="flex items-center justify-center min-h-full p-4">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-red-600">
            Authentication Error
          </CardTitle>
          <CardDescription>
            An error occurred while confirming your email
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-sm text-gray-600">
            The confirmation link may be expired or invalid.
          </p>
          <div className="space-y-2">
            <Link href="/auth/sign-up">
              <Button className="w-full bg-[#5BA3E8] hover:bg-[#4A90C7]">
                Try signing up again
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button variant="outline" className="w-full">
                Back to sign in
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
