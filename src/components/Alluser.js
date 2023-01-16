import axios from "axios";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Form, Formik, useField } from "formik";
import test1 from "../images/test1.jpg";

const Alluser = () => {
  const [data, setData] = useState();

  const getAllUser = () => {
    axios({
      method: "get",
      url: "https://api-bootcamp.do.dibimbing.id/api/v1/all-user",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        apiKey: `${"w05KkI9AWhKxzvPFtXotUva-"}`,
      },
    })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getAllUser();
  }, []);

  const onSubmit = (values) => {
    axios({
      method: "post",
      url: `https://api-bootcamp.do.dibimbing.id/api/v1/update-user-role/${values.id}`,
      data: {
        role: values.role,
      },
      headers: {
        apiKey: `${"w05KkI9AWhKxzvPFtXotUva-"}`,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        console.log(response);
        getAllUser();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const MySelect = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
      <div className="mb-3">
        <label htmlFor={props.id || props.name}>{label}</label>
        <select className="form-select" {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </div>
    );
  };
  return (
    <section>
      <div className="container-md">
        <div className="text-center">
        <h1 className="text-dark text-center mt-4 fw-bolder">
            <span className="color1">All</span>
            <span className="color2 m-1">User</span>
          </h1>
        </div>
        <div className="row row-cols-1 row-cols-md-4 g-4 mt-1 mb-4">
          {data &&
            data.data.map((r) => {
              return (
                <div  className="col" key={r.id}>
                  <div className="card h-100 card-user shadow bg1">
                    <img
                      src={test1}
                      alt="ThumbnailProfile"
                      className="user-card-image1"
                    />
                    <img
                      src={r.profilePictureUrl}
                      className="user-card-image2 food-card-image mx-auto"
                      alt={r.name}
                    />
                    <div className="card-body card-body-style">
                      <h5 className="card-title text-center">{r.name}</h5>
                      <p className="card-text">
                        <i className="fa-solid fa-user-circle m-1"></i>
                        {r.role}
                      </p>
                      <p className="card-text">
                        <i className="fa-solid fa-envelope m-1"></i>
                        {r.email}
                      </p>
                      <p className="card-text">
                        <i className="fa-solid fa-phone-square m-1"></i>
                        {r.phoneNumber}
                      </p>
                    </div>
                    <div className="bg3 card-footer text-center">
                      <button
                        type="button"
                        className="btn bg4 text-light btn-dark shadow"
                        data-bs-toggle="modal"
                        data-bs-target={`#staticBackdrop_${r.id}`}
                      >
                        Update
                      </button>
                    </div>
                  </div>
                  <div
                    className="modal fade"
                    id={`staticBackdrop_${r.id}`}
                    tabIndex="-1"
                    aria-labelledby="modal-title"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog modal-md">
                      <div className="modal-content">
                        <div className="bg1 modal-body">
                          <Formik
                            initialValues={{
                              role: r.role,
                              id: r.id,
                            }}
                            enableReinitialize={true}
                            validationSchema={Yup.object({
                              role: Yup.string().oneOf(
                                ["admin", "general"],
                                "Invalid Job Type"
                              ),
                            })}
                            onSubmit={onSubmit}
                          >
                            <div className="container-md my-3">
                              <div className="text-center">
                                <h2>Profile</h2>
                              </div>
                              <div className="row justify-content-center my-3">
                                <div className="col-md-12">
                                  <img
                                    src={r.profilePictureUrl}
                                    className="img-fluid user-card-image mx-auto d-block"
                                    alt={r.name}
                                  />
                                  <h5 className="card-title text-center mt-2">
                                    {r.name}
                                  </h5>
                                  <Form>
                                    <MySelect label="Role" name="role">
                                      {/* <option value="">Select a Role</option> */}
                                      <option value="admin">Admin</option>
                                      <option value="general">General</option>
                                    </MySelect>

                                    <div className="text-center">
                                      <button
                                        type="submit"
                                        className="btn bg4 text-light btn-dark shadow"
                                      >
                                        Save
                                      </button>
                                    </div>
                                  </Form>
                                </div>
                              </div>
                            </div>
                          </Formik>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default Alluser;
