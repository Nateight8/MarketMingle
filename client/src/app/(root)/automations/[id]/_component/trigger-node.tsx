import React from "react";
import { TriggerForm } from "./trigger";
import { Handle, Position } from "@xyflow/react";
import { IconInfoSmall } from "@tabler/icons-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

const TriggerNode = ({
  data,
}: {
  data: {
    automationId: string;
    triggerData: "DM" | "COMMENT" | undefined;
    name: string;
  };
}) => {
  const { automationId, triggerData, name } = data;

  return (
    <div style={{ width: "100%" }} className="">
      <TriggerForm
        automationId={automationId}
        triggerData={triggerData}
        automationName={name}
      />
      <Handle id="trigger-node" type="source" position={Position.Bottom} />
      <Handle id="trigger-node-target" type="target" position={Position.Top} />
    </div>
  );
};

export default TriggerNode;
