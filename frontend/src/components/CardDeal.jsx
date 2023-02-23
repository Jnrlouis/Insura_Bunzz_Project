import { bag } from './../assets';
import style, { layout } from './../styles';
import Button from './Button';

const CardDeal = () => (
  <section id="features" className={layout.section}>
    <div className={layout.sectionInfo}>
      <h2 className={style.heading2}>
        Crypto Wallet cover
        <br className="sm:block hidden" />
      </h2>
      <p className={`${style.paragraph} max-w-[470px] mt-5`}>
        We are building an alternative risk sharing platform. In the future we
        plan to offer crypto wallet cover, as well as more standard products,
        like earthquake cover
      </p>
      <Button styles="mt-10" />
    </div>
    <div className={`${layout.sectionImg} `}>
      <img src={bag} alt="card" className="w-[100%] h-[100%]" />
      <div className="absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient" />
      <div className="absolute z-[1] w-[80%] h-[35%] top-0 pink__gradient" />
      <div className="absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 blue__gradient" />
    </div>
  </section>
);

export default CardDeal;
