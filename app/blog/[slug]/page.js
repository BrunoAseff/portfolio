"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { CaretLeft, SunDim, MoonStars } from "phosphor-react";
import { useEffect, useState } from "react";

export default function BlogPostPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    document.body.style.backgroundColor = isDarkMode ? "#111827" : "white";

    return () => {
      document.body.style.backgroundColor = "";
    };
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

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

  return (
    <div
      className={`flex z-40 w-full md:mt-[150px] mt-6 min-h-screen items-center justify-center ${
        isDarkMode ? "bg-gray-900" : "bg-white"
      }`}
    >
      <div
        className={`flex relative flex-col z-40 max-h-screen pb-16 w-full p-8 border-t-[1px] ${
          isDarkMode
            ? "border-gray-700 bg-gray-900"
            : "border-gray-100 bg-white"
        } rounded-md`}
      >
        <Button
          onClick={toggleTheme}
          className={`absolute bg-transparent 
    top-4 left-4 
    md:top-10 md:right-10 md:left-auto 
    ${isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"} 
    border-gray-400 p-2`}
          variant="outline"
          size="icon"
        >
          {isDarkMode ? (
            <SunDim color="#d1d5db" size={32} />
          ) : (
            <MoonStars size={32} />
          )}
        </Button>

        <Button className="ml-0 mb-2 p-0" variant="link" asChild>
          <Link className="flex items-center" href="/blog">
            <CaretLeft color={isDarkMode ? "#d1d5db" : "black"} size={17} />
            <h2
              className={`font-semibold ${
                isDarkMode ? "text-gray-300" : "text-black"
              }`}
            >
              Voltar
            </h2>
          </Link>
        </Button>

        <article className="z-50 max-w-[90%] md:max-w-[60%] ul:list-disc li:ml-6 ml-auto mr-auto items-center flex flex-col">
          <div className="flex flex-col gap-2 items-center">
            <div className="md:max-w-[55%] max-w[90%] my-2">
              <h1
                className={`font-semibold text-center mb-2 text-2xl md:text-3xl ${
                  isDarkMode ? "text-gray-100" : "text-black"
                }`}
              >
                {data.title}
              </h1>
              <p
                className={`text-sm text-center ${
                  isDarkMode ? "text-gray-400" : "text-gray-900"
                } mb-4`}
              >
                {data.date}
              </p>
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
            className={`w-full [&>ul]:list-disc [&>ul]:ml-6 [&>h1]:text-3xl [&>h1]:font-medium [&>h2]:text-xl [&>h2]:font-semibold ${
              isDarkMode ? "text-gray-200" : "text-black"
            }`}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </article>
      </div>
    </div>
  );
}
