import React, { useState, useEffect } from "react";

const Form = () => {
  const [form, setForm] = useState(null);

  useEffect(() => {
    fetch('./layouts/contact.json')
      .then(response => response.json())
      .then(data => setForm(data))
      .catch(error => console.error("Ruh roh, Raggy:", error));
  }, []);

  let title = ''
  let message = ''
  let inputs = []

  if (form && form.length > 0) {
    title = form[0].title
    message = form[0].message
    inputs = form[0].inputs
  }
  
  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (formErrors[name]) {
      const newErrors = { ...formErrors };
      delete newErrors[name];
      setFormErrors(newErrors);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let errors = {};
    inputs.forEach((input) => {
      if (input.required === "true" && !formData[input.label]) {
        errors[input.label] = `${input.label} is required`;
      }
    });

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      console.log("Form data submitted:", formData);
    }
  };

  return (
    <>
      <div className="container">
        <h2>{title}</h2>
        <div className="row d-flex flex-column align-items-center">
          <div className="col-8">
            <br />
            <br />
            <p>{message}</p>
            <hr/ >
            <form className="d-flex flex-column w-100"
              name="contact"
              method="POST"
              data-netlify="true"
              onSubmit={handleSubmit}
            >
              {inputs.map((input, index) => (
                <p className="w-100" key={index}>
                  <label className="w-100">
                    {input.label}:{" "}
                    {input.type === "small" ? (
                      <div>
                        <input
                          type="text"
                          name={input.label}
                          onChange={handleInputChange}
                          className={
                            formErrors[input.label] ? "is-invalid" : ""
                          }
                        />
                      </div>
                    ) : (
                    <div>
                      <textarea
                        name={input.label}
                        onChange={handleInputChange}
                        className={formErrors[input.label] ? "is-invalid" : ""}
                        style={{ width: '100%', minHeight: '150px' }}
                      />
                      </div>
                    )}
                    {formErrors[input.label] && (
                      <span style={{ color: "red" }}>
                        {formErrors[input.label]}
                      </span>
                    )}
                  </label>
                </p>
              ))}
              <p>
                <button className="sub-Btn" type="submit">Send</button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Form;
