import axios from "axios";
import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";

import Form from "./components/Form";
import Success from "./components/Success";
import List from "./components/List";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [data, setData] = useState({});

  const getData = async () => {
    const { data } = await axios("/db.json");
    console.log(data);
    setData(data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div>
        <Link to={"/"}>
          <h1 className="text-3xl font-bold mt-10 ml-10 cursor-pointer">
            Challenge <span className="text-indigo-600">Form</span>
          </h1>
        </Link>
      </div>

      <Routes>
        <Route path="/" element={<Form data={data} />} />
        <Route path="/success" element={<Success />} />
        <Route path="/list" element={<List />} />
      </Routes>

      <ToastContainer />
    </>
  );
}

export default App;
