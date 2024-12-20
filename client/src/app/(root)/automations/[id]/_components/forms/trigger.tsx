"use client";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";

import { TriggerField } from "../fields/trigger-field";
import { useMutation } from "@apollo/client";
import triggerOperations, { Trigger } from "@/graphql/operations/trigger";
import { useEffect, useState } from "react";

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
  data: Trigger;
}) {
  const [createTrigger] = useMutation(
    triggerOperations.Mutations.createTrigger
  );

  // console.log(data);

  const { control, handleSubmit, reset, setValue } = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      trigger: undefined,
    },
  });

  useEffect(() => {
    if (data.type) {
      setValue("trigger", data.type, { shouldValidate: true });
    } else {
      setValue("trigger", undefined, { shouldValidate: true });
    }
  }, [data.type, setValue]);

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
    <form onSubmit={handleSubmit(() => {})} className="space-y-8">
      <Controller
        name="trigger"
        control={control}
        render={({ field }) => (
          <TriggerField
            value={field.value}
            onChange={async (val) => {
              if (val === "DM" || val === "COMMENT") {
                await handleChange(val);
              }
            }}
          />
        )}
      />
      <Button type="submit">Submit</Button>
    </form>
  );
}
