import style from './../styles';
import Button from './Button';

const CTA = () => (
  <section
    className={`${style.flexCenter} ${style.marginY} ${style.padding}
  sm:flex-row flex-col bg-black-gradient-2 rounded-[20px] box-shadow `}
  >
    <div className="flex-1 flex flex-col">
      <h2 className={style.heading2}>Try our service now!</h2>
      <p className={`${style.paragraph} max-w-[470px] mt-5`}>
        Get covered against DeFi hacks, smart contract failures and protocol vulnerabilities
      </p>
    </div>
    <div className={`${style.flexCenter} sm:ml-10 ml-0 sm:mt-0 mt-10`}>
      <a
        href="https://www.theBlocAmora.com/services"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button />
      </a>
    </div>
  </section>
);

export default CTA;
