"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { isPWA } from "@/lib/pwa-utils";
import { MouseEvent, ReactNode } from "react";

interface PWALinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  [key: string]: unknown;
}

/**
 * Custom Link component that prevents breaking out of PWA mode on iOS Safari
 * Uses router.push in PWA mode instead of default Link behavior
 */
export function PWALink({ href, children, className, ...props }: PWALinkProps) {
  const router = useRouter();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // Only intercept in PWA mode
    if (isPWA()) {
      e.preventDefault();
      router.push(href);
    }
    // In browser mode, let Next.js Link handle it normally
  };

  return (
    <Link href={href} className={className} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}
