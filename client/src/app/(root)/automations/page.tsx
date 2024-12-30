import { auth } from "@/auth";

import { redirect } from "next/navigation";
import Automations from "./_components/automations";

export default async function Page() {
  const session = await auth();

  if (!session || !session.user?.id) redirect("/sign-in");

  return <Automations />;
}
