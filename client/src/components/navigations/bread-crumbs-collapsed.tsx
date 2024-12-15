"use client";

import Link from "next/link";

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

export function BreadcrumbCollapsed() {
  const pathname = usePathname(); //<== Get the current pathname.

  //   return an array of pathnames
  const pathnames = pathname.split("/").filter((path) => path); //<== return an array of strings by splitting every occurance where / is found e.g localHost:3000/shop/category becomes ["shop", "category"]

  return (
    <div className="my-2">
      <Breadcrumb>
        <BreadcrumbList>
          {pathnames.map((pathname, i) => {
            const href = `/${pathnames.slice(0, i + 1).join("/")}`;

            return (
              <Fragment key={i}>
                {/* Show separator before breadcrumb, but not for the first item */}
                {i !== 0 && <BreadcrumbSeparator />}
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link
                      href={href}
                      className={`capitalize ${
                        i === pathnames.length - 1
                          ? "text-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      {pathname}
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}

{
  /* 
<BreadcrumbItem>
  <BreadcrumbEllipsis />
</BreadcrumbItem>
<BreadcrumbSeparator />
<BreadcrumbItem>
  <BreadcrumbLink asChild>
    <Link href="/docs/components">Components</Link>
  </BreadcrumbLink>
</BreadcrumbItem>
<BreadcrumbSeparator />
<BreadcrumbItem>
  <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
</BreadcrumbItem> */
}
