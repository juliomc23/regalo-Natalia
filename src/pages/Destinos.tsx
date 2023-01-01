import { useEffect, useState } from "react";
import { json, useNavigate } from "react-router-dom";
import ClearIcon from "@mui/icons-material/Clear";

type Destinos = {
  _id: string;
  destino: string;
  fecha_entrada: string;
  fecha_salida: string;
};

type Fechas = {
  entrada: string;
  salida: string;
};

const Destinos = () => {
  const [sitios, setSitios] = useState<Destinos[]>([]);

  useEffect(() => {
    const getDestinos = async () => {
      const response = await fetch("http://localhost:3000/destinos/");
      const data = await response.json();

      setSitios(data);
    };

    getDestinos();
  }, []);

  const [lugar, setLugar] = useState("");

  const [fechas, setFechas] = useState<Fechas>({
    entrada: "",
    salida: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLugar(e.target.value);
  };

  const añadirSitio = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = e.target as HTMLFormElement;

    // console.log(target.children.item);

    const inputArray = Array.from(target.children);

    inputArray.map((input) => {
      const singleInputs = input as HTMLInputElement;
      singleInputs.value = "";
    });
    // const input = target.children[0] as HTMLInputElement;

    // peticion back para enviar los sitios
    const response = await fetch("http://localhost:3000/destinos", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        destino: lugar,
        fecha_entrada: fechas.entrada,
        fecha_salida: fechas.salida,
      }),
    });

    const data = await response.json();
    setSitios((prev) => [
      ...prev,
      {
        destino: data.destino,
        _id: data._id,
        fecha_entrada: data.fecha_entrada,
        fecha_salida: data.fecha_salida,
      },
    ]);
  };

  const eliminar = async (sitio: Destinos) => {
    console.log(sitio._id);

    const response = await fetch(
      `http://localhost:3000/destinos/${sitio._id}`,
      {
        method: "DELETE",
      }
    );

    const data = await response.json();

    const sitiosQueridos = sitios.filter((item) => item != sitio);
    setSitios(sitiosQueridos);
  };

  const cambiarFecha = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFechas((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const changeUrl = () => {
    if (sitios.length > 0) navigate("/final");
  };

  return (
    <div className="destinos_main">
      <img src="/src/assets/guia.png" />

      <div className="formulario">
        <h1>Dime sitios donde te gustaría ir</h1>
        <form onSubmit={añadirSitio} className="form_section">
          <div style={{ display: "flex", gap: "1rem" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label htmlFor="entrada">Entrada</label>
              <input
                type="date"
                onChange={cambiarFecha}
                name="entrada"
                className="fecha_input"
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label htmlFor="salida">Salida</label>
              <input
                type="date"
                onChange={cambiarFecha}
                name="salida"
                className="fecha_input"
              />
            </div>
          </div>

          <input
            onChange={handleChange}
            className="sitios_input"
            placeholder="Pulsa 'Enter' para añadir un sitio"
          />
        </form>
        <div>
          <ul style={{ listStyle: "disc" }}>
            {sitios.map((sitio, index) => (
              <li key={index}>
                <div className="sitios">
                  <span>{sitio.destino}</span>
                  <span> | </span>
                  <span>{sitio.fecha_entrada}</span>
                  <span>{sitio.fecha_salida}</span>

                  <ClearIcon
                    onClick={() => eliminar(sitio)}
                    sx={{ color: "white", cursor: "pointer" }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
        <button className="continue_button" onClick={changeUrl}>
          Continuar
        </button>
      </div>
    </div>
  );
};

export default Destinos;
