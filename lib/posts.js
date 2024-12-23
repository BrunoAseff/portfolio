import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import { parse } from "date-fns";
import { ptBR } from "date-fns/locale";

const postsDirectory = path.join(process.cwd(), "content/posts");

export async function getPost(slug) {
  const filePath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);
  const htmlContent = marked(content);

  return { data, content: htmlContent };
}

export async function getAllPosts() {
  const files = fs.readdirSync(postsDirectory);
  return files.map((file) => file.replace(/\.md$/, ""));
}

export async function getAllPostsWithData() {
  const files = fs.readdirSync(postsDirectory);
  const posts = await Promise.all(
    files.map(async (file) => {
      const slug = file.replace(/\.md$/, "");
      const { data } = await getPost(slug);
      const parsedDate = parse(data.date, "d 'de' MMMM 'de' yyyy", new Date(), {
        locale: ptBR,
      });

      return {
        slug,
        ...data,
        parsedDate,
      };
    })
  );

  return posts.sort((a, b) => b.parsedDate - a.parsedDate);
}
