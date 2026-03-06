import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MUNASEB - Mutuelle Nationale de Santé des Étudiants du Burkina Faso",
  description: "La mutuelle nationale des étudiants du Burkina Faso. Remboursement à 80% de vos frais médicaux, médicaments à tarifs réduits, plafond de 100 000 FCFA/an pour seulement 5 000 FCFA de cotisation annuelle.",
  keywords: ["MUNASEB", "CENOU", "mutuelle", "santé", "étudiants", "Burkina Faso", "Ouagadougou", "assurance santé", "couverture médicale"],
  authors: [{ name: "MUNASEB - CENOU" }],
  icons: {
    icon: "/images/cenou-logo.jpg",
  },
  openGraph: {
    title: "MUNASEB - Mutuelle Nationale de Santé des Étudiants du Burkina Faso",
    description: "Protégez votre santé étudiante avec MUNASEB - Remboursement 80% de vos frais médicaux",
    url: "https://munaseb.bf",
    siteName: "MUNASEB",
    type: "website",
    locale: "fr_BF",
  },
  twitter: {
    card: "summary_large_image",
    title: "MUNASEB - Mutuelle des Étudiants du Burkina Faso",
    description: "Remboursement 80% de vos frais médicaux - Cotisation 5 000 FCFA/an",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
