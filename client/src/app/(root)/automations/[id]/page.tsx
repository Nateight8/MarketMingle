"use client";

import automationOperations from "@/graphql/operations/automations";
import { useQuery } from "@apollo/client";

interface PageProp {
  params: {
    id: string;
  };
}

export default function Page({ params }: PageProp) {
  const { data } = useQuery(automationOperations.Queries.GetAutomation, {
    variables: { getAutomationId: params.id },
  });

  return <div className="p-4 md:py-10">{params.id}</div>;
}
