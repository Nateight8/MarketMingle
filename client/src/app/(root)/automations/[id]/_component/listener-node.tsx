import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Handle, Position } from "@xyflow/react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@apollo/client";
import listenerOperations from "@/graphql/operations/listener";
import automationOperations from "@/graphql/operations/automations";
import { Listener } from "./listener";

interface listenerProps {
  data: {
    automationId: string;
    defaultListeners: "SMARTAI" | "MESSAGE";
  };
}

const FormSchema = z.object({
  listener: z.enum(["SMARTAI", "MESSAGE"]),
  // commentReply: z.string().optional(),
  // prompt: z.string().optional(),
});

type FormValues = z.infer<typeof FormSchema>;

const ListenerNode = ({ data }: listenerProps) => {
  const { automationId, defaultListeners } = data;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      listener: defaultListeners,
      // commentReply: "",
      // prompt: "",
    },
  });

  const [createListener] = useMutation(
    listenerOperations.Mutations.createListener,
    {
      // TEMPORARY
      refetchQueries: [
        {
          query: automationOperations.Queries.GetAutomation,
          variables: { getAutomationId: automationId },
        },
      ],
    }
  );

  form.watch(async (val) => {
    const listener = val.listener;

    if (listener) {
      // console.log("LISTENER WATCHING FROM HERE", listener);
      await createListener({ variables: { automationId, listener } });
    }
  });

  return (
    <div className="w-full">
      <Form {...form}>
        <form className="space-y-6  w-full">
          <FormField
            control={form.control}
            name="listener"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Listener {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
      <Handle
        type="source"
        position={Position.Bottom}
        id="listener-node-down"
      />
      <Handle type="target" position={Position.Top} id="listener-node-up" />
    </div>
  );
};

export default ListenerNode;
