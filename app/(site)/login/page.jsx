"use client";

import {useState, useEffect} from "react";
import {signIn, useSession} from "next-auth/react";
import {toast} from "react-hot-toast";
import {useRouter} from "next/navigation";
import LoginForm from "@/components/form/LoginForm";

export default function Login() {
  const session = useSession();
  const router = useRouter();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (session?.status === "authenticated") {
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
      console.log("user is authenticated");
    }
  }, [session, router]);

  const loginUser = async (e) => {
    e.preventDefault();
    signIn("credentials", {...data, redirect: false}).then((callback) => {
      if (callback?.error) {
        toast.error(callback.error);
      }

      if (callback?.ok && !callback?.error) {
        toast.success("Logged in successfully!");
      }
    });
  };

  return (
    <>
      <LoginForm />
    </>
  );
}
