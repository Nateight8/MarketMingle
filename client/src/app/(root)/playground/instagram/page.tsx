"use client";
import postOperations, { GetPostsData } from "@/graphql/operations/post";
import { useQuery } from "@apollo/client";
import Image from "next/image";

export default function page() {
  const { data } = useQuery<GetPostsData>(postOperations.Querries.getPosts);

  return (
    <div className="">
      {data?.getPosts.map(({ id, postid, media }) => (
        <div key={postid} className="relative h-96 w-72">
          <Image alt="" fill src={media} />
        </div>
      ))}
    </div>
  );
}
