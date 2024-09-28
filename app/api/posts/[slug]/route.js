import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

export async function GET(request, { params }) {
  const { slug } = params;

  const filePath = path.join(process.cwd(), "content/posts", `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return new Response(
      JSON.stringify({ error: `Post with slug "${slug}" not found.` }),
      {
        status: 404,
      }
    );
  }

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  // Convert markdown content to HTML
  const htmlContent = marked(content);

  return new Response(JSON.stringify({ data, content: htmlContent }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
