import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Background } from "@/components/background";
import { ChatWidget } from "@/components/chat/chat-widget";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { profile } from "@/data/profile";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${profile.name} — ${profile.title}`,
    template: `%s · ${profile.name}`,
  },
  description: profile.summary,
  keywords: ["Ahmed Fawzy Attia", "Laravel Developer", "Backend Developer", "PHP", "Low-Code", "Workflow Automation", "Cairo", "Egypt"],
  authors: [{ name: profile.name, url: profile.linkedin }],
  openGraph: {
    title: `${profile.name} — ${profile.title}`,
    description: profile.headline,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#05060f",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col overflow-x-clip font-sans">
        <Background />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
