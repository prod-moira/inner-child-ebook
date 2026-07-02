import Navbar from "@/components/Navbar";
import ScrollRestorationFix from "@/components/ScrollRestorationFix";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
