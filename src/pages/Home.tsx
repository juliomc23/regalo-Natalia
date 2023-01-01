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
        <img src="https://github.com/juliomc23/regalo-front/blob/main/src/assets/guia.png" />
        <div className="dialogo">{dialog}</div>
        <div className="circle circle1"></div>
        <div className="circle circle2"></div>
        <div className="circle circle3"></div>
      </div>

      <button onClick={changeDialog} className="continue_button">
        Cuentame más!
      </button>
    </div>
  );
};

export default Home;
