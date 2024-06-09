import Sidebar from "@/components/global/sidebar-navbar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full w-full">
      <Sidebar />

      <main className="flex-1 h-full overflow-y-auto p-6">{children}</main>
    </div>
  );
}
