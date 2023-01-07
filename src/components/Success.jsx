import { useNavigate } from "react-router-dom";

import successIcon from "../assets/img/Success-PNG-Image.png";

const Success = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="mt-10 ml-20 absolute">
        <button
          onClick={() => navigate("/list")}
          className="bg-amber-500 hover:bg-amber-600 text-base font-bold py-2 px-2 text-white m-auto rounded-md"
        >
          Lista Respuestas
        </button>
      </div>

      <div className="mt-5 mb-10  shadow-lg shadow-indigo-800 w-3/5 md:w-1/2 m-auto bg-white">
        <div className="flex flex-col items-center">
          <div className="text-center my-10">
            <h1 className="text-4xl font-bold mb-10">Registro Exitoso!</h1>
            <p className="text-lg text-indigo-700 font-semibold">
              ¡Tu registro se realizo correctamente!
            </p>
          </div>
          <img
            src={successIcon}
            alt="success icon"
            width={200}
            className="mb-10"
          />
          <button
            onClick={() => navigate("/")}
            className="bg-indigo-600 hover:bg-indigo-800 text-white text-lg font-bold uppercase my-10 w-1/3 py-2 px-2 rounded-md"
          >
            Volver
          </button>
        </div>
      </div>
    </>
  );
};

export default Success;
