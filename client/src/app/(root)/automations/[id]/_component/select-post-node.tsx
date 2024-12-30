import React from "react";
import { Handle, Position } from "@xyflow/react";
import postOperations, { GetPostsData } from "@/graphql/operations/post";
import { useQuery } from "@apollo/client";
import { SelectPost } from "./select-post";

const SelectPostNode = ({
  data,
}: {
  data: { automationId: string; triggerData: "DM" | "COMMENT" | undefined };
}) => {
  const {
    data: socialPosts,
    error,
    loading,
  } = useQuery<GetPostsData>(postOperations.Querries.getPosts);

  if (loading) {
    return (
      <div className="">
        <p>loading...</p>
      </div>
    );
  }

  const { automationId, triggerData } = data; //<== data from node

  return (
    <div style={{ width: "100%" }} className="">
      <SelectPost posts={socialPosts?.getPosts} />
      <Handle id="trigger-node" type="source" position={Position.Bottom} />
    </div>
  );
};

export default SelectPostNode;
