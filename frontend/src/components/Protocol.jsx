import { smartcon1 } from './../assets';
import style, { layout } from './../styles';
import Button from './Button';
const Protocol = () => (
  <section id="product" className={layout.sectionReverse}>
    <div className={layout.sectionImgReverse}>
      <img src={smartcon1} alt="billing" className="w-[90%] relative z-[5]" />
      <div className="absolute z-[1] w-[40%] h-[35%] top-0 blue__gradient" />
      <div className="absolute z-[3] w-[80%] h-[35%] top-0 pink__gradient" />
      <div className="absolute z-[3] w-[50%] h-[50%] left-20 bottom-20 blue__gradient" />
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
        DeFi Protocol Insurance{' '}
        <span className="text-gradient">(Coming Soon)</span>
        <br className="sm:block hidden" />
      </h2>
      <p className={`${style.paragraph} max-w-[490px] mt-5 text-justify`}>
        Safeguard your investments in DeFi protocols against the multifarious
        risks that face the growing Decentralized Finance Space. Our tailored
        insurance solutions will offer comprehensive coverage to protect your
        investments against potential losses.
      </p>
      <div className="flex flex-row flex-wrap sm:mt-10 mt-6">
        <Button styles="mt-5" />
      </div>
    </div>
  </section>
);
export default Protocol;
