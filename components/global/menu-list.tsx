import {
  Barcode,
  LayoutDashboard,
  Settings,
  SquareKanban,
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
      children: [
        {
          href: "/products",
          label: "Categories",
          active: pathname.includes("/products"),
          icon: <Barcode />,
        },
        {
          href: "/tags",
          label: "Tags",
          active: pathname.includes("/tags"),
          icon: <Tag />,
        },
      ],
    },
    {
      groupLabel: "Apps",
      children: [
        {
          href: "/kanban",
          label: "Kanban",
          active: pathname.includes("/kanban"),
          icon: <SquareKanban />,
        },
        {
          href: "/invoicify",
          label: "Invoicify",
          active: pathname.includes("/invoicify"),
          icon: <StickyNote />,
        },
      ],
    },
    {
      groupLabel: "Settings",
      children: [
        {
          href: "/users",
          label: "Users",
          active: pathname.includes("/users"),
          icon: <Users />,
        },
        {
          href: "/account",
          label: "Account",
          active: pathname.includes("/account"),
          icon: <Settings />,
        },
      ],
    },
  ];
};
