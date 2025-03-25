import { BANNER } from "@/assets";
import AppWrapper from "@/components/hoc/AppWrapper";
import Image from "next/image";
import React from "react";

export default function Home() {
  return (
    <AppWrapper>
      <Image
        src={BANNER.src}
        alt="banner"
        width={1920}
        height={1080}
        style={{ width: "100%", height: "auto" }}
      />
    </AppWrapper>
  );
}
