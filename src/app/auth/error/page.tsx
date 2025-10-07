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
    <div className="min-h-screen bg-[#5BA3E8] flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-red-600">
            Erreur d&apos;authentification
          </CardTitle>
          <CardDescription>
            Une erreur s&apos;est produite lors de la confirmation de votre
            email
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-sm text-gray-600">
            Le lien de confirmation est peut-être expiré ou invalide.
          </p>
          <div className="space-y-2">
            <Link href="/auth/sign-up">
              <Button className="w-full bg-[#5BA3E8] hover:bg-[#4A90C7]">
                Réessayer l&apos;inscription
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button variant="outline" className="w-full">
                Retour à la connexion
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
