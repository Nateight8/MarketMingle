"use client";
import { AutomationCard } from "./_components/automation-card";

export default function Page() {
  return (
    <div className="p-4 md:py-10">
      <div className="grid grid-cols-3 gap-4 mx-auto max-w-6xl">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <AutomationCard key={item} />
        ))}
      </div>
    </div>
  );
}
