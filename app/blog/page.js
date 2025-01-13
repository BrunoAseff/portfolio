import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getAllPostsWithData } from "@/lib/posts";
import Image from "next/image";
import { BlogCardImage } from "@/components/BlogCardImage";

export default async function BlogPage() {
  const posts = await getAllPostsWithData();

  return (
    <div className="flex z-40 max-w-full h-screen md:items-center items-start justify-center overflow-hidden">
      <Card className="flex ring-gray-300 outline-gray-300 border-gray-300 shadow-none flex-col mt-6 md:mt-64 h-[95%] md:h-screen md:max-w-none max-w-[100%] p-8 overflow-y-auto overflow-x-hidden bg-white">
        <div className="flex flex-col gap-2 items-center">
          <Image
            className="rounded-full"
            src="/avatar.png"
            width={60}
            height={60}
            alt="Meu avatar"
          />
          <div className="max-w-72 text-center">
            <h1 className="font-semibold text-black text-4xl">Bruno Aseff</h1>
            <p className="text-gray-600 text-sm m-4">
              Um blog que traz assuntos sobre tecnologia, programação da
              perspectiva de um desenvolvedor e redator.
            </p>
          </div>
        </div>
        <Separator className="bg-gray-300   " orientation="horizontal" />

        <CardContent>
          <ul className="flex md:flex-row md:flex-wrap md:mb-32 flex-col shadow-none border-none w-full mt-2 gap-1 items-center md:items-start">
            {posts.map((post, index) => (
              <li
                className="max-w-[350px] hover:bg-slate-100 rounded-lg p-6 group"
                key={post.slug}
              >
                <Link href={`/blog/${post.slug}`}>
                  <BlogCardImage src={post.coverImage} alt={post.title} />
                  <div className="flex flex-col mt-3 gap-2 w-full">
                    <div className="flex justify-between">
                      <Badge
                        className="max-w-fit bg-black/5 border-black/60 text-black"
                        variant="outline"
                      >
                        {post.date}
                      </Badge>

                      {index === 0 && (
                        <Badge
                          variant="outline"
                          className="max-w-fit border-emerald-500/60 bg-emerald-700/10 text-emerald-500 px-1 text-xs"
                        >
                          novo
                        </Badge>
                      )}
                    </div>
                    <h2 className="font-semibold text-black">{post.title}</h2>
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
