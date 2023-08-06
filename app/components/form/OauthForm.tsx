import {signIn} from "next-auth/react";
import {Card, CardContent} from "../ui/card";
import {Button} from "@/components/ui/button";
import {usePathname} from "next/navigation";

type Props = {};

export default function OauthForm({}: Props) {
  const pathname = usePathname();
  const isRegisterPage = pathname === "/register";
  const actionText = isRegisterPage ? "Sign up" : "Sign in";

  return (
    <>
      <CardContent className="flex gap-4 flex-col p-4">
        <Button onClick={() => signIn("github")} className="w-full">
          {actionText} with Github
        </Button>
        <Button onClick={() => signIn("google")} className="w-full">
          {actionText} with Google
        </Button>
      </CardContent>
    </>
  );
}
