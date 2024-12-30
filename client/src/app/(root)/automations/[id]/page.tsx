import { ReactFlowProvider } from "@xyflow/react";
import AutomationClient from "./_component/automation-client";

interface PageProp {
  params: {
    id: string;
  };
}

export default async function Page({ params }: PageProp) {
  const id = await params.id;

  return (
    <div className="">
      <ReactFlowProvider>
        <AutomationClient id={id} />
      </ReactFlowProvider>
    </div>
  );
}
