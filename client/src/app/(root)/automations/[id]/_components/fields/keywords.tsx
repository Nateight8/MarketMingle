"use client";

import { Button } from "@/components/ui/button";

import { Label } from "@/components/ui/label";
import { IconDeviceFloppy } from "@tabler/icons-react";
import { Tag, TagInput } from "emblor";
import { useState, useEffect } from "react";
import { ControllerRenderProps } from "react-hook-form";

interface KeywordProps extends ControllerRenderProps {
  // Add any additional props here if needed
  handleNextStep: () => void;
}

export default function Keyword({
  onChange,
  value,
  handleNextStep,
}: KeywordProps) {
  const [exampleTags, setExampleTags] = useState<Tag[]>(
    (value as string[])?.map((text) => ({ id: text, text })) || []
  );
  const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);

  useEffect(() => {
    onChange(exampleTags.map((tag) => tag.text));
  }, [exampleTags, onChange]);

  return (
    <div
      style={{
        background:
          "linear-gradient(180deg, rgba(15,15,16,0.8) 80%, rgba(20,33,48,0.4) 100%)",
      }}
      className=" w-full p-3 max-w-lg border border-border/60 relative overflow-hidden rounded-2xl"
    >
      <div className="space-y-2">
        <Label htmlFor="input-57" className="text-sm text-muted-foreground">
          What keyword(s)?
        </Label>
        <TagInput
          id="input-57"
          tags={exampleTags}
          setTags={(newTags) => {
            setExampleTags(newTags);
          }}
          placeholder="Add a keyword or two..."
          styleClasses={{
            inlineTagsContainer:
              "border-input rounded-lg bg-background shadow-sm shadow-black/5 transition-shadow focus-within:border-ring focus-within:outline-none focus-within:ring-[3px] focus-within:ring-ring/20 p-1 gap-1",
            input:
              "w-full min-w-[80px] focus-visible:outline-none shadow-none px-2 h-7",
            tag: {
              body: "h-7 relative bg-background border border-input hover:bg-background rounded-md font-medium text-xs ps-2 pe-7",
              closeButton:
                "absolute -inset-y-px -end-px p-0 rounded-e-lg flex size-7 transition-colors outline-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 text-muted-foreground/80 hover:text-foreground",
            },
          }}
          activeTagIndex={activeTagIndex}
          setActiveTagIndex={setActiveTagIndex}
        />
      </div>
      <div className="mt-4">
        <Button onClick={handleNextStep} className="w-full" type="button">
          <IconDeviceFloppy /> Save progress
        </Button>
      </div>
    </div>
  );
}