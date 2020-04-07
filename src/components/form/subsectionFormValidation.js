export default function validate(values) {
  let errors = {};
  if (!values.title) {
    errors.title = "Title is required";
  }
  if (!values.text) {
    errors.text = "Text is required";
  }
  return errors;
}
