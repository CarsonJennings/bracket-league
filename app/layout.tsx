import { Poppins } from "next/font/google";
import NavBar from "@/app/ui/navbar";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ['300', '400', '600', '700']
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} antialiased`}
      >
        <NavBar />
        {children}
        {/* If there is any footer put it here */}
      </body>
    </html>
  );
}
