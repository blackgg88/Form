import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast, Flip } from "react-toastify";

import firebaseApp from "../firebase";
import { getFirestore, collection, addDoc } from "firebase/firestore/lite";

import { useNavigate } from "react-router-dom";

const FormComponent = ({ data }) => {
  const db = getFirestore(firebaseApp);
  const navigate = useNavigate();

  return (
    <>
      <div className="mt-5 mb-10  shadow-lg shadow-indigo-800 w-3/5 md:w-1/2 m-auto bg-white">
        <Formik
          onSubmit={async (values, { resetForm }) => {
            try {
              const res = await addDoc(collection(db, "respuestas"), {
                ...values,
              });

              toast.success("Registro Exitoso!", {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Flip,
              });

              setTimeout(() => {
                navigate("/success");
                resetForm();
              }, 2000);
            } catch (error) {
              console.log(error);

              toast.error("Ocurrio un Error!", {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Flip,
              });
            }
          }}
          validate={(values) => {
            let errors = {};
            if (!values.full_name)
              errors.full_name = "El campo Nombre Completo es obligatorio";

            if (
              !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
                values.email
              )
            )
              errors.email = "El Correo Electronico debe ser valido";

            if (!values.birth_date)
              errors.birth_date = "El campo Fecha de Nacimiento es obligatorio";

            if (!values.country_of_origin)
              errors.country_of_origin =
                "El campo Pais de Origen es obligatorio";

            if (!values.terms_and_conditions)
              errors.terms_and_conditions =
                "Debes aceptar los Terminos y Condiciones";

            return errors;
          }}
          initialValues={{
            full_name: "",
            email: "",
            birth_date: "",
            country_of_origin: "",
            terms_and_conditions: false,
          }}
        >
          {({ values, errors }) => (
            <Form className="Formulario">
              {data?.items?.map((item) =>
                item.type !== "select" ? (
                  item.type === "submit" ? (
                    <div key={item.name} className="flex flex-col items-center">
                      <button
                        type={item.type}
                        required={item.required}
                        className="bg-indigo-600 hover:bg-indigo-800 text-white text-lg font-bold uppercase my-10 w-1/2 py-2 px-4 rounded-md"
                      >
                        {item.label}
                      </button>
                    </div>
                  ) : (
                    <div key={item.name} className="flex flex-col items-center">
                      <ErrorMessage
                        name={item.name}
                        component={() => (
                          <div className="py-1 px-2 bg-red-600 text-white text-xs rounded-md font-bold mt-2 absolute">
                            {errors[item.name]}
                          </div>
                        )}
                      />
                      <label htmlFor={item.name} className="mt-10">
                        {item.label}
                      </label>
                      <Field
                        id={item.name}
                        type={item.type}
                        name={item.name}
                        required={item.required}
                        value={values[item.name]}
                        checked={
                          item.type === "checkbox"
                            ? values.terms_and_conditions
                            : false
                        }
                        className="bg-slate-100 w-1/2 py-2 px-4"
                      />
                    </div>
                  )
                ) : (
                  <div key={item.name} className="flex flex-col items-center">
                    <ErrorMessage
                      name={item.name}
                      component={() => (
                        <div className="py-1 px-2 bg-red-600 text-white text-xs rounded-md font-bold mt-2 absolute">
                          {errors[item.name]}
                        </div>
                      )}
                    />
                    <label className="mt-10">{item.label}</label>
                    <Field
                      as="select"
                      name={item.name}
                      required={item.required}
                      className="mt-2 px-3"
                    >
                      <option value="">Seleciona tu Pais</option>
                      {item.options.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Field>
                  </div>
                )
              )}
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default FormComponent;
