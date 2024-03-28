"use client";
import Image from "next/image";
import React, { useState } from "react";
import Viber from "../../public/assets/footer/footer-viber.png";
import Telegram from "../../public/assets/footer/footer-telegram.png";
import Phone from "../../public/assets/footer/footer-phone.png";
import Contacts from "./utilities/Contacts";
const Footer = ({ footerColor }: { footerColor: string }) => {
  const { viberLink, telegramLink, phoneNumber } = Contacts();

  return (
    <div
      className={`flex flex-col h-auto lg:h-[300px] py-8 ${
        footerColor === "black" ? "bg-black text-white" : ""
      }`}
    >
      <p className="subTitleMM text-center pb-7 font-bold">ဆက်သွယ်ရန်</p>

      <div className="flex flex-col lg:flex-row items-center px-3 md:px-5 justify-center gap-5 text-white font-semibold ">
        <a href={viberLink}>
          <div className="flex gap-4 md:gap-5 items-center w-[290px] md:min-w-[310px] lg:w-[29%] max-w-[330px] p-3 bg-[#573187] rounded-lg">
            <Image
              src={Viber}
              width={150}
              height={150}
              alt="viber-logo"
              className="w-10 h-10 md:w-12 md:h-12"
            ></Image>
            <p className="text-sm md:text-md">Viber ဖြင့်ဆက်သွယ်ရန် နှိပ်ပါ</p>
          </div>
        </a>

        <a href={telegramLink}>
          <div className="flex gap-4 md:gap-5 items-center w-[290px] md:min-w-[310px] lg:w-[29%] max-w-[330px] p-3 bg-[#0082be] rounded-lg">
            <Image
              src={Telegram}
              width={150}
              height={150}
              alt="viber-logo"
              className="w-10 h-10 md:w-12 md:h-12"
            ></Image>
            <p className="text-sm md:text-md">
              Telegram ဖြင့်ဆက်သွယ်ရန် နှိပ်ပါ
            </p>
          </div>
        </a>
        <a href={`tel:${phoneNumber}`}>
          <div className="flex gap-4 md:gap-5 items-center w-[290px] md:min-w-[310px] lg:w-[29%] max-w-[330px] p-3 bg-[#58b961] rounded-lg">
            <Image
              src={Phone}
              width={150}
              height={150}
              alt="viber-logo"
              className="w-10 h-10 md:w-12 md:h-12"
            ></Image>
            <p className="text-sm md:text-md">ဖုန်းဖြင့်ဆက်သွယ်မည်</p>
          </div>
        </a>
      </div>

      <div className="flex w-full my-5 px-5 lg:px-20 justify-between text-sm md:text-base">
        <p>Privacy Policy</p>
        <p>Terms of Service</p>
      </div>

      <p className="mt-5 text-center">Copyright &copy; 2024</p>
    </div>
  );
};

export default Footer;
