import fs from "fs";
import path from "path";
import Link from "next/link";
import matter from "gray-matter";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { parse } from "date-fns";
import { ptBR } from "date-fns/locale";

// Function to get blog posts and sort them by date
const getBlogPosts = () => {
  const postsDir = path.join(process.cwd(), "content/posts");
  const filenames = fs.readdirSync(postsDir);

  const posts = filenames.map((filename) => {
    const filePath = path.join(postsDir, filename);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContents);

    // Parse the Portuguese date string into a valid Date object
    const parsedDate = parse(data.date, "d 'de' MMMM 'de' yyyy", new Date(), {
      locale: ptBR,
    });

    return {
      slug: filename.replace(".md", ""),
      title: data.title,
      date: data.date, // Keep the original date string
      parsedDate, // Store the parsed date for sorting
      coverImage: data.coverImage,
      description: data.description,
    };
  });

  // Sort posts by parsedDate in descending order (latest first)
  const sortedPosts = posts.sort((a, b) => b.parsedDate - a.parsedDate);

  return sortedPosts;
};

export default async function BlogPage() {
  const posts = getBlogPosts();

  return (
    <div className="flex z-40 max-w-full h-screen md:items-center items-start justify-center  overflow-hidden">
      <Card className="flex flex-col mt-6 md:mt-64 h-[95%] md:h-screen max-w-[100%]  p-8  overflow-y-auto overflow-x-hidden  bg-white border">
        <div className="flex flex-col gap-2 items-center ">
          <Image
            className="rounded-full"
            src="/avatar.png"
            width={60}
            height={60}
            alt="Meu avatar"
          />
          <div className="max-w-72 text-center">
            <h1 className="font-semibold text-4xl">Bruno Aseff</h1>
            <p className="text-gray-600 text-sm m-4">
              Um blog que traz assuntos sobre tecnologia, programação da
              perspectiva de um desenvolvedor e redator.
            </p>
          </div>
        </div>
        <Separator orientation="horizontal" />

        <CardContent>
          <ul className="flex md:flex-row md:flex-wrap md:max-w-[100%] md:mb-32 flex-col w-full mt-2 gap-1 items-center md:items-start">
            {posts.map((post, index) => (
              <li
                className="max-w-[350px] hover:bg-slate-100 rounded-lg p-6"
                key={post.slug}
              >
                <Link href={`/blog/${post.slug}`}>
                  <div className="w-[300px] rounded-sm bg-cover overflow-hidden h-[200px]">
                    <Image
                      className="shadow-2xl shadow-black"
                      src={post.coverImage}
                      width={350}
                      height={200}
                      alt={post.title}
                    />
                  </div>
                  <div className="flex flex-col mt-3 gap-2 w-full ">
                    <div className="flex justify-between">
                      <Badge className="max-w-fit" variant="outline">
                        {post.date}
                      </Badge>
                      {/* Show "novo" badge only for the first post (index === 0) */}
                      {index === 0 && (
                        <Badge
                          variant="outline"
                          className="max-w-fit border-green-500 text-green-500 px-1 text-sm"
                        >
                          novo
                        </Badge>
                      )}
                    </div>
                    <Link href={`/blog/${post.slug}`}>
                      <h2 className="font-semibold">{post.title}</h2>
                    </Link>
                  </div>
                  <p className="text-sm mt-2 max-w-[90%] text-gray-900">
                    {post.description}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
