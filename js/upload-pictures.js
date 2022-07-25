const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const PHOTO_PREVIEW_WIDTH = '70px';
const PHOTO_PREVIEW_HEIGHT = '70px';

// Превью аватара
const avatarChooser = document.querySelector('#avatar');
const preview = document.querySelector('.ad-form-header__preview img');

const avatarChooserHandler = () => {
  const file = avatarChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    preview.src = URL.createObjectURL(file);
  }
};

avatarChooser.addEventListener('change', avatarChooserHandler);

// Превью жилья
const objectPhotoChooser = document.querySelector('#images');
const previewContainer = document.querySelector('.ad-form__photo');

const objectPhotoChooserHandler = () => {
  const file = objectPhotoChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const previewSrc = URL.createObjectURL(file);

    const imagePreview = document.createElement('img');

    imagePreview.style.width = PHOTO_PREVIEW_WIDTH;
    imagePreview.style.height = PHOTO_PREVIEW_HEIGHT;
    imagePreview.alt = 'Изображение объекта';
    imagePreview.src = `${previewSrc}`;

    previewContainer.append(imagePreview);
  }
};

objectPhotoChooser.addEventListener('change', objectPhotoChooserHandler);
