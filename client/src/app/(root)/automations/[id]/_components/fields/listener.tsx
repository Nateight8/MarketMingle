import { forwardRef } from "react";
import { Button } from "@/components/ui/button";
import {
  IconInfoSmall,
  IconChevronDown,
  IconRobot,
  IconBrandTelegram,
  IconBrandHipchat,
} from "@tabler/icons-react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TriggerProps
  extends Omit<React.ComponentPropsWithoutRef<typeof Select>, "onValueChange"> {
  onChange?: (value: string) => void;
}

export const Listener = forwardRef<HTMLButtonElement, TriggerProps>(
  ({ value, onChange, ...props }, ref) => {
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
            <IconInfoSmall />
          </div>
          <p className="text-sm text-muted-foreground">let...</p>
        </div>
        <div className="mt-8">
          <Select value={value} onValueChange={onChange} {...props}>
            <SelectTrigger ref={ref} asChild>
              <Button
                variant="outline"
                className="w-full flex items-center justify-center border-dashed"
              >
                {value ? (
                  <div className="flex w-full items-center justify-between">
                    <SelectValue />
                    <IconChevronDown className="h-4 w-4 opacity-50" />
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-4">
                    <IconBrandHipchat className="h-4 w-4" />
                    <span className="ml-3">Smart AI or Your Words?</span>
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
              <SelectGroup>
                <SelectItem value="SMARTAI">
                  <div className="flex items-center space-x-2 p-2">
                    <IconRobot />

                    <p className="text-sm text-muted-foreground">
                      Smart Ai do the talking
                    </p>
                  </div>
                </SelectItem>
                <div className="w-full px-6 flex items-center justify-center">
                  <div className="border-t flex-grow"></div>
                  <span className="px-4 text-sm text-muted-foreground">OR</span>
                  <div className="border-t flex-grow"></div>
                </div>
                <SelectItem value="MESSAGE">
                  <div className="flex items-center space-x-2 p-2">
                    <IconBrandTelegram />

                    <p className="text-sm text-muted-foreground">
                      Send a custom message
                    </p>
                  </div>
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    );
  }
);

Listener.displayName = "Listener";
