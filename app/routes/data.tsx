// Define the Link interface
export interface Link {
  description: string;
  url: string;
  id: number;
}

// Sample data
export const links: Link[] = [
  { description: "Google", url: "https://www.google.com", id: 1 },
  { description: "GitHub", url: "https://github.com", id: 2 },
  { description: "Remix Docs", url: "https://remix.run/docs", id: 3 },
];
