import React from 'react';
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai';
import { BsGlobe } from 'react-icons/bs';
import Link from 'next/link';

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <p className="my-4">TangoBee &copy; { new Date().getFullYear() }</p>
      </div>
      <div className="mb-8 text-white ">
        <div className="flex justify-center items-center">
          <Link target={"_blank"} href="https://github.com/tangobeee/">
            <AiFillGithub size={30} className="mx-2 cursor-pointer" />
          </Link>
          <Link href="">
            <AiFillLinkedin size={30} className="mx-2" />
          </Link>
          <Link target={"_blank"} href="https://tangobee.netlify.app/">
            <BsGlobe size={30} className="mx-2" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
