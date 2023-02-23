import { smartcon1 } from './../assets';
import style, { layout } from './../styles';
import Button from './Button';
const Billing = () => (
  <section id="product" className={layout.sectionReverse}>
    <div className={layout.sectionImgReverse}>
      <img src={smartcon1} alt="billing" className="w-[100%] relative z-[5]" />

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
        Smart Contract <br className="sm:block hidden" />
        Cover
      </h2>
      <p className={`${style.paragraph} max-w-[490px] mt-5`}>
        Secure risk and potential bugs in smart contract code. Be covered for
        events like The DAO hack or Parity multi-sig wallet issues. Purchase
        Smart Contract Cover
      </p>
      <div className="flex flex-row flex-wrap sm:mt-10 mt-6">
        <Button styles="mt-5" />
      </div>
    </div>
  </section>
);
export default Billing;
