import style from './../styles';
import { logo } from './../assets';
import { footerLinks, socialMedia } from './../constants';
import { discount } from './../assets';

const Footer = () => (
  <section className={`${style.flexCenter} ${style.paddingY} flex-col`}>
    <div className={`${style.flexStart} md:flex-row flex-col mb-8 w-full`}>
      <div className="flex-1 flex flex-col justify-start mr-10">
        <h1 className="text-gradient text-2xl font-bold">THEBA INSURA</h1>
        {/* <p className={`${style.paragraph} mt-4 max-w=[310px]`}>
          <span className="text-white">A</span> People-Powered{' '}
          <span className="text-white">Alternative</span> Insurance
        </p> */}

        <div className="flex felx-row items-center py-[6px] px-4 bg-discount-gradient rounded-[10px] mb-2">
          <img src={discount} alt="discount" className="w-[32px] h-[32px]" />
          <p className={`${style.paragraph} ml-2`}>
            <span className="text-white">A</span> People-Powered{' '}
            <span className="text-white">Alternative</span> Insurance
          </p>
        </div>
      </div>
      <div
        className="flex-[1.5] w-full flex flex-row 
      justify-between flex-wrap md:mt-0 mt-10"
      >
        
      </div>
    </div>
    <div className="w-full flex justify-between item-center md:flex-row flex-col pt-6 border-t-[1px] border-t-[#3F3E45]">
      <p className="font-poppins font-normal text-center text-[18px] leading-[27px] text-white">
        Copyright 2023 THEBA INSURA. All Rights Reserved.
      </p>
      <div className="flex flex-row md:mt-0 mt-6">
      </div>
    </div>
  </section>
);

export default Footer;
