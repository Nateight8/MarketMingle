import { auth } from "@/auth";
import AutomationClient from "./_components/automation-client";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();

  if (!session || !session.user?.id) redirect("/sign-in");

  return <AutomationClient />;
}
