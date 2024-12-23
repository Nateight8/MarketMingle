"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import * as z from "zod";
import { useMutation } from "@apollo/client";
import automationOperations from "@/graphql/operations/automations";
import listenerOperations, { Listener } from "@/graphql/operations/listener";

import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ListenerField } from "../fields/listener";
import { IconDeviceFloppy, IconInfoSmall } from "@tabler/icons-react";
import MessageNode from "@/app/(root)/playground/_component/message-node";

// Define the schema for both listener and message/prompt fields
const FormSchema = z.object({
  listener: z.enum(["SMARTAI", "MESSAGE"]),
  commentReply: z.string().optional(),
  prompt: z.string().optional(),
});

type FormValues = z.infer<typeof FormSchema>;

export function ListenerAndMessageForm({
  automationId,

  listener,
}: {
  automationId: string;
  //   defaultListener?: "SMARTAI" | "MESSAGE";
  listener: Listener | undefined;
}) {
  console.log(listener);

  const defaultListener = listener?.listener;
  const defaultPrompt = listener?.prompt;
  const defaultCommentReply = listener?.commentReply;

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      listener: defaultListener || undefined,
      commentReply: defaultCommentReply || "",
      prompt: defaultPrompt || "",
    },
  });

  // Mutation for updating listener and message/prompt
  const [createListener] = useMutation(
    listenerOperations.Mutations.createListener,
    {
      refetchQueries: [
        {
          query: automationOperations.Queries.GetAutomation,
          variables: { getAutomationId: automationId },
        },
      ],
    }
  );

  async function onSubmit(data: FormValues) {
    const { listener, commentReply, prompt } = data;
    // console.log("Form Submitted:", data);

    try {
      await createListener({
        variables: {
          automationId,
          listener,
          ...(commentReply && { commentReply }),
          ...(prompt && { prompt }),
        },
      });
    } catch (error) {
      console.error("Failed to submit listener or message:", error);
    }
  }

  const handleListenerChange = (listener: "SMARTAI" | "MESSAGE") => {
    // Reset form fields for message and prompt when listener changes
    form.reset({
      listener,
      commentReply: "",
      prompt: "",
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 max-w-lg"
      >
        <MessageNode form={form} />

        {/* {currentListener && (
          <Button variant="outline" type="submit" className="w-full">
            <IconDeviceFloppy /> Save Progress
          </Button>
        )} */}
      </form>
    </Form>
  );
}
