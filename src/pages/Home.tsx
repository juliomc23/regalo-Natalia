import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = {};

const Home = (props: Props) => {
  const [dialog, setDialog] = useState(
    "Hola Natalia, soy Oiluj, tu guía por esta pagina web."
  );
  const [step, setStep] = useState(0);

  const navigate = useNavigate();

  const changeDialog = () => {
    setStep(step + 1);
    if (step === 0) {
      setDialog(
        "Esta pagina está diseñada para que elijas tu destino de descanso."
      );
    }
    if (step === 1) {
      setDialog(
        "Es tu regalo de reyes pero a diferencia de otros regalos, este no tiene que ser elegido inmediatamente."
      );
    }
    if (step === 2) {
      setDialog(
        "A continuación, te daré la opción de que me digas distintas opciones para que elijas la ubicación donde pasarás un fin de semana con tu novio."
      );
    }
    if (step === 3) {
      setDialog("Vamos a ello!");
    }
    console.log(step);

    if (step === 4) {
      navigate("/destinos");
    }
  };

  return (
    <div className="main">
      <div className="app">
        <img
          src="https://github.com/juliomc23/regalo-front/blob/main/src/assets/guia.png?raw=true"
          className="guia_img"
        />
        <div className="dialogo">
          <p>{dialog}</p>
          {/* <button  */}
          <svg
            viewBox="0 0 96 96"
            xmlns="http://www.w3.org/2000/svg"
            onClick={changeDialog}
            className="continue_button"
          >
            <title />
            <path d="M69.8437,43.3876,33.8422,13.3863a6.0035,6.0035,0,0,0-7.6878,9.223l30.47,25.39-30.47,25.39a6.0035,6.0035,0,0,0,7.6878,9.2231L69.8437,52.6106a6.0091,6.0091,0,0,0,0-9.223Z" />
          </svg>
          {/* </button> */}
        </div>
        <div className="circle circle1"></div>
        <div className="circle circle2"></div>
        <div className="circle circle3"></div>
      </div>
    </div>
  );
};

export default Home;
