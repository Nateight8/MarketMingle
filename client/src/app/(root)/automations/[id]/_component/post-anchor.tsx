"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { IconDeviceFloppy } from "@tabler/icons-react";
import { Handle, Position } from "@xyflow/react";
import { Tag, TagInput } from "emblor";
import { useState, useEffect } from "react";
import { ControllerRenderProps } from "react-hook-form";

interface KeywordProps extends ControllerRenderProps {
  // loading: boolean;
  // Add any additional props here if needed
}

export default function PostAnchorNode({ onChange, value }: KeywordProps) {
  return (
    <div>
      <div
        style={{
          background:
            "linear-gradient(180deg, rgba(15,15,16,0.8) 80%, rgba(20,33,48,0.4) 100%)",
        }}
        className=" w-full p-3 max-w-lg border border-border/60 relative overflow-hidden rounded-2xl"
      >
        <div className="space-y-2">
          <Label htmlFor="input-57" className="text-sm text-muted-foreground">
            Attach posts
          </Label>
        </div>
        <div className="mt-4">
          <Button variant="outline" className="w-full" type="submit">
            <IconDeviceFloppy /> save progress
          </Button>
        </div>
      </div>
      <Handle
        id="post-anchor-target-node"
        type="target"
        position={Position.Top}
      />
      <Handle
        id="post-anchor-source-node"
        type="source"
        position={Position.Right}
      />
      <Handle
        id="post-anchor-source-node-2"
        type="source"
        position={Position.Right}
      />
      <Handle
        id="post-anchor-source-node-4"
        type="source"
        position={Position.Bottom}
      />
    </div>
  );
}
