import React from 'react';
import style from './../styles';
import { discount, bubble, hosting } from './../assets';
import { Link } from 'react-router-dom';

import GetStarted from './GetStarted';
import Readmore from './ReadMore';
const Hero = () => {
  const text =
    'offers comprehensive insurance solutions that safeguard your assets in the event of hacks, smart contract failures, and other unforeseen events.';
  const maxLength = 5;
  return (
    <section
      id="home"
      className={`flex md:flex-row flex-col ${style.paddingY}`}
    >
      <div
        className={`flex-1 ${style.flexStart} flex-col xl:px-0 sm:px-16 px-6`}
      >
        <div className="flex felx-row items-center py-[6px] px-4 bg-discount-gradient rounded-[10px] mb-2">
          <img src={discount} alt="discount" className="w-[32px] h-[32px]" />
          <p className={`${style.paragraph} ml-2`}>
            <span className="text-white">A</span> People-Powered{' '}
            <span className="text-white">Alternative</span> Insurance
          </p>
        </div>

        <div className="flex flex-row justify-between items-center w-full">
          <h1 className="flex-1 font-poppins font-semibold ss:text-[62px] text-[52px] text-white ss:leading-[100px] leding-[75px]">
            Get Covered
            <br className="sm:block hidden" />{' '}
          </h1>
          <div className="ss:flex hidden md:mr-4 mr-0">
            <Link to="/InsuraApp">
              <GetStarted />
            </Link>
          </div>
        </div>
        <h1 className="font-poppins font-semibold ss:text-[48px] text-[22px] text-white ss:leading-[100px] leading-[75px]">
          <span className="text-gradient">against DeFi hacks, </span>
          Smart Contract failures &{' '}
          <span className="text-gradient">Protocol Vulnerabilities,</span>
        </h1>
        <p
          className={`${style.paragraph} max-w-[470px] mt-3 text-justify inline-block `}
        >
          With the rapid growth of Decentralized Finance (DeFi), it's crucial to
          ensure that your assets are protected against potential risks. THEBA
          Insura {''}
          <span className="inline-block">
            <Readmore text={text} maxLength={maxLength} />
          </span>
        </p>
      </div>
      <div className={`flex-1 flex ${style.flexCenter} md:my-0 my-10 relative`}>
        <img
          src={hosting}
          alt="billing"
          className="w-[100%] h-[100%] relative z=[5]"
        />
        <img
          src={bubble}
          alt="billing"
          className="absolute w-[100%] h-[80%] z=[0] top-0"
        />

        <div className="absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient" />
        <div className="absolute z-[1] w-[80%] h-[35%] top-0 pink__gradient" />
        <div className="absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 blue__gradient" />
      </div>
      <div className={`ss:hidden ${style.flexCenter}`}>
        <GetStarted />
      </div>
    </section>
  );
};

export default Hero;
