"use client";

import { ElementRef, useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Ellipsis, GripVertical, LogOutIcon } from "lucide-react";
import { useMediaQuery } from "usehooks-ts";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { getMenuList } from "./menu-list";
import { signOut } from "@/lib/actions/auth";

export default function Sidebar({ className }: React.ComponentProps<"aside">) {
  const isLaptop = useMediaQuery("(max-width: 1023px)");

  const sidebarRef = useRef<ElementRef<"aside">>(null);
  const isResizingRef = useRef(false);
  const [isResetting, setIsResetting] = useState(false);
  const [isNotCollapsed, setIsNotCollapsed] = useState(true);

  const router = useRouter();
  const pathname = usePathname();
  const menuList = getMenuList(pathname);

  useEffect(() => {
    if (isLaptop) {
      collapse();
    } else {
      expand();
    }
  }, [isLaptop]);

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
      setIsNotCollapsed(true);
      newWidth = 240;
    }
    if (newWidth < 56) {
      setIsNotCollapsed(false);
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
    if (sidebarRef.current && !isLaptop) {
      setIsResetting(true);
      setIsNotCollapsed(!isNotCollapsed);
      sidebarRef.current.style.width = isNotCollapsed ? "56px" : "240px";

      setTimeout(() => setIsResetting(false), 300);
    }
  };

  const collapse = useCallback(() => {
    if (sidebarRef.current) {
      setIsNotCollapsed(false);
      setIsResetting(true);

      sidebarRef.current.style.width = "56px";

      setTimeout(() => setIsResetting(false), 300);
    }
  }, [isNotCollapsed]);

  const expand = useCallback(() => {
    if (sidebarRef.current) {
      setIsNotCollapsed(true);
      setIsResetting(true);

      sidebarRef.current.style.width = "240px";

      setTimeout(() => setIsResetting(false), 300);
    }
  }, [isNotCollapsed]);

  return (
    <>
      <aside
        ref={sidebarRef}
        className={cn(
          "h-full w-14 max-w-14  lg:w-60 lg:max-w-60 group/sidebar bg-secondary relative flex flex-col",
          isResetting && "transition-all ease-in-out duration-300",
          className
        )}
      >
        <Link
          className="m-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4"
          href="/"
        >
          <div className="w-32 text-white truncate">Logo</div>
        </Link>
        <div className="mt-4 flex-1">
          <ul
            role="list"
            className="h-full flex flex-col items-start space-y-2 px-2"
          >
            {menuList.map(({ groupLabel, children }, index) => (
              <li key={index} className={cn("w-full")}>
                {groupLabel && isNotCollapsed ? (
                  <p className="text-sm font-medium text-muted-foreground px-4 pb-2 truncate">
                    {groupLabel}
                  </p>
                ) : !isNotCollapsed && groupLabel ? (
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
                ) : (
                  <p className="pb-2"></p>
                )}
                {children.map(({ href, label, active, icon }, index) => (
                  <div className="w-full" key={index}>
                    <TooltipProvider disableHoverableContent>
                      <Tooltip delayDuration={100}>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            className={cn(
                              "w-full justify-start h-10 mb-1 hover:bg-gray-500/10",
                              !isNotCollapsed && "justify-center",
                              active && "bg-gray-500/10"
                            )}
                            asChild
                          >
                            <Link href={href}>
                              <span
                                className={cn(
                                  isNotCollapsed === false ? "" : "mr-4",
                                  "w-4 h-4 flex items-center justify-center"
                                )}
                              >
                                {icon}
                              </span>
                              <p
                                className={cn(
                                  "max-w-[240px] truncate",
                                  isNotCollapsed === false
                                    ? "-translate-x-96 opacity-0"
                                    : "translate-x-0 opacity-100"
                                )}
                              >
                                {label}
                              </p>
                            </Link>
                          </Button>
                        </TooltipTrigger>
                        {isNotCollapsed === false && (
                          <TooltipContent side="right">{label}</TooltipContent>
                        )}
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                ))}
              </li>
            ))}
            <li className="w-full flex-1 flex items-end">
              <TooltipProvider disableHoverableContent>
                <Tooltip delayDuration={100}>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={async () => {
                        await signOut();
                        router.push("/sign-in");
                      }}
                      variant="secondary"
                      className={cn(
                        "w-full justify-start h-10 my-5 text-destructive hover:bg-destructive/10",
                        !isNotCollapsed && "justify-center"
                      )}
                    >
                      <span
                        className={cn(isNotCollapsed === false ? "" : "mr-4")}
                      >
                        <LogOutIcon size={18} />
                      </span>
                      <p
                        className={cn(
                          "whitespace-nowrap truncate",
                          isNotCollapsed === false
                            ? "opacity-0 hidden"
                            : "opacity-100"
                        )}
                      >
                        Sign out
                      </p>
                    </Button>
                  </TooltipTrigger>
                  {isNotCollapsed === false && (
                    <TooltipContent side="right">Sign out</TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            </li>
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
