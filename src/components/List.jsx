import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import firebaseApp from "../firebase";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";

const List = () => {
  const [list, setList] = useState([]);
  const db = getFirestore(firebaseApp);

  const navigate = useNavigate();

  useEffect(() => {
    const getList = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "respuestas"));

        const docs = querySnapshot.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        });

        setList(docs);
      } catch (error) {
        console.log(error);
      }
    };

    getList();
  }, []);

  return (
    <div className="mt-5 mb-10  shadow-lg shadow-indigo-800 w-3/5 md:w-1/2 m-auto bg-white">
      <div className="flex flex-col items-center">
        <div className="text-center my-10">
          <h1 className="text-3xl font-bold mb-10">Lista de Respuestas</h1>
        </div>

        <div>
          {list.map((item) => (
            <div className="mb-10 border-b-2 last:border-none border-indigo-600">
              <h1 className="font-semibold">
                Nombre Completo:{" "}
                <span className="text-indigo-700">{item.full_name}</span>
              </h1>
              <p className="font-semibold">
                Correo Electronico:{" "}
                <span className="font-normal">{item.email}</span>
              </p>
              <p className="font-semibold">
                Fecha de Nacimiento:{" "}
                <span className="font-normal">{item.birth_date}</span>
              </p>
              <p className="font-semibold mb-5">
                Pais de Origen:{" "}
                <span className="font-normal">{item.country_of_origin}</span>
              </p>
            </div>
          ))}
        </div>
        <button
          onClick={() => navigate("/")}
          className="bg-indigo-600 hover:bg-indigo-800 text-white text-lg font-bold uppercase my-10 w-1/3 py-2 px-2 rounded-md"
        >
          Volver Al Inicio
        </button>
      </div>
    </div>
  );
};

export default List;
