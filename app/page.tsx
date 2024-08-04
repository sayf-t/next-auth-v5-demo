import prisma from "@/lib/prisma";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import LoginButton from "@/components/auth/LoginButton";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"]
});

export default async function Home() {
  const users = await prisma.user.findMany();
  return (
    <main className="flex flex-col h-full items-center justify-center gap-6 px-3 py-10">
      <h1 className={cn(
        "text-center text-4xl font-bold",
        font.className
        )}>🔐 Next-Auth V5 Demo</h1>
      <p>Simple authentication service</p>
        <div className="space-x-4">
          <LoginButton asChild>
            <Button variant={"default"} size={"lg"}>Sign In Page</Button>
          </LoginButton>
          <LoginButton mode="modal" asChild>
            <Button variant={"outline"} size={"lg"}>Sign In Dialog</Button>
          </LoginButton>
        </div>
    </main>
  );
}
