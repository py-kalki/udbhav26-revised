import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "UDBHAV'26 | National Level Hackathon",
  description: "Join the ultimate 36-hour hackathon experience. Innovate, Create, and Conquer at UDBHAV'26.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-body bg-background text-foreground antialiased`}
      >
        <div className="relative min-h-screen flex flex-col">
          {/* Background Grid Pattern */}
          <div className="fixed inset-0 bg-grid pointer-events-none -z-10" />
          
          <main className="flex-grow">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
