"use client";

import { ElementRef, useRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { GripVertical } from "lucide-react";

import { cn } from "@/lib/utils";

export default function Sidebar() {
  const isTablet = useMediaQuery("(max-width: 1023px)");

  const sidebarRef = useRef<ElementRef<"aside">>(null);
  const isResizingRef = useRef(false);
  const [isResetting, setIsResetting] = useState(false);
  const [isNotCollapsed, setIsNotCollapsed] = useState(false);

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
    event.stopPropagation();

    isResizingRef.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!isResizingRef.current) return;

    let newWidth = event.clientX;
    if (newWidth > 240) newWidth = 240;
    if (newWidth < 56) newWidth = 56;

    if (sidebarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`;
    }
  };

  const handleMouseUp = () => {
    isResizingRef.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const handleReset = () => {
    if (sidebarRef.current) {
      setIsResetting(true);
      setIsNotCollapsed(!isNotCollapsed);
      sidebarRef.current.style.width = !isNotCollapsed ? "56px" : "240px";
    }

    setTimeout(() => {
      setIsResetting(false);
    }, 300);
  };

  return (
    <>
      <aside
        ref={sidebarRef}
        className={cn(
          "h-full w-14 max-w-14  lg:w-60 lg:max-w-60 group/sidebar bg-secondary relative flex flex-col",
          isResetting && "transition-all ease-in-out duration-300"
        )}
      >
        <div>
          <p>Sidebar</p>
        </div>
        <div className="mt-4">
          <p>Menu</p>
        </div>

        <div
          onMouseDown={handleMouseDown}
          onClick={handleReset}
          className="opacity-0 flex flex-col justify-center items-center group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0"
        >
          <div className="hidden z-10 lg:flex h-4 w-3 items-center justify-center rounded-sm border bg-border">
            <GripVertical className="h-2.5 w-2.5" />
          </div>
        </div>
      </aside>
    </>
  );
}
