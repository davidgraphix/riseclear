import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InstagramButton from "@/components/InstagramButton";

export const metadata: Metadata = {
  title: "Window Cleaning in Winnipeg | RiseClear Property Services",
  description:
    "Professional streak-free window cleaning for homes and businesses in Winnipeg, Manitoba. Choose interior, exterior, or both. Add-ons available. Free quotes — call +1 431 816 4106.",
  openGraph: {
    title: "Window Cleaning in Winnipeg | RiseClear Property Services",
    description:
      "Streak-free window cleaning for Winnipeg homes and businesses. Instant estimates, flexible scheduling. Call +1 431 816 4106.",
    url: "https://risecleaning.ca/services/window-cleaning",
  },
  alternates: { canonical: "https://risecleaning.ca/services/window-cleaning" },
};

export default function WindowCleaningLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <div className="pt-[70px]">{children}</div>
      <Footer />
      <InstagramButton />
    </>
  );
}
