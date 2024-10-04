import { Poppins as FontSans } from "next/font/google";
import "@/styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { ScaffoldEthAppWithProviders } from "~~/components/ScaffoldEthAppWithProviders";
import { cn } from "~~/lib/utils";
import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "Scaffold-ETH 2 App",
  description: "Built with 🏗 Scaffold-ETH 2",
});

const fontSans = FontSans({
  weight: ["400", "500", "600", "700"],
  style: "normal",
  subsets: ["latin"],
  variable: "--font-sans",
});

const ScaffoldEthApp = ({ children }: { children: React.ReactNode }) => {
  return (
    <html suppressHydrationWarning>
      <body className={cn("dark min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
        <ScaffoldEthAppWithProviders>{children}</ScaffoldEthAppWithProviders>
      </body>
    </html>
  );
};

export default ScaffoldEthApp;
