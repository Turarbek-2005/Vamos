export interface IMenuItem {
  name: string;
  url: string;
  icon: string;
}

export const MENU_DATA: IMenuItem[] = [
  {
    name: "Home",
    icon: "humbleicons:home",
    url: "/",
  },
  {
    name: "Create",
    icon: "ion:add-circle-outline",
    url: "/create",
  },
  {
    name: "Settings",
    icon: "radix-icons:gear",
    url: "/settings",
  },
  {
    name: "Profile",
    icon: "humbleicons:user",
    url: "/profile",
  },
  {
    name: "Chatbot",
    icon: "ion:logo-web-component",
    url: "/chatbot",
  },
];
