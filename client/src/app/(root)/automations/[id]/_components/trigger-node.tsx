import React from "react";
import { TriggerForm } from "./forms/trigger";

const TriggerNode = ({ data }) => {
  const { automationId, triggerData } = data;

  return (
    <div
      style={{
        padding: "10px",
        backgroundColor: "#f3f4f6",
        border: "1px solid #ddd",
        borderRadius: "8px",
        boxShadow: "0 1px 4px rgba(0, 0, 0, 0.1)",
        width: "200px",
      }}
    >
      <TriggerForm automationId={automationId} data={triggerData} />
    </div>
  );
};

export default TriggerNode;
