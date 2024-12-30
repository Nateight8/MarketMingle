"use client";
import { forwardRef, useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { IconInfoSmall } from "@tabler/icons-react";

import { ScrollArea } from "@/components/ui/scroll-area";
import SocialCard from "./social-card";

import { SocialPost } from "@/graphql/operations/post";

interface TriggerProps {
  value?: string;
  onChange?: (value: string) => void;
  posts: SocialPost[] | undefined;
}

interface Post {
  id: string;
  image: string;
  likes: number;
  comments: number;
}

export const SelectPost = forwardRef<HTMLButtonElement, TriggerProps>(
  ({ value, onChange, posts }, ref) => {
    const [InitialPosts, setInitialPosts] = useState<SocialPost[] | undefined>(
      posts
    );

    const handlePostDrag = (postId: string) => {
      // Remove the post from the list
      if (!InitialPosts) {
        return;
      }

      setInitialPosts((prevPosts) =>
        prevPosts?.filter((post) => post.id !== postId)
      );
    };
    console.log("POST FROM INSTAGRAM: ", posts);

    return (
      <div
        style={{
          background:
            "linear-gradient(180deg, rgba(15,15,16,0.8) 80%, rgba(20,33,48,0.4) 100%)",
        }}
        className="w-full p-3 max-w-lg border border-border/60 relative overflow-hidden rounded-2xl"
      >
        <div className="flex items-center space-x-2 bg-background pb-4">
          <div className="bg-blue-600 size-5 flex items-center justify-center rounded-full">
            <IconInfoSmall className="text-white" />
          </div>
          <p className="text-xs text-muted-foreground">
            On one or any of these post..
          </p>
        </div>
        <ScrollArea className="h-96">
          <div className="mt-2 px-2 pb-2 gap-2 grid grid-cols-2 ">
            {posts?.map((post) => (
              <SocialCard
                key={post.id}
                post={post}
                onPostDrag={() => handlePostDrag(post.id)}
              />
            ))}
          </div>
        </ScrollArea>
      </div>
    );
  }
);

SelectPost.displayName = "SelectPost";
