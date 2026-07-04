import ClientLayout from "@/components/common/ClientLayout";
import { AppConfig } from "@/config/app.config";
import type { Metadata } from "next";
import { Archivo, Changa } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "./globals.css";
import { Toaster } from "sonner";

// If loading a variable font, you don't need to specify the font weight
const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const change = Changa({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-changa",
});
export const metadata: Metadata = {
  title: AppConfig().app.name,
  description: "Parvez Rahman",
  icons: {
    icon: "/icon/mainlogo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${archivo.className} ${change.variable} top-0!`}
      >
        <ToastContainer />
        <Toaster position="top-center" richColors />
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
