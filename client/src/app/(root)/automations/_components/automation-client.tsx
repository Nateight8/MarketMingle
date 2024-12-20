"use client";
import { useQuery } from "@apollo/client";

import automationOperations, {
  ListUserAutomations,
} from "@/graphql/operations/automations";
import { AutomationCard } from "./automation-card";
import AutomationButton from "@/components/automation-button";
import { IconPlus } from "@tabler/icons-react";

export default function AutomationClient() {
  const { data } = useQuery<ListUserAutomations>(
    automationOperations.Queries.ListUserAutomations
  );

  if (data?.listAutomations.length === 0) return <NoAutomationsFound />;

  console.log("hello DATA:", data);

  return (
    <div className="p-4 md:py-10">
      <div className="grid grid-cols-3 gap-4 mx-auto max-w-6xl">
        {data?.listAutomations.map((automation) => (
          <AutomationCard key={automation.id} automation={automation} />
        ))}

        <AutomationButton>
          {" "}
          <IconPlus />
        </AutomationButton>
      </div>
    </div>
  );
}

function NoAutomationsFound() {
  return (
    <div className="h-[calc(100vh-100px)] flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <svg
          className="mx-auto h-32 w-32 text-foreground/60"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.5 4.5V6H8a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V8a2 2 0 00-2-2h-1.5V4.5a2.5 2.5 0 00-5 0zM12 9v3m0 0v3m0-3h3m-3 0H9"
          />
        </svg>
        <h2 className="mt-6 text-3xl font-extrabold">No Automations Found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Oops! Looks like there`&apos;s nothing here yet. Let`&apos;s get
          started and bring your ideas to life!
        </p>
        <div className="mt-8">
          <AutomationButton>Create Your First Automation</AutomationButton>
        </div>
      </div>
    </div>
  );
}
