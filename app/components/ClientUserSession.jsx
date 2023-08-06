"use client";
import {useSession} from "next-auth/react";

//Client side rendering of session data for use in components.
export default function ClientUserSession() {
  const {data: session} = useSession();
  return <div>{JSON.stringify(session)}</div>;
}
