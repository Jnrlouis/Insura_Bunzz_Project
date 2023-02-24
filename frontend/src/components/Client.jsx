import { clients } from './../constants';
import style from './../styles';

const Client = () => (
  <section className={`${style}`}>
    <div className={`${style.flexCenter} flex-wrap w-full `}>
      {clients.map((client) => (
        <div
        key={client.id}
        className={`flex-1 ${style.flexCenter} sm:min-w-[192px] min-w-[120px]`}
        >
            <a href={client.link} target="_blank">
            <img
              src={client.logo}
              alt="client-logo"
              className="sm:w-[192px] w-[100px] object-contain  hover:text-white cursor-pointer"
            />
            </a>
          </div>
       
      ))}
    </div>
  </section>
);

export default Client;
