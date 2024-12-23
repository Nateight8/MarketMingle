import React from "react";
import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { IconInfoSmall } from "@tabler/icons-react";
import { Textarea } from "@/components/ui/textarea";
import { Handle, Position } from "@xyflow/react";

const MessageNode = () => {
  const { control, watch } = useFormContext<{
    listener: "SMARTAI" | "MESSAGE";
    commentReply?: string | undefined;
    prompt?: string | undefined;
  }>();

  // Dynamically watch the 'listener' field
  const currentListener = watch("listener");

  return (
    <div style={{ width: "100%" }} className="">
      <Handle type="source" position={Position.Bottom} id="message-node-1" />
      {currentListener === "MESSAGE" && (
        <FormField
          control={control}
          name="commentReply"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(15,15,16,0.8) 80%, rgba(20,33,48,0.4) 100%)",
                  }}
                  className="w-full p-3 border border-border/60 relative overflow-hidden rounded-2xl"
                >
                  <div className="flex items-center space-x-2">
                    <div className="bg-blue-600 size-5 flex items-center justify-center rounded-full">
                      <IconInfoSmall />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Leave your message
                    </p>
                  </div>

                  <div
                    className="space-y-2 mt-6"
                    style={{ "--ring": "234 89% 74%" } as React.CSSProperties}
                  >
                    <Textarea {...field} placeholder="Message customer..." />
                  </div>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      )}

      {currentListener === "SMARTAI" && (
        <FormField
          control={control}
          name="prompt"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(15,15,16,0.8) 80%, rgba(20,33,48,0.4) 100%)",
                  }}
                  className="w-full p-3 border border-border/60 relative overflow-hidden rounded-2xl"
                >
                  <div className="flex items-center space-x-2">
                    <div className="bg-blue-600 size-5 flex items-center justify-center rounded-full">
                      <IconInfoSmall />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Prompt for smart ai...
                    </p>
                  </div>

                  <div
                    className="space-y-2 mt-6"
                    style={{ "--ring": "234 89% 74%" } as React.CSSProperties}
                  >
                    <Textarea {...field} placeholder="Message smartai..." />
                  </div>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      )}
    </div>
  );
};

export default MessageNode;
