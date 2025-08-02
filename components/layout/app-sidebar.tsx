"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { NavGroup } from "@/components/layout/nav-group";
import { NavUser } from "@/components/layout/nav-user";
import { sidebarData } from "./sidebar-data";
import {
  EllipsisVertical,
  LayoutDashboard,
  Pencil,
  Share,
  Trash2,
} from "lucide-react";
import { Session } from "next-auth";
import React from "react";
import { toast } from "sonner";
import {
  deleteChat,
  getChatHistory,
} from "@/app/(authenticated)/chat/lib/actions";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface History {
  id: string;
  title: string;
}

export function AppSidebar({
  session,
  ...props
}: React.ComponentProps<typeof Sidebar> & { session: Session | null }) {
  const { state } = useSidebar();
  const [historyData, setHistoryData] = React.useState<History[]>([]);

  const fetchHistory = async () => {
    try {
      const response = await getChatHistory("AI Chat");

      setHistoryData(response);
    } catch (error) {
      toast.error("Error fetching history");
      throw error;
    }
  };

  React.useEffect(() => {
    fetchHistory();
  }, []);

  const handleDeleteChat = async (id: string) => {
    try {
      await deleteChat(id);
      toast.success("Chat deleted");
      fetchHistory();
    } catch (error) {
      toast.error("Failed to delete chat");
      console.error(error);
    }
  };

  return (
    <Sidebar collapsible="icon" variant="floating" {...props}>
      <SidebarHeader>
        <div className="flex w-full justify-between items-center">
          <SidebarMenuButton
            size="lg"
            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          >
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
              <LayoutDashboard className="size-4" />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">
                {session?.user?.business_name}
              </span>
              <span className="truncate text-xs">
                {session?.user?.app_name}
              </span>
            </div>
          </SidebarMenuButton>
          {state !== "collapsed" && (
            <SidebarTrigger
              variant="outline"
              className="scale-125 sm:scale-100 size-7 p-1 m-2"
            />
          )}
        </div>
        {state === "collapsed" && (
          <SidebarMenuButton size="lg" className="data-[state=open]:hidden">
            <div className="flex aspect-square size-8 items-center justify-center">
              <SidebarTrigger
                variant="outline"
                className="scale-125 sm:scale-100"
              />
            </div>
          </SidebarMenuButton>
        )}
      </SidebarHeader>
      <SidebarContent>
        {sidebarData.navGroups.map((props) => (
          <NavGroup key={props.title} {...props} />
        ))}
        <h1 className="font-semibold px-5">Chats</h1>
        {historyData.map((item) => (
          <div
            key={item.id}
            className=" mx-2 hover:bg-muted flex justify-between p-2"
          >
            <Link href={`/chat/${item.id}`}>
              <span>{item.title}</span>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <EllipsisVertical className="w-5 h-5 cursor-pointer text-muted-foreground" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Share className="w-5 h-5" /> <span>Share</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Pencil className="w-5 h-5" /> <span>Rename</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => handleDeleteChat(item.id)}
                  >
                    <Trash2 className="w-5 h-5 text-red-500" />{" "}
                    <span className="text-red-500">Delete</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={session?.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
