import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import type { LoaderFunctionArgs } from "@remix-run/node"; // or cloudflare/deno
import db from "~/db.server";

async function getLoaderData(linkId: string) {
  const link = await db.link.findUnique({
    where: {
      id: parseInt(linkId),
    },
  });

  return link;
}

export const loader = async ({ params }: LoaderFunctionArgs) => {
  return json(await getLoaderData(params.linkId || "1"));
};

export default function Link() {
  const link = useLoaderData<typeof loader>();
  return (
    <div>
      <p>Product {link?.id}</p>
      {/* ... */}
    </div>
  );
}
