"use client";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { TriggerField } from "../fields/trigger-field";
import { useMutation } from "@apollo/client";
import triggerOperations from "@/graphql/operations/trigger";
import { useEffect } from "react";
import automationOperations, {
  GetAutomation,
} from "@/graphql/operations/automations";

const FormSchema = z.object({
  trigger: z.enum(["DM", "COMMENT"]),
});

type FormValues = z.infer<typeof FormSchema>;

/*
// COMPONENT
*/
export function TriggerForm({
  automationId,
  data,
}: {
  automationId: string;
  data: "DM" | "COMMENT" | undefined;
}) {
  const [createTrigger] = useMutation(
    triggerOperations.Mutations.createTrigger,
    {
      update(cache, { data: { createTrigger } }) {
        const existingData = cache.readQuery<GetAutomation>({
          query: automationOperations.Queries.GetAutomation,
          variables: { getAutomationId: automationId },
        });

        const updatedData = {
          ...existingData,
          getAutomation: {
            ...existingData?.getAutomation,
            trigger: createTrigger.trigger, // Update trigger field
          },
        };

        cache.writeQuery({
          query: automationOperations.Queries.GetAutomation,
          variables: { getAutomationId: automationId },
          data: updatedData,
        });
      },
    }
  );

  // console.log(data);

  const { control, handleSubmit, setValue } = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      trigger: undefined,
    },
  });

  useEffect(() => {
    if (data) {
      setValue("trigger", data, { shouldValidate: true });
    }
  }, [data, setValue]);

  const handleChange = async (type: "DM" | "COMMENT") => {
    try {
      // Persist the change to the backend
      await createTrigger({ variables: { type, automationId } });

      // Update the form state with the new value
      setValue("trigger", type, { shouldValidate: true });
    } catch (error) {
      console.error("Failed to update trigger:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(() => {})}>
      <Controller
        name="trigger"
        control={control}
        render={({ field }) => (
          <TriggerField
            value={field.value}
            onChange={async (val) => {
              if (val === "DM" || val === "COMMENT") {
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
