import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IconBrain, IconMessageChatbot } from "@tabler/icons-react";
import Link from "next/link";
// import { Icon, IconLink, IconProps } from "@tabler/icons-react";
// import { ForwardRefExoticComponent, RefAttributes } from "react";

// interface CardProps {
//   platform: string;
//   // Icon: ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>;
//   description: string;
// }

export function AutomationCard() {
  const isAIEnabled = false;
  const id = "1234";

  return (
    <Link href={`/automations/${id}`} className="">
      <Card className={cn(" bg-transparent")}>
        <CardHeader className="p-4">
          <CardTitle className="flex justify-between items-center ">
            <div className="flex items-center gap-3">
              {isAIEnabled ? <IconMessageChatbot /> : <IconBrain />}
              <span> DM Reply Automation</span>
            </div>

            {/* <Button size="icon" variant="outline">
            <IconDotsVertical />
          </Button> */}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="flex items-start space-x-2">
            {/* <MessageCircle className="w-6 h-6 text-muted-foreground mt-1" /> */}
            <div className="flex-1">
              <div className="bg-muted/40  p-2 rounded-xl border border/20">
                <p className="text-xs text-muted-foreground text-left">
                  {" "}
                  Latest message
                </p>
                <p className="text-sm text-left">
                  Hi there! How can I assist you today?
                </p>
              </div>
              <div className="mt-2 flex items-center">
                {isAIEnabled ? (
                  <>
                    {/* <Bot className="w-4 h-4 text-blue-500 mr-1" /> */}
                    <p className="text-xs italic text-muted-foreground">
                      Powered by AI
                    </p>
                  </>
                ) : (
                  <p className="text-xs italic text-muted-foreground">
                    Custom Message
                  </p>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
