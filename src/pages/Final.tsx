import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type Destinos = {
  _id: string;
  fecha_entrada: string;
  fecha_salida: string;
  destino: string;
};

const Final = () => {
  const navigate = useNavigate();
  const [destinos, setDestinos] = useState<Destinos[]>();

  useEffect(() => {
    const getDestinos = async () => {
      const response = await fetch("https://regalo-back.vercel.app/destinos");
      const data: Destinos[] = await response.json();

      setDestinos(data);
    };

    getDestinos();
  }, []);

  const start = () => {
    navigate("/");
    fetch("https://regalo-back.vercel.app/destinos", {
      method: "DELETE",
    });
  };

  return (
    <div className="fechas_div">
      <img src="https://github.com/juliomc23/regalo-front/blob/main/src/assets/guia.png" />

      <div className="destinos_div">
        <h1>
          Aquí tienes tus enlaces para ver hoteles y apartamentos en las
          ciudades deseadas
        </h1>
        <ul>
          {destinos?.map((destino) => (
            <li className="destinos_li">
              <a
                target={"_blank"}
                href={`https://www.airbnb.es/s/${destino.destino}/homes?tab_id=home_tab&refinement_paths%5B%5D=%2Fhomes&flexible_trip_lengths%5B%5D=one_week&price_filter_input_type=0&price_filter_num_nights=5&date_picker_type=calendar&checkin=${destino.fecha_entrada}&checkout=${destino.fecha_salida}&adults=2&source=structured_search_input_header&search_type=filter_change`}
              >
                {destino.destino}
              </a>
            </li>
          ))}
        </ul>

        <button className="continue_button finish" onClick={start}>
          Gracias Oiluj, tengo mis destinos!
        </button>
      </div>
    </div>
  );
};

export default Final;
