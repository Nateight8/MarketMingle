"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";

import { useMutation } from "@apollo/client";
import keywordsOperations, { keyword } from "@/graphql/operations/keywords";
import automationOperations, {
  GetAutomation,
} from "@/graphql/operations/automations";
import Keyword from "./keyword";

interface KeywordProps {
  data: {
    automationId: string;
    defaultKeywords: {
      id: string;
      word: string;
    }[];
  };
}

const FormSchema = z.object({
  keywords: z
    .array(
      z.object({
        id: z.string(), // The `id` is a string as per the DB structure
        word: z
          .string()
          .min(1, "Keyword cannot be empty")
          .regex(/^[a-zA-Z]+$/, "Keyword must be a valid word"), // `word` is also a string
      })
    )
    .min(1, "At least one keyword is required"), // Ensure at least one keyword
});

export function Keywords({ data }: KeywordProps) {
  const { automationId, defaultKeywords } = data;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      keywords: defaultKeywords,
    },
  });

  const [createKeywords] = useMutation(
    keywordsOperations.Mutations.createKeywords,
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

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const keywords = data.keywords.map(({ word }) => word);

    await createKeywords({ variables: { automationId, keywords } });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="keywords"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Keyword {...field} />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
