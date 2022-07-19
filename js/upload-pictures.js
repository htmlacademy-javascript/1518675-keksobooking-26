const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

// Превью аватара
const avatarChooser = document.querySelector('#avatar');
const preview = document.querySelector('.ad-form-header__preview img');

avatarChooser.addEventListener('change', () => {
  const file = avatarChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });

  if (matches) {
    preview.src = URL.createObjectURL(file);
  }
})

// Превью жилья
const objectPhotoChooser = document.querySelector('#images');
const previewContainer = document.querySelector('.ad-form__photo');

objectPhotoChooser.addEventListener('change', () => {
  const file = objectPhotoChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });

  if (matches) {
    const previewSrc = URL.createObjectURL(file);
    previewContainer.innerHTML = `<img src="${previewSrc}" width="70" height="70" alt="Изображение объекта">`
  }
})
