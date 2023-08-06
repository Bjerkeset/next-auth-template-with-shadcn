"use client";
// Path: app\components\Navbar.jsx
import Link from "next/link";
import {signOut} from "next-auth/react";
import {Button} from "@/components/ui/button";
import {ModeToggle} from "@/components/ui/mode-toggle";
import {buttonVariants} from "@/components/ui/button";
import {NavigationMenuDemo} from "@/components/NavigationMenuDemo";
import Image from "next/image";
import {AspectRatio} from "@/components/ui/aspect-ratio";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

export default function Navbar({session}) {
  console.log("session data", session);
  return (
    <nav className="flex items-center justify-between my-1 px-8">
      <div className="h-6 w-10">
        <AspectRatio ratio={16 / 9} className="bg-muted">
          <Link href="./">
            <Image
              src="/placeholder-01.jpg"
              alt="Photo by Drew Beamer"
              fill
              className="rounded-md object-cover"
            />
          </Link>
        </AspectRatio>
      </div>
      <div className="flex gap-4">
        <NavigationMenuDemo />
        <div className="flex items-center gap-4">
          {session && (
            <div className="flex items-center gap-2">
              <Avatar>
                <Avatar>
                  <AvatarImage src={session?.user?.image} />
                  <AvatarFallback>bb</AvatarFallback>
                </Avatar>
              </Avatar>
              <p>{session?.user?.name}</p>
            </div>
          )}
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}
