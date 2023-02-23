import React from 'react';
import style from './../styles';
import { discount, robot, hosting } from './../assets';
import GetStarted from './GetStarted';
const Hero = () => {
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
          <h1 className="flex-1 font-poppins font-semibold ss:text-[42px] text-[42px] text-white ss:leading-[100px] leding-[75px]">
            Get Covered against
            <br className="sm:block hidden" />{' '}
            <span className="text-gradient">Exchange hacks &</span>
          </h1>
          <div className="ss:flex hidden md:mr-4 mr-0">
            <GetStarted />
          </div>
        </div>
        <h1 className="font-poppins font-semibold ss:text-[58px] text-[42px] text-white ss:leading-[100px] leading-[75px]">
          Smart Contract failure.
        </h1>
        <p className={`${style.paragraph} max-w-[470px] mt-5`}>
          In the event of a hack, theft, or other unforeseen event, our team of
          experts uses cutting-edge technology to monitor and stay-up to date on
          the crypto market so as to make sure clients assests are being
          protected
        </p>
      </div>
      <div className={`flex-1 flex ${style.flexCenter} md:my-0 my-10 relative`}>
        <img
          src={hosting}
          alt="billing"
          className="w-[100%] h-[100%] relative z=[5]"
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
