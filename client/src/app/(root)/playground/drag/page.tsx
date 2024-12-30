"use client";
import React, { useCallback } from "react";
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  Background,
  Connection,
  Panel,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const nodeTypes = {
  //herer for nodesd
};

const FormSchema = z.object({
  listener: z.enum(["SMARTAI", "MESSAGE"]),
  commentReply: z.string().optional(),
  prompt: z.string().optional(),
});

type FormValues = z.infer<typeof FormSchema>;

export default function App() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      listener: undefined,
      commentReply: "",
      prompt: "",
    },
  });

  async function onSubmit(data: FormValues) {
    console.log(data);
  }

  const initialNodes = [
    {
      id: "1",
      position: { x: 16, y: 16 },
      data: { label: "Hello world" },
      type: "trigger",
      style: { width: "100%", maxWidth: "32rem" },
    },

    {
      id: "2",
      position: { x: 300, y: 160 },
      data: { label: "Hello world" },
      type: "keywords",
      style: { width: "100%", maxWidth: "32rem" },
    },

    {
      id: "3",
      position: { x: 350, y: 200 },
      data: { label: "Hello world" },
      type: "listener",
      style: { width: "100%", maxWidth: "32rem" },
    },
    {
      id: "4",
      position: { x: 300, y: 200 },
      data: { label: "Hello world" },
      type: "message",
      style: { width: "100%", maxWidth: "32rem" },
    },
  ];

  const initialEdges = [
    { id: "e1-2", source: "", target: "2", animated: true },
    { id: "e1-3", source: "2", target: "3", animated: true },
  ];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onConnect = useCallback(
    (params: Connection) => {
      console.log("CONNECTED");

      setEdges((eds) => addEdge(params, eds));
    },
    [setEdges]
  );

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        panOnDrag={false}
        zoomOnScroll={false}
      >
        <Background />
        <Panel position="top-right">
          <div className="w-60 h-60 bg-background">Hello world</div>
        </Panel>
      </ReactFlow>
    </div>
  );
}
