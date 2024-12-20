import AutomationClient from "./_components/client";

interface PageProp {
  params: {
    id: string;
  };
}

export default async function Page({ params }: PageProp) {
  const id = await params.id;

  return (
    <div className="p-4 md:py-10">
      <AutomationClient id={id} />
    </div>
  );
}
