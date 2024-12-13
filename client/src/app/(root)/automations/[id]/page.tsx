"use client";
interface PageProp {
  params: {
    id: string;
  };
}

export default function Page({ params }: PageProp) {
  return <div className="p-4 md:py-10">{params.id}</div>;
}
