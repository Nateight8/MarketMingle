import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandTwitter,
  IconInfoSmall,
  IconStackFront,
} from "@tabler/icons-react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Handle, Position } from "@xyflow/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation } from "@apollo/client";
import automationOperations, {
  GetAutomation,
} from "@/graphql/operations/automations";

interface MessageProps {
  data: {
    automationId: string;
    name: string;
  };
}

const FormSchema = z.object({
  name: z.string().nonempty("Name is required."),
  platform: z
    .enum(["instagram", "facebook", "twitter"])
    .refine((val) => val !== undefined, "Platform selection is required."),
});

type FormValues = z.infer<typeof FormSchema>;

const StartNode = ({ data }: MessageProps) => {
  const { automationId, name } = data;

  console.log("FROM START", data.name);

  const [updateAutomation] = useMutation(
    automationOperations.Mutations.UpdateAutomation,
    {
      update(cache, { data: { updateAutomation } }) {
        const existingData = cache.readQuery<GetAutomation>({
          query: automationOperations.Queries.GetAutomation,
          variables: { getAutomationId: automationId },
        });

        const updatedData = {
          ...existingData,
          getAutomation: {
            ...existingData?.getAutomation,
            name: updateAutomation.name,
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

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      platform: "instagram",
    },
  });

  useEffect(() => {
    if (name) {
      form.reset({ name, platform: "instagram" });
    }
  }, [name, form]);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const { name } = data;
    await updateAutomation({ variables: { automationId, name } });
  }

  return (
    <div
      style={{
        background:
          "linear-gradient(180deg, rgba(15,15,16,0.8) 80%, rgba(20,33,48,0.4) 100%)",
      }}
      className="w-full p-3 border border-border/60 relative  rounded-2xl"
    >
      <div className="py-2  mb-4">
        <div className="flex items-center space-x-2">
          <div className=" size-5 flex items-center justify-center rounded-full">
            <IconStackFront />
          </div>
          <p className="text-sm text-muted-foreground">First step...</p>
        </div>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4  w-full"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-muted-foreground">
                  Name your automation
                </FormLabel>
                <FormControl>
                  <div
                    className="space-y-2 mt-6"
                    style={{ "--ring": "234 89% 74%" } as React.CSSProperties}
                  >
                    <Input {...field} placeholder="Name..." />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="platform"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div
                    className="space-y-2 mt-6"
                    style={{ "--ring": "234 89% 74%" } as React.CSSProperties}
                  >
                    <SelectPlatform />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <Button variant="second" className="w-full ">
            Start...
          </Button>
        </form>
      </Form>
      <Handle
        type="source"
        position={Position.Bottom}
        id="start-automation-node"
      />
    </div>
  );
};

export default StartNode;

const Square = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <span
    data-square
    className={cn(
      "flex size-5 items-center justify-center rounded bg-muted text-xs font-medium text-muted-foreground",
      className
    )}
    aria-hidden="true"
  >
    {children}
  </span>
);

function SelectPlatform() {
  return (
    <div className="space-y-2">
      <Label htmlFor="select-39" className="text-muted-foreground">
        What platform to automate?
      </Label>
      <Select defaultValue="instagram">
        <SelectTrigger className="ps-2 [&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>span_[data-square]]:shrink-0">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="[&_*[role=option]>span]:end-2 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:flex [&_*[role=option]>span]:items-center [&_*[role=option]>span]:gap-2 [&_*[role=option]]:pe-8 [&_*[role=option]]:ps-2">
          <SelectGroup>
            <SelectItem value="instagram">
              <Square className="text-[#E1306C]">
                <IconBrandInstagram />
              </Square>
              <span className="truncate">Instagram</span>
            </SelectItem>
            <SelectItem disabled value="facebook">
              <Square className="text-[#1877F2]">
                <IconBrandFacebook />
              </Square>
              <span className="truncate">Facebook</span>
            </SelectItem>
            <SelectItem disabled value="twitter">
              <Square className="text-[#1DA1F2]">
                <IconBrandTwitter />
              </Square>
              <span className="truncate">Twitter</span>
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
