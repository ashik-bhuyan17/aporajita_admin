/*
import { useState } from 'react';
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

// Register the plugins
registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType
);

function DragAndDropImageWithPreview() {
  const [files, setFiles] = useState([]);
  return (
    <FilePond
      files={files}
      allowReorder={true}
      allowMultiple={true}
      onupdatefiles={setFiles}
      checkValidity={true}
      acceptedFileTypes={['image/*']}
      labelIdle='Drag & drop your images or <span className="filepond--label-action">Browse</span>'
    />
  );
}

export default DragAndDropImageWithPreview;
*/
