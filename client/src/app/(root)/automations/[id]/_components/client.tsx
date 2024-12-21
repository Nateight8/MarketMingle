"use client";

import { useQuery } from "@apollo/client";
import { TriggerForm } from "./forms/trigger";
import automationOperations, {
  GetAutomation,
} from "@/graphql/operations/automations";
import { KeywordsForm } from "./forms/keywords";

interface PageProp {
  id: string;
}

export default function AutomationClient({ id: getAutomationId }: PageProp) {
  //steps

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

  const triggerData =
    data?.getAutomation.trigger === null
      ? undefined
      : data?.getAutomation.trigger.type;

  const defaultKeywords =
    data?.getAutomation.keywords === null ? [] : data?.getAutomation.keywords;

  defaultKeywords?.map(({}) => {});
  return (
    <div className="space-y-8">
      <TriggerForm data={triggerData} automationId={getAutomationId} />

      {data?.getAutomation.trigger !== null && (
        <KeywordsForm
          defaultKeywords={defaultKeywords}
          automationId={getAutomationId}
        />
      )}
    </div>
  );
}
