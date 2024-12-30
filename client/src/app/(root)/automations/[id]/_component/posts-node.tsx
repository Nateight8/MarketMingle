import React, { useState, useEffect, useCallback } from "react";
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  Background,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useQuery } from "@apollo/client";
import postOperations, { GetPostsData } from "@/graphql/operations/post";

export default function PostsToNodes() {
  const {
    data: socialPosts,
    error,
    loading,
  } = useQuery<GetPostsData>(postOperations.Querries.getPosts);

  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);

  // Map posts into nodes
  useEffect(() => {
    if (socialPosts?.getPosts?.length) {
      const postNodes = socialPosts?.getPosts.map((post, index) => ({
        id: `post-${post.id}`,
        type: "default", // Or a custom type like "post-node"
        position: { x: 50 * index, y: 100 }, // Position dynamically
        data: {
          label: post.caption,
          content: post.media,
        },
      }));
      setNodes(postNodes);
    }
  }, [socialPosts?.getPosts]);

  // Handle connection between nodes
  //   const onConnect = useCallback(
  //     (params) => setEdges((eds) => addEdge(params, eds)),
  //     [setEdges]
  //   );

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        // onConnect={onConnect}
        fitView
      >
        <Background />
      </ReactFlow>
    </div>
  );
}
