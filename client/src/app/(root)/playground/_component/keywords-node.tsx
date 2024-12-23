import React from "react";
import { TriggerForm } from "./trigger";
import { Handle, Position } from "@xyflow/react";
import { Keywords } from "./keywords";

const KeywordsNode = ({ data }: { data: { label: string } }) => {
  console.log("HERE IS DATA", data);

  //   const { automationId, triggerData } = data;

  return (
    <div style={{ width: "100%" }} className="">
      <Keywords />
      <Handle id="keywords-node" type="target" position={Position.Top} />
      <Handle
        id="keywords-node-bottom"
        type="source"
        position={Position.Bottom}
      />
    </div>
  );
};

export default KeywordsNode;
