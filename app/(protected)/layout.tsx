import Navbar from "@/components/global/navbar";
import Sidebar from "@/components/global/sidebar";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col md:flex-row h-full w-full">
      <Sidebar className="hidden md:flex" />
      <Navbar className="flex flex-shrink-0 md:hidden" />

      <main className="flex-1 h-full overflow-y-auto p-6">{children}</main>
    </div>
  );
}
