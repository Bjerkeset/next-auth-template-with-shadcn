"use client";
// Path: app\(site)\register\page.jsx
import {useState, useEffect} from "react";
import axios from "axios";
import {toast} from "react-hot-toast";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import {signIn} from "next-auth/react";
import RegisterForm from "@/components/form/RegisterForm";
import OauthForm from "@/components/form/OauthForm";

export default function Register() {
  const session = useSession();
  const router = useRouter();
  useEffect(() => {
    if (session?.status === "authenticated") {
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
      console.log("user is authenticated");
    }
  }, [session, router]);

  return (
    <>
      <RegisterForm />
    </>
  );
}
