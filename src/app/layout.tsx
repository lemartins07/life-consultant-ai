import type { Metadata } from "next";
import "./globals.css";
import "simplebar-react/dist/simplebar.min.css";
import "swiper/swiper-bundle.css";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "Life Consultant",
  description: "Life Consultant MVP",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="dark:bg-gray-900">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
