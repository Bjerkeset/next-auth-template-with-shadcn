import {getServerSession} from "next-auth";
import {authOptions} from "./api/auth/[...nextauth]/route";
import ClientUserSession from "./components/ClientUserSession";
import HeroSection from "@/components/pages/landing/HeroSection";
export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <HeroSection />
    </>
  );
}
