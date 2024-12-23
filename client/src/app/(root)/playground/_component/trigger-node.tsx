import React from "react";
import { TriggerForm } from "./trigger";
import { Handle, Position } from "@xyflow/react";

const TriggerNode = ({ data }: { data: { label: string } }) => {
  console.log("HERE IS DATA", data);

  //   const { automationId, triggerData } = data;

  return (
    <div style={{ width: "100%" }} className="">
      <TriggerForm />
      <Handle id="trigger-node" type="source" position={Position.Bottom} />
    </div>
  );
};

export default TriggerNode;
