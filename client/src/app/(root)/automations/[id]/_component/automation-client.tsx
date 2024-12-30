"use client";
import React, { useCallback, useEffect } from "react";
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  Background,
  Connection,
  Edge,
  Panel,
  useReactFlow,
  getConnectedEdges,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import TriggerNode from "./trigger-node";
import KeywordsNode from "./keywords-node";
import ListenerNode from "./listener-node";
import MessageNode from "./message-node";
import { useQuery } from "@apollo/client";
import automationOperations, {
  GetAutomation,
} from "@/graphql/operations/automations";
import { getLayoutedElements } from "@/lib/get-layout";
import SelectPostNode from "./select-post-node";

import postOperations, { GetPostsData } from "@/graphql/operations/post";
import { SelectPost } from "./select-post";
import PostNode from "./post-node";
import PostAnchorNode from "./post-anchor";
import StartNode from "./start-node";

// Define the Post type
interface Post {
  automationId: string;
  media: string;
  postId: string;
  caption: string;
}

const nodeTypes = {
  start: StartNode,
  trigger: TriggerNode,
  postsAnchor: PostAnchorNode,
  keywords: KeywordsNode,
  listener: ListenerNode,
  message: MessageNode,
  postcard: PostNode,
};

type keyword = {
  id: string;
};

type TriggerNodeData = {
  automationId: string;
  triggerData: "DM" | "COMMENT" | undefined;
};

type KeywordsNodeData = {
  automationId: string;
  defaultKeywords: keyword[];
};

type NodeData = TriggerNodeData | KeywordsNodeData;

export default function AutomationClient({ id: automationId }: { id: string }) {
  const { data: socialPosts } = useQuery<GetPostsData>(
    postOperations.Querries.getSocialPosts
  );
  const initialEdges: Edge[] = [];

  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) => {
      console.log("CONNECTED");

      setEdges((eds) => addEdge(params, eds));
    },
    [setEdges]
  );

  // Fetch automation data
  const { data, loading, error } = useQuery<GetAutomation>(
    automationOperations.Queries.GetAutomation,
    { variables: { getAutomationId: automationId } }
  );

  // Extract data with defaults
  const { trigger, keywords, listener, name } = data?.getAutomation || {};

  const triggerData = trigger?.type;
  const defaultKeywords = keywords || [];
  const defaultListeners = listener?.listener;

  console.log("name:", name);

  const initialNodes = [
    {
      id: "1",
      position: { x: 16, y: 16 },
      data: { automationId, name },
      type: "start",
      style: { width: "100%", maxWidth: "18rem" },
    },
    // {
    //   id: "1",
    //   position: { x: 16, y: 16 },
    //   data: { automationId, triggerData },
    //   type: "trigger",
    //   style: { width: "100%", maxWidth: "32rem" },
    // },
    // {
    //   id: "2",
    //   position: { x: 16, y: 16 },
    //   data: { automationId, triggerData },
    //   type: "postsAnchor",
    //   style: { width: "100%", maxWidth: "32rem" },
    // },
  ];

  // const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
  //   initialNodes,
  //   initialEdges
  // );

  useEffect(() => {
    //show if name is set:
    if (name) {
      // @ts-ignore
      setNodes((currentNodes) => [
        ...currentNodes,
        {
          id: "2",
          position: { x: 300, y: 280 },
          data: { automationId, defaultKeywords, name },
          type: "trigger",
          style: { width: "100%", maxWidth: "28rem" },
        },
      ]);

      // @ts-ignore
      // setEdges((currentEdges) => [
      //   ...currentEdges,
      //   {
      //     id: "e1-2", // Unique edge ID
      //     source: "", // TriggerNode ID 1
      //     target: "", // KeywordsNode ID 2
      //     animated: true, // Optional: Makes the edge animated
      //   },
      // ]);
    }

    //show keywords if:
    if (triggerData) {
      // @ts-ignore
      setNodes((currentNodes) => [
        ...currentNodes,
        {
          id: "post-anchor",
          position: { x: 300, y: 280 },
          data: { automationId },
          type: "postsAnchor",
          style: { width: "100%", maxWidth: "28rem" },
        },
      ]);
      // @ts-ignore
      // setEdges((currentEdges) => [
      //   ...currentEdges,
      //   {
      //     id: "e1-2", // Unique edge ID
      //     source: "", // TriggerNode ID 1
      //     target: "", // KeywordsNode ID 2
      //     animated: true, // Optional: Makes the edge animated
      //   },
      // ]);
    }

    //show listeners if:
    if (defaultKeywords.length !== 0) {
      // @ts-ignore
      setNodes((currentNodes) => [
        ...currentNodes,
        {
          id: "3",
          position: { x: 350, y: 200 },
          data: { automationId, defaultListeners },
          type: "listener",
          style: { width: "100%", maxWidth: "32rem" },
        },
      ]);
      // @ts-ignore
      setEdges((currentEdges) => [
        ...currentEdges,
        {
          id: "e1-3", // Unique edge ID
          source: "", // TriggerNode ID 2
          target: "", // KeywordsNode ID 3
          animated: true, // Optional: Makes the edge animated
        },
      ]);
    }

    //show message if:
    if (defaultListeners) {
      // @ts-ignore
      setNodes((currentNodes) => [
        ...currentNodes,
        {
          id: "4",
          position: { x: 300, y: 200 },
          data: { defaultListeners },
          type: "message",
          style: { width: "100%", maxWidth: "32rem" },
        },
      ]);
      // @ts-ignore
      setEdges((currentEdges) => [
        ...currentEdges,
        {
          id: "e1-4", // Unique edge ID
          source: "", // TriggerNode ID 3
          target: "", // KeywordsNode ID 4
          animated: true, // Optional: Makes the edge animated
        },
      ]);
    }
  }, [triggerData, defaultKeywords, defaultListeners]);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);

  // Get connected posts' data from the PostAnchorNode
  const getConnectedPosts = useCallback(() => {
    // Find the PostAnchorNode
    const anchorNode = nodes.find((node) => node.id === "post-anchor");

    console.log("ANCHOR NODE", anchorNode);

    if (!anchorNode) {
      console.warn("PostAnchorNode not found");
      return [];
    }

    // Get all edges connected to the PostAnchorNode
    const connectedEdges = getConnectedEdges([anchorNode], edges);
    console.log("Choonected edges", connectedEdges);
    // Extract connected node IDs
    const connectedNodeIds = connectedEdges.map((edge) => edge.target);
    console.log("node id", connectedNodeIds);
    // Get the data of connected nodes
    const connectedPosts = nodes
      .filter((node) => connectedNodeIds.includes(node.id))
      .map((node) => node.data); // Extract the `data` property

    console.log("Connected Posts Data:", connectedPosts[0]);
    // return {connectedPosts};
  }, [nodes, edges]);

  getConnectedPosts();

  // const onConnect = useCallback(
  //   (params: Connection) => {
  //     setEdges((eds) => addEdge(params, eds));
  //   },
  //   [setEdges]
  // );

  const { screenToFlowPosition } = useReactFlow();
  // Update the nodes when `triggerData` is available
  useEffect(() => {
    //sync flowchat data with db for keyword
    if (name) {
      setNodes((nds) =>
        nds.map((node) =>
          node.id === "1" // Update the node with id "1" (trigger node)
            ? {
                ...node,
                data: { automationId, name }, // Update the `data` property
              }
            : node
        )
      );
    }

    //sync flowchat data with db for keyword
    if (triggerData) {
      // @ts-ignore
      setNodes((nds) =>
        nds.map((node) =>
          node.id === "1" // Update the node with id "1" (trigger node)
            ? {
                ...node,
                data: { automationId, triggerData }, // Update the `data` property
              }
            : node
        )
      );
    }
  }, [triggerData, automationId, setNodes, defaultKeywords]);

  console.log(data);

  if (loading) return <div>Loading...</div>;

  if (error) {
    console.error("Error fetching automation:", error);
    return <div>Error loading automation data</div>;
  }

  // const onLayout = useCallback(
  //   (direction: "TB" | "LR") => {
  //     const { nodes: layoutedNodes, edges: layoutedEdges } =
  //       getLayoutedElements(nodes, edges, direction);

  //     setNodes([...layoutedNodes]);
  //     setEdges([...layoutedEdges]);
  //   },
  //   [nodes, edges]
  // );

  const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const onDrop = (
    event: React.DragEvent<HTMLDivElement>,
    screenToFlowPosition: (position: { x: number; y: number }) => {
      x: number;
      y: number;
    },
    setNodes: React.Dispatch<React.SetStateAction<Node[]>>
  ) => {
    event.preventDefault();

    const postString = event.dataTransfer.getData("application/reactflow");
    const post = JSON.parse(postString);

    console.log("DROPPED POST", post); //everything we need that is dropped

    if (!post) return;

    const position = screenToFlowPosition({
      x: event.clientX,
      y: event.clientY,
    });

    const newNode = {
      id: `post-${post.id}`,
      type: "postcard", // or your custom node type
      position,
      data: {
        automationId: post.automationId,
        media: post.media,
        postId: post.postid,
        caption: post.caption,
        mediaType: post.mediaType,
      },
    };

    setNodes((currentNodes) => [...currentNodes, newNode]);
  };

  console.log("socialPosts:", socialPosts);

  //potential api call

  return (
    <div className="h-screen w-full relative">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        zoomOnScroll={false}
        onDragOver={onDragOver}
        onDrop={(event) => onDrop(event, screenToFlowPosition, setNodes)}
      >
        <Background />

        <Panel position="top-right">
          <SelectPost posts={socialPosts?.getSocialPosts} />
        </Panel>
      </ReactFlow>
    </div>
  );
}

//TODO: SAVE INSTAGRAM POST TO DB
//CODE REFACTORING
