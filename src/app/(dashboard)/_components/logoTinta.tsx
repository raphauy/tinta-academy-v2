"use client";

import { AdvancedImage } from "@cloudinary/react";
import { CloudinaryImage } from "@cloudinary/url-gen";
import { fill } from "@cloudinary/url-gen/actions/resize";
import Link from "next/link";


export default function LogoTinta() {
  const logoBlanco= new CloudinaryImage("tinta-posts/weghipyunecu3zem3pbc.png", {cloudName: "dtm41dmrz"}).resize(fill().width(107).height(36));
  const logoNegro = new CloudinaryImage("tinta-posts/cgpnyn6rzcmoembmxpcx.png", {cloudName: "dtm41dmrz"}).resize(fill().width(107).height(36));

  return (
    <Link href="/">
      <div className="flex flex-col justify-center">
        <div className="hidden dark:block">
          <AdvancedImage cldImg={logoBlanco} />
        </div>        
        <div className="dark:hidden">
          <AdvancedImage cldImg={logoNegro} />
        </div>        
        <p className="text-2xl ml-[2px] mt-[-7px] text-tinta-vino font-medium">academy</p>
      </div>
    </Link>
  )
}
