import React, { useCallback } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { useDropzone, DropzoneOptions } from 'react-dropzone';

interface FileDropzoneProps {
  name: string;
  accept?: DropzoneOptions['accept'];
  multiple?: boolean;
}

const FileDropzone: React.FC<FileDropzoneProps> = ({
  name,
  multiple = true, // Default to allow multiple files
}) => {
  const { control, setValue } = useFormContext();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setValue(name, acceptedFiles, { shouldValidate: true });
    },
    [setValue, name],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple,
  });

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div {...getRootProps()} style={dropzoneStyle}>
          <input
            {...getInputProps()}
            onChange={() => {}} // Add this to prevent value setting error
          />
          {isDragActive ? (
            <p>Drop the files here...</p>
          ) : (
            <p>Drag 'n' drop some files here, or click to select files</p>
          )}
          {field.value && Array.isArray(field.value) && (
            <div style={filesContainerStyle}>
              {field.value.map((file: File, index: number) => (
                <div key={index} style={fileStyle}>
                  <p>{file.name}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    />
  );
};

const dropzoneStyle: React.CSSProperties = {
  border: '2px dashed #007bff',
  borderRadius: '4px',
  padding: '20px',
  textAlign: 'center',
  cursor: 'pointer',
};

const filesContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  marginTop: '10px',
};

const fileStyle: React.CSSProperties = {
  padding: '5px',
  borderBottom: '1px solid #ddd',
};

export default FileDropzone;
