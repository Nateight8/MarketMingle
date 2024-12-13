import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Icon, IconLink, IconProps } from "@tabler/icons-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

interface CardProps {
  platform: string;
  Icon: ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>;
  description: string;
}

export function SocialCard({ platform, Icon, description }: CardProps) {
  return (
    <Card className={cn(" bg-transparent")}>
      <CardHeader className="p-4">
        <CardTitle className="flex justify-between items-center ">
          <div className="flex items-center gap-3">
            <Icon />
            <span> {platform}</span>
          </div>

          <Button size="icon" variant="outline">
            <IconLink />
          </Button>
        </CardTitle>
        <CardDescription>
          {/* connect to your {platform} account to automate replies, schedule posts
          and grow community */}
          {description}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
