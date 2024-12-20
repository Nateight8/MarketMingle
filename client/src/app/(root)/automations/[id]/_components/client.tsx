"use client";

import { useQuery } from "@apollo/client";
import { TriggerForm } from "./forms/trigger";
import automationOperations from "@/graphql/operations/automations";
import { GetAutomation } from "@/graphql/operations/trigger";

interface PageProp {
  id: string;
}

export default function AutomationClient({ id: getAutomationId }: PageProp) {
  const { data, loading, error } = useQuery<GetAutomation>(
    automationOperations.Queries.GetAutomation,
    {
      variables: { getAutomationId },
    }
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error("Error fetching automation:", error);
    return <div>Error loading automation data</div>;
  }

  console.log("TRIGGER FROM CLIENT", data?.getAutomation.trigger);

  return (
    <div className="">
      <TriggerForm
        data={data.getAutomation.trigger}
        automationId={getAutomationId}
      />
    </div>
  );
}
