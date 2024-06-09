"use client";

import { ElementRef, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Ellipsis, GripVertical } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { cn } from "@/lib/utils";
import { getMenuList } from "./menu-list";
import { Button } from "../ui/button";
import Link from "next/link";

export default function Sidebar() {
  const sidebarRef = useRef<ElementRef<"aside">>(null);
  const isResizingRef = useRef(false);
  const [isResetting, setIsResetting] = useState(false);
  const [isNotCollapsed, setIsNotCollapsed] = useState(false);

  const pathname = usePathname();
  const menuList = getMenuList(pathname);

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
    if (newWidth > 240) {
      setIsNotCollapsed(false);
      newWidth = 240;
    }
    if (newWidth < 56) {
      setIsNotCollapsed(true);
      newWidth = 56;
    }

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
          <ul role="list" className="flex flex-col items-start space-y-1 px-2">
            {menuList.map(({ groupLabel, children }, index) => (
              <li
                key={index}
                className={cn("w-full", groupLabel ? "pt-5" : "")}
              >
                {groupLabel && !isNotCollapsed ? (
                  <p className="text-sm font-medium text-muted-foreground px-4 pb-2 truncate">
                    {groupLabel}
                  </p>
                ) : isNotCollapsed && groupLabel ? (
                  <TooltipProvider>
                    <Tooltip delayDuration={100}>
                      <TooltipTrigger className="w-full">
                        <div className="w-full flex justify-center items-center">
                          <Ellipsis className="h-5 w-5" />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        <p>{groupLabel}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ) : null}
                {children.map(({ href, label, active, icon }, index) => (
                  <div className="w-full" key={index}>
                    <TooltipProvider disableHoverableContent>
                      <Tooltip delayDuration={100}>
                        <TooltipTrigger asChild>
                          <Button
                            variant={active ? "secondary" : "ghost"}
                            className={cn(
                              "w-full justify-start h-10 mb-1 hover:bg-gray-500/10",
                              {
                                "justify-center": isNotCollapsed,
                              }
                            )}
                            asChild
                          >
                            <Link href={href}>
                              <span
                                className={cn(
                                  !isNotCollapsed === false ? "" : "mr-4"
                                )}
                              >
                                {icon}
                              </span>
                              <p
                                className={cn(
                                  "max-w-[240px] truncate",
                                  !isNotCollapsed === false
                                    ? "-translate-x-96 opacity-0"
                                    : "translate-x-0 opacity-100"
                                )}
                              >
                                {label}
                              </p>
                            </Link>
                          </Button>
                        </TooltipTrigger>
                        {!isNotCollapsed === false && (
                          <TooltipContent side="right">{label}</TooltipContent>
                        )}
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                ))}
              </li>
            ))}
          </ul>
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
