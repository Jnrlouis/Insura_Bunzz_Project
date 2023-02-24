import style from './styles';
import {
  Navbar,
  NavbarApp,
  EthPrice,
  NftAssest,
  Protocol,
  Business,
  Client,
  CTA,
  Footer,
  Testimonials,
  Hero,
} from './components';
const InsuraApp = () => (
  <div className="bg-primary w-full overflow-hidden">
    <div className={`${style.paddingX} ${style.flexCenter}`}>
      <div className={`${style.boxWidth}`}>
        <NavbarApp />
      </div>
    </div>

    {/* <div className={`bg-primary ${style.flexStart}`}>
      <div className={`${style.boxWidth}`}>
      </div>
    </div> */}

    <div className={`bg-primary ${style.paddingX} ${style.flexStart}`}>
      <div className={`${style.boxWidth}`}>
        <EthPrice />
        <NftAssest />
        <Footer />
      </div>
    </div>
  </div>
);
export default InsuraApp;
