import Navbar from "@/app/components/nav/Navbar";
import Image from "next/image";
import heroApp from "../../../../public/assets/news/news.jpg";
import Footer from "@/app/components/Footer";
import axios from "axios";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import console from "console";

interface NewsData {
  id: number;
  title: string;
  photo: any;
  description: string;
}

async function getData({ id }: { id: string }) {
  const res = await axios.get(
    `http://m9.goldenyellowtravel.com/api/v1/blog/show/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return res?.data?.data;
}

const Detail = async ({ params: { id } }: { params: { id: string } }) => {
  console.log(id);

  const news = await getData({ id });

  return (
    <>
      <Navbar visibleDefault={true} fixed={false} />
      <div className="bg-black p-5 md:p-[60px]">
        <a href={"/blogs"} className="">
          <button className="bg-[#fea61f] px-5 py-2 text-xs md:text-sm rounded-md ">
            &lt; Go Back
          </button>
        </a>

        <div className="flex justify-center mt-5 ">
          {news && (
            <div className="w-full md:w-[80%] lg:w-1/2">
              <span className="text-white text-2xl font-semibold ">
                {news?.title}
              </span>

              <div className="w-full mt-3">
                <Image
                  width={800}
                  height={800}
                  src={news.photo}
                  alt="hero_app"
                  priority
                  className="w-full object-cover"
                />
              </div>

              <div className="mt-4 flex flex-col gap-4 w-full text-white text-sm md:text-base lg:text-lg">
                <span
                  className="block"
                  dangerouslySetInnerHTML={{
                    __html: news.description ? news.description : "",
                  }}
                ></span>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer footerColor="" />
    </>
  );
};

export async function generateStaticParams() {
  const res = await axios.get(
    `http://m9.goldenyellowtravel.com/api/v1/blog/list`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return res?.data?.data.map((item: any) => ({ id: item.id.toString() }));
}

export default Detail;
