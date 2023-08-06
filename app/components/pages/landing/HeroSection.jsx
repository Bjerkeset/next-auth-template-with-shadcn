"use client";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import Image from "next/image";
import {AspectRatio} from "@/components/ui/aspect-ratio";
import {useEffect} from "react";
import {useSession} from "next-auth/react";

export default function HeroSection() {
  const router = useRouter();
  const {data: session, status} = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  return (
    <section className="flex flex-col mt-[20vh] items-center h-screen">
      <div className="flex flex-col gap-6 mx-4 max-w-screen-md">
        <div className="text-4xl">
          <h1>HERO HEADER</h1>
        </div>
        <div className="text-xl">
          <h2>Hero Sub Header</h2>
        </div>
        <div className="">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo
            laboriosam similique sunt. Consectetur totam asperiores unde laborum
            sunt optio odio similique, dicta eaque fugiat earum!
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => router.push("/register")}>Get Started</Button>

          <Button variant="outline">Learn More</Button>
        </div>
        <div className="mt-[150px]">
          <AspectRatio ratio={4 / 3} className="bg-muted">
            <Image
              src="/placeholder-01.jpg"
              alt="Photo by Drew Beamer"
              fill
              className="rounded-md object-cover"
            />
          </AspectRatio>
        </div>
      </div>
    </section>
  );
}
