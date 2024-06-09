import {
  Barcode,
  Dock,
  LayoutDashboard,
  Settings,
  SlidersHorizontal,
  SquareKanban,
  SquareMenu,
  StickyNote,
  Tag,
  Users,
} from "lucide-react";
import { GroupMenuItem } from "@/lib/types";

export const getMenuList = (pathname: string): GroupMenuItem[] => {
  return [
    {
      groupLabel: "",
      children: [
        {
          label: "Dashboard",
          href: "/dashboard",
          active: pathname.includes("/dashboard"),
          icon: <LayoutDashboard />,
        },
      ],
    },
    {
      groupLabel: "Contents",
      icon: <SquareMenu />,
      children: [
        {
          href: "/products",
          label: "Categories",
          active: pathname.includes("/products"),
          icon: <Barcode />,
          description: "Manage product categories",
        },
        {
          href: "/tags",
          label: "Tags",
          active: pathname.includes("/tags"),
          icon: <Tag />,
          description: "Manage product tags",
        },
      ],
    },
    {
      groupLabel: "Apps",
      icon: <Dock />,
      children: [
        {
          href: "/kanban",
          label: "Kanban",
          active: pathname.includes("/kanban"),
          icon: <SquareKanban />,
          description: "Manage Kanban boards",
        },
        {
          href: "/invoicify",
          label: "Invoicify",
          active: pathname.includes("/invoicify"),
          icon: <StickyNote />,
          description: "Manage invoices",
        },
      ],
    },
    {
      groupLabel: "Settings",
      icon: <SlidersHorizontal />,
      children: [
        {
          href: "/users",
          label: "Users",
          active: pathname.includes("/users"),
          icon: <Users />,
          description: "Manage users",
        },
        {
          href: "/account",
          label: "Account",
          active: pathname.includes("/account"),
          icon: <Settings />,
          description: "Manage account settings",
        },
      ],
    },
  ];
};
