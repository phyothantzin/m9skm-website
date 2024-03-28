"use client";
import Navbar from "@/app/components/nav/Navbar";
import Image from "next/image";
import DemoPic from "../../../public/assets/news/news.jpg";
import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "@/app/components/utilities/Pagination";
import Footer from "@/app/components/Footer";

const PAGE_SIZE = 4;

function page() {
  const [currentPage, setCurrentPage] = useState(0);
  const [news, setNews] = useState([]);

  const handlePageChange = (selected: any) => {
    setCurrentPage(selected);
  };

  const paginatedData = news.slice(
    currentPage * PAGE_SIZE,
    (currentPage + 1) * PAGE_SIZE
  );

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
    <>
      <Navbar visibleDefault={true} fixed={false} />

      <div className="flex flex-wrap gap-5 justify-center px-3 md:px-10 md:py-20 lg:px-[200px] py-10 lg:py-10 ">
        {/* card */}
        {paginatedData?.map((item: any) => {
          return (
            <a key={item?.id} href={`blogs/${item?.id}`}>
              <div className=" w-full h-[600px] md:w-[400px] md:h-[590px] bg-black relative rounded-md overflow-hidden">
                <div className="w-full h-[300px] ">
                  <Image
                    src={item?.photo}
                    width={200}
                    height={200}
                    alt="DemoPic"
                    priority
                    className="w-full h-full object-cover"
                  ></Image>
                </div>
                <div className="text-white px-5 ">
                  <span className="block mt-7 mb-3 blogTitle">
                    {item?.title}
                  </span>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: item?.description
                        ? item?.description.substr(0, 175) +
                          (item?.description.length > 175 ? "..." : "")
                        : "",
                    }}
                  ></p>
                  <button className="bg-[#fea61f] px-5 py-1 absolute bottom-7 left-5 text-black rounded-md ">
                    Continue Reading
                  </button>
                </div>
              </div>
            </a>
          );
        })}
      </div>

      {news && (
        <Pagination
          pageCount={Math.ceil(news.length / PAGE_SIZE)}
          onPageChange={handlePageChange}
        />
      )}

      <Footer footerColor={"black"} />
    </>
  );
}

export default page;
