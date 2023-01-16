import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Formik, Form, useField, Field, FieldArray } from "formik";
import * as Yup from "yup";
import AddFood from "./AddFood";

const FoodEdit = () => {
  const [data, setData] = useState();

  const getAllFood = () => {
    axios({
      method: "get",
      url: "https://api-bootcamp.do.dibimbing.id/api/v1/foods",
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
    getAllFood();
  }, []);

  const onSubmit = (values) => {
    axios({
      method: "post",
      url: `https://api-bootcamp.do.dibimbing.id/api/v1/update-food/${values.id}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        apiKey: `${"w05KkI9AWhKxzvPFtXotUva-"}`,
      },
      data: {
        name: values.name,
        description: values.description,
        imageUrl: values.imageUrl,
        ingredients: values.ingredients,
      },
    })
      .then((response) => {
        console.log(response);
        getAllFood();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = (id) => {
    axios({
      method: "delete",
      url: `https://api-bootcamp.do.dibimbing.id/api/v1/delete-food/${id}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        apiKey: `${"w05KkI9AWhKxzvPFtXotUva-"}`,
      },
    })
      .then((response) => {
        console.log(response);
        getAllFood();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const MyTextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
      <div className="mb-3">
        <label htmlFor={props.id || props.name}>{label}</label>
        <input className="text-input form-control" {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </div>
    );
  };

  return (
    <section>
      <div className="container-md">
      <h1 className="text-dark text-center mt-4 fw-bolder">
            <span className="color1">Food</span>
            <span className="color2 m-1">Edit</span>
          </h1>
        <div className="text-center mt-4">
          <button
            type="button"
            className="btn bg4 text-light btn-dark shadow"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            + Add Food
          </button>
        </div>
        <div className="row row-cols-1 row-cols-md-4 g-4 mt-1 mb-4">
          {data &&
            data.data.map((r) => {
              return (
                <div className="card-group " key={r.id}>
                  <div
                    className="bg1 card h-100 food-card shadow"
                    style={{
                      borderTopRightRadius: `5px`,
                      borderBottomRightRadius: `5px`,
                    }}
                  >
                    <img
                      src={r.imageUrl}
                      className="card-img-top mx-auto mt-3 food-card-image"
                      style={{ borderTopRightRadius: `50%` }}
                      alt={r.name}
                    />
                    <div className="card-body">
                      <h5 className="card-title text-center">{r.name}</h5>
                      <p className="card-text">{r.description}</p>
                      <i >
                        {r.ingredients.map((m, index) => {
                          return (
                            <span key={index}>{(index ? ", " : "") + m}</span>
                          );
                        })}
                      </i>
                    </div>
                    <div className="bg3 card-footer text-center">
                      <div className="btn-group" role="group">
                        <button
                          type="button"
                          className="btn bg4 text-light btn-dark shadow"
                          data-bs-toggle="modal"
                          data-bs-target={`#staticBackdrop_${r.id}`}
                        >
                          Update
                        </button>
                        <button
                          type="button"
                          className="btn bg2 text-light btn-dark shadow"
                          onClick={() => handleDelete(r.id)}
                        >
                          Delete
                        </button>
                      </div>
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
                              name: r.name,
                              description: r.description,
                              imageUrl: r.imageUrl,
                              ingredients: r.ingredients,
                              id: r.id,
                            }}
                            validationSchema={Yup.object({
                              name: Yup.string().required("Required"),
                              description: Yup.string().required("Required"),
                              imageUrl: Yup.string().required("Required"),
                            })}
                            onSubmit={onSubmit}
                          >
                            <div className="container-md my-3">
                              <div className="text-center">
                                <h2>Update Food</h2>
                                <img
                                  src={r.imageUrl}
                                  alt={r.name}
                                  className="food-card-image"
                                />
                              </div>
                              <div className="row justify-content-center">
                                <div className="col-md-12">
                                  <Form>
                                    <MyTextInput
                                      label="Food Name"
                                      name="name"
                                      type="text"
                                      placeholder="Food name"
                                    />

                                    <MyTextInput
                                      label="Food Description"
                                      name="description"
                                      type="text"
                                      placeholder="Food Description"
                                    />

                                    <MyTextInput
                                      label="Food Image URL"
                                      name="imageUrl"
                                      type="url"
                                      placeholder="Food Image URL"
                                    />
                                    <div className="mb-3">
                                      <label>Food Ingredients</label>
                                      <FieldArray name="ingredients">
                                        {(fieldArrayProps) => {
                                          const { push, remove, form } =
                                            fieldArrayProps;
                                          const { values } = form;
                                          const { ingredients } = values;
                                          return (
                                            <div>
                                              {ingredients.map(
                                                (ingredient, index) => (
                                                  <div
                                                    key={index}
                                                    className="d-flex input-group mb-1"
                                                  >
                                                    <Field
                                                      name={`ingredients[${index}]`}
                                                      placeholder="Food Ingredients"
                                                      className="form-control"
                                                    />
                                                    {index > 0 && (
                                                      <button
                                                        type="button"
                                                        className="btn bg2 text-light btn-outline-dark shadow "
                                                        onClick={() =>
                                                          remove(index)
                                                        }
                                                      >
                                                        -
                                                      </button>
                                                    )}
                                                    <button
                                                      type="button"
                                                      className="btn bg4 text-light btn-outline-dark shadow "
                                                      onClick={() => push("")}
                                                    >
                                                      +
                                                    </button>
                                                  </div>
                                                )
                                              )}
                                            </div>
                                          );
                                        }}
                                      </FieldArray>
                                    </div>

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
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="modal-title"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-md">
          <div className="modal-content">
            <div className="bg1 modal-body">
              <AddFood
                onSuccess={() => {
                  getAllFood();
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FoodEdit;
