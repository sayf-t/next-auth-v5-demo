"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import { useSession, signOut } from "next-auth/react";

const SettingsPage = () => {
  const onClick = () => {
    signOut();
  }
  const user = useCurrentUser();
  return (
    <div className="bg-white p-10 rounded-xl">
        <button onClick={onClick}>Sign out</button>
    </div>
  );
};

export default SettingsPage;
