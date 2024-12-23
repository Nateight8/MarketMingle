"use client";
import * as z from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useEffect } from "react";
import { ListenerField } from "../fields/listener";
import { useMutation } from "@apollo/client";
import listenerOperations from "@/graphql/operations/listener";
import automationOperations from "@/graphql/operations/automations";

const FormSchema = z.object({
  listener: z.enum(["SMARTAI", "MESSAGE"]),
});

type FormValues = z.infer<typeof FormSchema>;

/*
// COMPONENT
*/
export function ListenerForm({
  automationId,
  data,
}: {
  automationId: string;
  data: "SMARTAI" | "MESSAGE" | undefined;
}) {
  const { control, handleSubmit, setValue } = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      listener: undefined,
    },
  });

  useEffect(() => {
    if (data) {
      setValue("listener", data, { shouldValidate: true });
    }
  }, [data, setValue]);

  //NETWORK REQUEST

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

  const handleChange = async (listener: "SMARTAI" | "MESSAGE") => {
    try {
      // Persist the change to the backend
      await createListener({ variables: { listener, automationId } });

      // Update the form state with the new value
      // setValue("listener", listener, { shouldValidate: true });
    } catch (error) {
      console.error("Failed to update trigger:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(() => {})}>
      <Controller
        name="listener"
        control={control}
        render={({ field }) => (
          <ListenerField
            value={field.value}
            onChange={async (val) => {
              if (val === "SMARTAI" || val === "MESSAGE") {
                await handleChange(val);
                field.onChange(val);
              }
            }}
          />
        )}
      />
    </form>
  );
}
