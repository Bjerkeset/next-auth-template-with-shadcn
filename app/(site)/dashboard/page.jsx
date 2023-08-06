"use client";
import {useSession, signOut} from "next-auth/react";
import {Button} from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/NavigationMenuDemo";
import {NavigationMenuDemo} from "@/components/NavigationMenuDemo";

const dashboard = () => {
  const {data: session} = useSession();
  return (
    <div className="flex gap-20 flex-col items-center justify-center">
      <h1 className="text-3xl">Dashboard</h1>
      <p>Hi {session?.user?.name}</p>
    </div>
  );
};

export default dashboard;
