"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { SocialPost } from "@/graphql/operations/post";
import { Heart, MessageCircle, Send, Bookmark } from "lucide-react";
import Image from "next/image";

interface Post {
  id: string;
  image: string;
  likes: number;
  comments: number;
}

interface SocialCardProps {
  onPostDrag: () => void;
  post: SocialPost;
}

export default function SocialCard({ onPostDrag, post }: SocialCardProps) {
  const onDragStart = (event: React.DragEvent<HTMLDivElement>, post: any) => {
    // Attach the post data to the drag event
    event.dataTransfer.setData("application/reactflow", JSON.stringify(post));
    event.dataTransfer.effectAllowed = "move";
    onPostDrag();
    console.log("Post being dragged:", post);
  };

  return (
    <Card
      className="cursor-pointer transition-all w-full max-w-xs"
      draggable
      onDragStart={(event) => onDragStart(event, post)}
    >
      <CardHeader className="p-3 border-b">
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-6 rounded-full" />
          <Skeleton className="h-2 w-[50px]" />
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className={`aspect-square relative `}>
          <Image src={post.media} fill alt="" className="object-cover" />
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
  );
}
