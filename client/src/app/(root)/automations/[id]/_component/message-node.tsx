import React from "react";
import { useForm, useFormContext } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { IconInfoSmall } from "@tabler/icons-react";
import { Textarea } from "@/components/ui/textarea";
import { Handle, Position } from "@xyflow/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

interface MessageProps {
  data: {
    automationId: string;
    defaultListeners: "SMARTAI" | "MESSAGE";
  };
}

const FormSchema = z.object({
  // listener: z.enum(["SMARTAI", "MESSAGE"]),
  commentReply: z.string().optional(),
  prompt: z.string().optional(),
});

type FormValues = z.infer<typeof FormSchema>;

const MessageNode = ({ data }: MessageProps) => {
  const { automationId, defaultListeners } = data;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      // listener: defaultListeners,
      // commentReply: "",
      // prompt: "",
    },
  });
  // Dynamically watch the 'listener' field
  console.log(data);

  return (
    <div className="">
      <Form {...form}>
        <form className="space-y-6  w-full">
          {defaultListeners === "MESSAGE" ? (
            <FormField
              control={form.control}
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
                        style={
                          { "--ring": "234 89% 74%" } as React.CSSProperties
                        }
                      >
                        <Textarea
                          {...field}
                          placeholder="Message customer..."
                        />
                      </div>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          ) : (
            <FormField
              control={form.control}
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
                        style={
                          { "--ring": "234 89% 74%" } as React.CSSProperties
                        }
                      >
                        <Textarea {...field} placeholder="Message smartai..." />
                      </div>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          )}
        </form>
      </Form>
      <Handle type="target" position={Position.Top} id="message-node-1" />
    </div>
  );
};

export default MessageNode;
