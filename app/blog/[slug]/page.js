import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { getPost, getAllPosts } from "@/lib/posts";
import { ThemeToggle } from "@/components/theme-toggle";

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((slug) => ({ slug }));
}

export const dynamic = "force-static";
export const dynamicParams = false;

export default async function BlogPostPage({ params }) {
  const { data, content } = await getPost(params.slug);

  return (
    <div className="flex z-40 w-full md:mt-[150px] mt-6 min-h-screen items-center justify-center bg-background text-foreground">
      <div className="flex relative flex-col z-40 max-h-screen pb-16 w-full p-8 border-t-[1px] rounded-md">
        <ThemeToggle />
        <Button className="ml-0 mb-2 p-0" variant="link" asChild>
          <Link className="flex items-center" href="/blog">
            <h2 className="font-semibold">Voltar</h2>
          </Link>
        </Button>

        <article className="z-50 max-w-[90%] md:max-w-[60%] ul:list-disc li:ml-6 ml-auto mr-auto items-center flex flex-col">
          <div className="flex flex-col gap-2 items-center">
            <div className="md:max-w-[55%] max-w[90%] my-2">
              <h1 className="font-semibold text-center mb-2 text-2xl md:text-3xl">
                {data.title}
              </h1>
              <p className="text-sm text-center mb-4">{data.date}</p>
            </div>
            <div className="w-full rounded-md max-h-[300px] mb-16 bg-cover flex justify-center">
              <Image
                src={data.coverImage}
                layout="responsive"
                width={300}
                height={50}
                alt="Cover Image"
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
          </div>

          <div
            className="w-full markdown"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </article>
      </div>
    </div>
  );
}
