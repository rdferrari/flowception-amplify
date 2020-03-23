export const HandleUploadFile = async event => {
  event.preventDefault();
  const file = event.target.files[0];

  const randomExtension = Math.floor(Math.random() * 90000) + 10000;

  const name = randomExtension + file.name;

  setUrl(name);

  Storage.put(name, file);

  createSubsectionMedia(name);

  setUploading(false);
  setShowForm(false);
};
