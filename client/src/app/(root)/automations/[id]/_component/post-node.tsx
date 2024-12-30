import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { Bookmark, Heart, MessageCircle, Send } from "lucide-react";
import { Handle, Position } from "@xyflow/react";

type PostNodeData = {
  id: string;
  postId: string;
  caption: string;
  media: string;
  mediaType: string;
  automationId: string;
  __typename: string;
};

const PostNode = ({ data }: { data: PostNodeData }) => {
  const { automationId, media, postId } = data;

  console.log(media);

  return (
    <>
      <Handle
        id={`post-node-${postId}`}
        type="target"
        position={Position.Left}
      />

      <Card className="cursor-pointer transition-all w-full !max-w-xs">
        <CardHeader className="p-3 border-b">
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-2 w-[50px]" />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className={`aspect-square relative w-48`}>
            <Image src={media} fill alt="" className="object-cover" />
          </div>
        </CardContent>
        <CardFooter className="p-3 flex justify-between">
          <div className="flex gap-2">
            <button className="text-muted-foreground">
              <Heart className="h-3 w-3" />
              <span className="sr-only">Like</span>
            </button>
            <button className="text-muted-foreground">
              <MessageCircle className="h-3 w-3" />
              <span className="sr-only">Comment</span>
            </button>
            <button className="text-muted-foreground">
              <Send className="h-3 w-3" />
              <span className="sr-only">Share</span>
            </button>
          </div>
          <button className="text-muted-foreground">
            <Bookmark className="h-3 w-3" />
            <span className="sr-only">Save</span>
          </button>
        </CardFooter>
      </Card>
    </>
  );
};

export default PostNode;
