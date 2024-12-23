"use client";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { useMutation } from "@apollo/client";
import triggerOperations from "@/graphql/operations/trigger";
import { useEffect } from "react";
import automationOperations, {
  GetAutomation,
} from "@/graphql/operations/automations";
import { TriggerField } from "../../automations/[id]/_components/fields/trigger-field";

const FormSchema = z.object({
  trigger: z.enum(["DM", "COMMENT"]),
});

type FormValues = z.infer<typeof FormSchema>;

/*
// COMPONENT
*/
export function TriggerForm() {
  const { control, handleSubmit, setValue } = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      trigger: undefined,
    },
  });

  return (
    <form onSubmit={handleSubmit(() => {})} className="w-full">
      <Controller
        name="trigger"
        control={control}
        render={({ field }) => (
          <TriggerField
            value={field.value}
            onChange={async (val) => {
              if (val === "DM" || val === "COMMENT") {
                field.onChange(val);
              }
            }}
          />
        )}
      />
    </form>
  );
}
