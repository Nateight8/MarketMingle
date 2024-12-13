import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  if (!session) {
    return redirect("/sign-in");
  }

  return (
    <div>
      {session?.user?.name} {session.user?.id}
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button type="submit">Sign Out</button>
      </form>
    </div>
  );
}
