"use client";

import { isPWA } from "@/lib/pwa-utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

export function PWAAuthNotice() {
  if (!isPWA()) return null;

  return (
    <Card className="w-full max-w-md mx-auto mb-4 border-blue-200 bg-blue-50">
      <CardHeader className="text-center pb-2">
        <CardTitle className="text-lg font-semibold text-blue-800">
          Authentication Required
        </CardTitle>
        <CardDescription className="text-blue-600">
          Please authenticate in your browser to continue
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <p className="text-sm text-blue-700 mb-3">
          For security, authentication must be completed in your browser. After
          logging in, you&apos;ll be redirected back to the app.
        </p>
        <Button
          onClick={() => {
            // Open current page in external browser
            const currentUrl = window.location.href;
            window.open(currentUrl, "_blank");
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <ExternalLink className="w-4 h-4 mr-2" />
          Open in Browser
        </Button>
      </CardContent>
    </Card>
  );
}
