import Resizer from 'react-image-file-resizer';

export const resizeFile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      700,
      1000,
      'JPEG',
      95,
      0,
      (uri) => {
        resolve(uri);
      },
      'base64',
      600,
      800
    );
  });