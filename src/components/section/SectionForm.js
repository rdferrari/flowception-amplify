import React from "react";

function SectionForm({
  handleSubmit,
  setShowForm,
  errors,
  values,
  handleChange,
  buttonText,
}) {
  return (
    <div className="section-create-container">
      <form onSubmit={handleSubmit} noValidate>
        {errors.title && <p className="input-error">* {errors.title}</p>}
        <textarea
          rows="2"
          cols="60"
          placeholder="Section title"
          className="input-light section-card-title"
          type="text"
          name="title"
          onChange={handleChange}
          value={values.title || ""}
          required
        />
        {errors.intro && <p className="input-error">* {errors.intro}</p>}
        <textarea
          rows="6"
          cols="60"
          placeholder="Section introduction"
          className="input-light section-card-text"
          type="text"
          name="intro"
          onChange={handleChange}
          value={values.intro || ""}
          required
        />

        {errors.body && <p className="input-error">* {errors.body}</p>}
        <textarea
          rows="6"
          cols="60"
          placeholder="Section body text"
          className="input-light section-card-text"
          type="text"
          name="body"
          onChange={handleChange}
          value={values.body || ""}
        />

        <div className="section-button-flex">
          <button className="primary-button button-dark" type="submit">
            {buttonText}
          </button>
          <button
            className="primary-button button-transparent"
            onClick={() => setShowForm(false)}
          >
            Close form
          </button>
        </div>
      </form>
    </div>
  );
}

export default SectionForm;
