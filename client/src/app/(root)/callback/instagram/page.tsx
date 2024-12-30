"use client";
import { auth } from "@/auth";
import integrationOperations from "@/graphql/operations/integrations";
import { useMutation } from "@apollo/client";
import { redirect } from "next/navigation";
import React from "react";
import { useEffect } from "react";

type Props = {
  searchParams: {
    code?: string;
    state?: string;
  };
};

export default async function InstagramCallback({ searchParams }: Props) {
  const code = searchParams.code?.split("#_")[0]; // Clean up the code value if needed

  //   const session = await auth();

  const user = true;

  if (!code) {
    // return redirect("/sign-up");
  }

  try {
    if (user) {
      await integrateWithInstagram({ variables: { code } });
      return redirect(
        `/dashboard/integrations` // Redirect to dashboard
      );
    }

    // Handle unexpected response statuses
    // return redirect("/sign-up");
  } catch (error) {
    console.error("Instagram Integration Error:", error);
    return redirect("/sign-up"); // Redirect to sign-up in case of an error
  }
}
