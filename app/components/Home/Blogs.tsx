import Image from "next/image";
import React, { useEffect, useState } from "react";
import DemoPic from "../../../public/assets/news/news.jpg";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import axios from "axios";
import { url } from "inspector";

const Blogs = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    axios
      .get(`http://m9.goldenyellowtravel.com/api/v1/blog/list`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        const fetchedData = res?.data?.data;
        setNews(fetchedData);
      })
      .catch((error) => {
        console.error("Error fetching news:", error);
      });
  }, []);

  return (
    <div className="bg-black h-[375px] lg:h-[550px] xl:h-[630px] px-10 xl:px-[190px] py-[30px] flex flex-row justify-center items-center">
      {/* Carousal */}
      <Carousel
        opts={{
          align: "center",
        }}
        className="w-[200px] md:w-[650px] lg:w-[830px]"
      >
        <CarouselContent className="">
          {news?.map((newItem: any) => (
            <CarouselItem
              key={newItem?.id}
              className="md:basis-1/2 lg:basis-1/3 "
            >
              <a href={`blogs/${newItem?.id}`}>
                <div className="h-[300px] rounded-xl overflow-hidden cursor-pointer">
                  <div className="w-full h-full relative">
                    <Image
                      width={260}
                      height={300}
                      src={newItem?.photo}
                      alt="blogs"
                      className="w-full h-full object-cover"
                    ></Image>

                    {/* text over picture */}
                    <div className="absolute top-0 pt-[160px] lg:opacity-0 lg:hover:opacity-100 inset-0 flex items-center justify-center transition-opacity duration-500 ">
                      <div className="text-white p-5 bg-black bg-opacity-50 w-full h-full">
                        <h3 className="text-lg font-semibold pb-2">
                          {newItem?.title}
                        </h3>
                        <p
                          className="text-sm"
                          dangerouslySetInnerHTML={{
                            __html: newItem?.description
                              ? newItem?.description.substr(0, 90) +
                                (newItem?.description.length > 90 ? "..." : "")
                              : "",
                          }}
                        ></p>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default Blogs;
