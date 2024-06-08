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
    <>
      <ResizablePanelGroup
        direction="horizontal"
        className="min-h-screen w-full rounded-lg border"
      >
        <ResizablePanel
          defaultSize={25}
          className="hidden md:block md:max-w-[75px] md:min-w-[75px] bg-slate-100 border-r lg:min-w-[75px] lg:max-w-[250px]"
        >
          <div className="flex h-full items-center justify-center p-6">
            <span className="font-semibold">Sidebar</span>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle className=" hidden md:flex" />
        <ResizablePanel defaultSize={75}>
          <div className="flex flex-col h-full items-center justify-center p-6">
            {children}
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  );
}
