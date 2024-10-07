import { useEffect, useState } from "react";

// types/link.ts
export interface Link {
  description: string;
  url: string;
}

export default function ListLink() {
  const [links, setLinks] = useState<Link[]>([]);

  useEffect(() => {
    fetch("/api/links")
      .then((response) => response.json())
      .then((data) => {
        setLinks(data);
        console.log("fetched:", data);
      })
      .catch((error) => console.error("error:", error));
  }, []);

  return (
    <div>
      <h1>Links</h1>
      <ul>
        {links.map((link, index) => (
          <li key={index}>
            <a href={link.url}>{link.description}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
