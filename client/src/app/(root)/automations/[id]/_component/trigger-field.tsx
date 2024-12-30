"use client";
import { forwardRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  IconInfoSmall,
  IconPlus,
  IconChevronDown,
  IconQuotes,
  IconBrandInstagram,
} from "@tabler/icons-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TriggerProps {
  value?: string;
  onChange?: (value: string) => void;
  automationName: string;
}

export const TriggerField = forwardRef<HTMLButtonElement, TriggerProps>(
  ({ value, onChange, automationName }, ref) => {
    useEffect(() => {}, [value]);

    return (
      <div
        style={{
          background:
            "linear-gradient(180deg, rgba(15,15,16,0.8) 80%, rgba(20,33,48,0.4) 100%)",
        }}
        className="w-full p-3 max-w-lg border border-border/60 relative overflow-hidden rounded-2xl"
      >
        <div className="flex items-center space-x-2">
          <div className="bg-blue-600 size-5 flex items-center justify-center rounded-full">
            <IconInfoSmall className="text-white" />
          </div>
          <p className="text-xs text-muted-foreground">
            Start automation WHEN...
          </p>
        </div>
        <div className="mt-8">
          <Select value={value} onValueChange={onChange}>
            <SelectTrigger
              disabled={automationName.toLowerCase() === "untitled"}
              asChild
            >
              <Button
                ref={ref}
                variant="outline"
                className="w-full h-10 flex items-center justify-between border-dashed"
                onClick={() =>
                  console.log("Button clicked, current value:", value)
                }
              >
                {value ? (
                  <>
                    <SelectValue />
                    <IconChevronDown className="h-4 w-4 opacity-50 ml-2" />
                  </>
                ) : (
                  <div className="flex items-center w-full justify-center space-x-2">
                    <IconPlus className="h-4 w-4" />
                    <span>Add trigger</span>
                  </div>
                )}
              </Button>
            </SelectTrigger>
            <SelectContent
              align="start"
              alignOffset={500}
              sideOffset={-50}
              side="right"
            >
              <SelectItem value="COMMENT">
                <div className="flex items-center space-x-2 p-2">
                  <IconQuotes className="h-4 w-4" />
                  <p className="text-sm text-muted-foreground">
                    A potential lead has left a comment...
                  </p>
                </div>
              </SelectItem>
              <SelectItem value="DM">
                <div className="flex items-center space-x-2 p-2">
                  <IconBrandInstagram className="h-4 w-4" />
                  <p className="text-sm text-muted-foreground">
                    A potential lead has sent a message...
                  </p>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    );
  }
);

TriggerField.displayName = "TriggerField";
