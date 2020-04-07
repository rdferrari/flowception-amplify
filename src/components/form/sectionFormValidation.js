export default function validate(values) {
  let errors = {};
  if (!values.title) {
    errors.title = "Title is required";
  }
  if (!values.intro) {
    errors.intro = "Intro is required";
  }
  return errors;
}
