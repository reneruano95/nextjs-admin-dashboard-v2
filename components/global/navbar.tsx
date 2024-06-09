"use client";

import { usePathname, useRouter } from "next/navigation";
import Link, { LinkProps } from "next/link";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { getMenuList } from "./menu-list";
import { LayoutDashboard, LogOutIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Button } from "../ui/button";
import { signOut } from "@/lib/actions/auth";

export default function Navbar({ className }: React.ComponentProps<"nav">) {
  const router = useRouter();
  const pathname = usePathname();
  const menuList = getMenuList(pathname);

  return (
    <>
      <nav className={cn("relative", className)}>
        <div className="w-full h-14 bg-white shadow">
          <div className="flex items-center justify-center h-full px-4">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link
                    href="/dashboard"
                    className="flex items-center space-x-2"
                    legacyBehavior
                    passHref
                  >
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger className="w-full">
                            <LayoutDashboard />
                          </TooltipTrigger>
                          <TooltipContent side="bottom">
                            <p>Dashboard</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                {menuList.map(({ groupLabel, icon, children }, index) => (
                  <NavigationMenuItem key={index}>
                    {groupLabel && (
                      <NavigationMenuTrigger
                        className={cn(
                          "flex items-center rounded-md px-3 py-2 font-medium text-slate-700",
                          groupLabel ? "bg-slate-100" : "hover:bg-slate-100"
                        )}
                      >
                        {groupLabel && icon}
                      </NavigationMenuTrigger>
                    )}
                    <NavigationMenuContent>
                      <ul className="grid p-2 w-[300px] gap-3">
                        {children.map(
                          (
                            { href, label, active, icon, description },
                            index
                          ) => (
                            <ListItem
                              key={index}
                              title={label}
                              href={href}
                              icon={icon}
                            >
                              {description}
                            </ListItem>
                          )
                        )}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ))}
                <NavigationMenuItem>
                  <NavigationMenuLink>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className="w-full" asChild>
                          <Button
                            onClick={async () => {
                              await signOut();
                              router.push("/sign-in");
                            }}
                            variant="ghost"
                            className={cn(
                              "w-full justify-center h-10 my-5 text-destructive hover:bg-destructive/10 hover:text-destructive-foreground"
                            )}
                          >
                            <LogOutIcon />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="bottom">
                          <p>Sign Out</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
      </nav>
    </>
  );
}

const ListItem = ({ className, title, icon, children, ...props }: any) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={props.href as LinkProps["href"]}
          className={cn(
            "flex gap-2 select-none space-y-1 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="w-10 h-10 flex items-center justify-center">
            {icon}
          </div>
          <div className="flex flex-col">
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  );
};
ListItem.displayName = "ListItem";
