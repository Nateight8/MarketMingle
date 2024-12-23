"use client";
import React, { useCallback } from "react";
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  Background,
  Connection,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import TriggerNode from "./_component/trigger-node";
import KeywordsNode from "./_component/keywords-node";
import ListenerNode from "./_component/listener-node";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import MessageNode from "./_component/message-node";

const nodeTypes = {
  trigger: TriggerNode,
  keywords: KeywordsNode,
  listener: ListenerNode,
  message: MessageNode,
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
      position: { x: 0, y: 0 },
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
      position: { x: 600, y: 800 },
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
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6  w-full"
      >
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
          </ReactFlow>
        </div>
      </form>
    </Form>
  );
}
