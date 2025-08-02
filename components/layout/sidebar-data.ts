import { SquareMenu, SquarePen } from "lucide-react";
import { AudioWaveform, Command, GalleryVerticalEnd } from "lucide-react";
import { type SidebarData } from "./types";

export const sidebarData: SidebarData = {
  teams: [
    {
      name: "Morr appz",
      logo: Command,
      plan: "Vite + ShadcnUI",
    },
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
  ],
  navGroups: [
    {
      title: "",
      items: [
        {
          title: "New chat",
          url: "/chat",
          icon: SquarePen,
        },
      ],
    },
  ],
};
