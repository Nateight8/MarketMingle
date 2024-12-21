"use client";

import { useQuery } from "@apollo/client";
import { TriggerForm } from "./forms/trigger";
import automationOperations, {
  GetAutomation,
} from "@/graphql/operations/automations";
import { KeywordsForm } from "./forms/keywords";
import { ListenerForm } from "./forms/listener";

interface PageProp {
  id: string;
}

export default function AutomationClient({ id: getAutomationId }: PageProp) {
  // Fetch automation data
  const { data, loading, error } = useQuery<GetAutomation>(
    automationOperations.Queries.GetAutomation,
    { variables: { getAutomationId } }
  );

  if (loading) return <div>Loading...</div>;

  if (error) {
    console.error("Error fetching automation:", error);
    return <div>Error loading automation data</div>;
  }

  // Extract data with defaults
  const { trigger, keywords, listener } = data?.getAutomation || {};

  const triggerData = trigger?.type;
  const defaultKeywords = keywords || [];
  const defaultListeners = listener?.listener;

  // Boolean to check if trigger is set
  const isTriggerSet = Boolean(trigger);
  const areKeywordsSet = Boolean(keywords?.length === 0);

  return (
    <div className="space-y-8">
      {/* Step 1: Trigger Form */}
      <TriggerForm data={triggerData} automationId={getAutomationId} />

      {/* Step 2: Keywords Form */}
      {isTriggerSet && (
        <KeywordsForm
          defaultKeywords={defaultKeywords}
          automationId={getAutomationId}
        />
      )}

      {/* Step 3: Listener Form */}
      {!areKeywordsSet && (
        <ListenerForm data={defaultListeners} automationId={getAutomationId} />
      )}
    </div>
  );
}
