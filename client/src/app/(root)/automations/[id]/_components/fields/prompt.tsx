"use client";

import { Button } from "@/components/ui/button";
import { FormLabel } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { IconDeviceFloppy, IconInfoSmall } from "@tabler/icons-react";

const tags: { id: string; text: string }[] = [];

export default function Prompt({
  handleNextStep,
}: {
  handleNextStep: () => void;
}) {
  return (
    <>
      <div
        style={{
          background:
            "linear-gradient(180deg, rgba(15,15,16,0.8) 80%, rgba(20,33,48,0.4) 100%)",
        }}
        className=" w-full p-3 max-w-lg border border-border/60 relative overflow-hidden rounded-2xl"
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
          // NOTE: This inline style is to show how to set the --ring variable in your CSS file in order to change the focus ring color.
          style={{ "--ring": "234 89% 74%" } as React.CSSProperties}
        >
          <Textarea id="textarea-05" placeholder="Write a prompt..." />
        </div>
        <div className="mt-6">
          <Button onClick={handleNextStep} className="w-full">
            <IconDeviceFloppy /> Save progress
          </Button>
        </div>
      </div>
    </>
  );
}
