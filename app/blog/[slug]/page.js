"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { CaretLeft } from "phosphor-react";
import { useEffect, useState } from "react";

export default function BlogPostPage() {
  const params = useParams();
  const { slug } = params || {};

  const [post, setPost] = useState({ data: {}, content: "" });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!slug) throw new Error("Slug is undefined");
        const response = await fetch(`/api/posts/${slug}`);
        if (!response.ok)
          throw new Error(`Error fetching post data: ${response.statusText}`);
        const { data, content } = await response.json();
        setPost({ data, content });
      } catch (err) {
        console.error("Error fetching post data:", err.message);
        setError(err.message);
      }
    };

    fetchData();
  }, [slug]);

  const { data, content } = post;
  if (error) return <p>Error: {error}</p>;
  if (!data.title) return <p>Loading...</p>;

  return (
    <div className="flex z-40 w-full h-screen items-center justify-center">
      <div className="flex flex-col mt-64  pb-16 max-h-screen w-full md:p-8 border-t-[1px] border-gray-100 rounded-md bg-white">
        <Button className="ml-0 mb-2 p-0" variant="link" asChild>
          <Link className="flex items-center " href="/blog">
            <CaretLeft size={17} />

            <h2 className="font-semibold ">Voltar</h2>
          </Link>
        </Button>

        <article className="z-50 max-w-[60%] ml-auto mr-auto items-center flex flex-col">
          <div className="flex flex-col gap-2 items-center">
            <div className="max-w-[55%] my-2">
              {" "}
              <h1 className="font-semibold text-center mb-2 text-3xl">
                {data.title}
              </h1>
              <p className="text-sm text-center text-gray-400 mb-4">
                {data.date}
              </p>
            </div>
            <div className="w-full rounded-md max-h-[300px] mb-16 bg-cover flex justify-center">
              <Image
                src={data.coverImage}
                layout="responsive"
                width={100}
                height={50}
                alt="Cover Image"
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
          </div>
          <div
            className="prose max-w-[80%] w-full"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </article>
      </div>
    </div>
  );
}
