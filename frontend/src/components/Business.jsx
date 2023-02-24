import { features } from './../constants';
import style, { layout } from '../styles';
import Button from './Button';

const FeatureCard = ({ icon, title, content, index }) => (
  <div
    className={`flex flex-row p-6 rounded-[20px] 
    ${index !== features.length - 1 ? 'mb-6' : 'mb-0'} feature-card`}
  >
    <div
      className={`w-[64px] h-[64px] rounded-full ${style.flexCenter} bg-dimBlue`}
    >
      <img src={icon} alt="icon" className="w-[50%] h-[50%] object-contain" />
    </div>
    <div className="flex-1 flex flex-col ml-3">
      <h4 className="font-poppins font-semibold text-white text-[18px] leading-[23px] mb-1">
        {title}
      </h4>
      <p className="font-poppins font-normal text-dimWhite text-[16px] leading-[24px] mb-1">
        {content}
      </p>
    </div>
  </div>
);

const Business = () => {
  return (
    <section id="features" className={layout.section}>
      <div className={layout.sectionInfo}>
        <h2 className={style.heading2}>
          Insure Your Assets <br className="sm:block hidden" />
          Against DeFi Risks
        </h2>
        <p className={`${style.paragraph} max-w-[470px] mt-5 text-justify`}>
          Our policies are tailored to meet the unique needs of DeFi investors,
          with customizable coverage options and competitive rates. With our
          insurance, you can invest in DeFi with confidence, knowing that your
          assets are protected.
        </p>
        <Button styles="mt-10" />
      </div>
      <div className={`${layout.sectionImg} flex-col text-justify`}>
        {features.map((feature, index) => (
          <FeatureCard key={feature.id} {...feature} index={index} />
        ))}
      </div>
    </section>
  );
};

export default Business;
