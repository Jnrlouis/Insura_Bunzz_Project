import { bag } from './../assets';
import style, { layout } from './../styles';
import ButtonApp from './ButtonApp';
import NftAssetform from './NftAssetform';

const NftAssest = () => (
  <section id="nftassest" className={layout.section}>
    <div className={layout.sectionInfo}>
      <h2 className={style.heading2}>
        NFT Assest Insurance
        <br className="sm:block hidden" />
      </h2>
      <p className={`${style.paragraph} max-w-[490px] mt-5 text-justify`}>
        A policy designed to provide protection for NFT owners against a variety
        of risks, including cyber attacks, theft, loss, and damage. These
        policies typically cover the full value of the NFT asset and provide
        compensation for any loss or damage incurred by the owner.
      </p>
      <ButtonApp styles="mt-10" />
    </div>
    <div className={`${layout.sectionImg} `}>
      <NftAssetform />
      <div className="absolute z-[-1] w-[40%] h-[35%] top-0 pink__gradient" />
      <div className="absolute z-[-1] w-[80%] h-[35%] top-0 pink__gradient" />
      <div className="absolute z-[-2] w-[50%] h-[50%] right-20 bottom-20 blue__gradient" />
    </div>
  </section>
);

export default NftAssest;
