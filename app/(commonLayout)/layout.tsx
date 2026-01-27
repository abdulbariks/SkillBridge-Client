import { Footer } from "@/components/commonLayout/Footer";
import { Navbar } from "@/components/commonLayout/Navbar";

export default function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
