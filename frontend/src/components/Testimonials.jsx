import { feedback } from './../constants';
import style from '../styles';
import FeedbackCard from './FeedbackCard';
const Testimonials = () => (
  <section
    id="clients"
    className={`${style.paddingY} ${style.flexCenter} flex-col relative`}
  >
    <div className="absolute z-[0] w-[60%] h-[60%] -right-[50%] rounded-full blue__gradient" />

    <div className="w-full flex justify-between items-center md:flex-row flex-col sm:mb-16 mb-6 relative z-[1]">
      <h1 className={style.heading2}>
        Meet The BlocAmora <br className="sm:block hidden" />
        Team Members
      </h1>

      <div className="w-full md:mt-0 mt-6">
        <p className={`${style.paragraph} text-left max-w-[450px]`}>
          THEBA INSURA Decentralize Application was developed by The BlocAmora
          team.
        </p>
      </div>
    </div>
    <div className="flex flex-wrap sm:justify-start justify-center w-full feedback-container relative z-[1]">
      {feedback.map((card) => (
        <FeedbackCard key={card.id} {...card} />
      ))}
    </div>
  </section>
);

export default Testimonials;
