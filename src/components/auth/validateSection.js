export default function validateSection(values) {
  let errors = {};

  if (!values.title) {
    errors.email = "Title required!";
  } else if (values.title.length < 2) {
    errors.title = "Title must have more than 2 characters";
  }

  if (!values.intro) {
    errors.intro = "Introductory text required!";
  } else if (values.description.length < 10) {
    errors.intro = "Introductory text must have more than 100 characters";
  }

  return errors;
}
