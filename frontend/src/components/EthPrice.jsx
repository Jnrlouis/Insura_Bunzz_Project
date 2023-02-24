import { eth } from './../assets';
import style, { layout } from './../styles';
import ButtonApp from './ButtonApp';
import Ethform from './Ethform';
const EThPrice = () => (
  <section id="ethprice" className={layout.sectionReverse}>
    <div className={layout.sectionImgReverse}>
      <Ethform/>
      <div className="absolute z-[-1] w-[40%] h-[35%] top-0 blue__gradient" />
      <div className="absolute z-[-3] w-[80%] h-[35%] top-0 pink__gradient" />
      <div className="absolute z-[-3] w-[50%] h-[50%] left-20 bottom-20 blue__gradient" />
      <div
        cLassName="absolute z-[3] -left-1/2
        top-0 w-[50%] h-[50%] rounded-full
        white__gradient"
      />
      <div
        className="absolute z-[0] -left-1/2
          bottom-0 w-[50%] h-[50%] rounded-full
          pink__gradient"
      />
    </div>
    <div className={layout.sectionInfo}>
      <h2 className={`${style.heading2} mr-2`}>
        ETH Price Insurance
        <br className="sm:block hidden" />
      </h2>
      <p className={`${style.paragraph} max-w-[490px] mt-5 text-justify`}>
        A policy that insures against the fall of $Ether value. This policy
        leverages the native parametric insurance model to ensure policy holders
        are automatically compensated once the price is triggered. No need for
        risk adjusters or 3rd parties, chainlink decentralized price feeds serve
        as the oracle.
      </p>
      <div className="flex flex-row flex-wrap sm:mt-10 mt-6">
        <ButtonApp styles="mt-5" />
      </div>
    </div>
  </section>
);
export default EThPrice;
