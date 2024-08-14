import React, { useCallback } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';

interface FileDropzoneProps {
  name: string;
  field: any; // Pass the 'field' prop to access the current files
  multiple?: boolean;
  defaultValue?: string; // Default file name from API
}

const FileDropzone: React.FC<FileDropzoneProps> = ({
  name,
  field,
  multiple = true,
  defaultValue,
}) => {
  const { control, setValue } = useFormContext();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const currentFiles = field.value || [];
      let updatedFiles;

      if (multiple) {
        updatedFiles = [...currentFiles, ...acceptedFiles];
      } else {
        updatedFiles = [...acceptedFiles];
      }

      setValue(name, updatedFiles, { shouldValidate: true });
    },
    [setValue, name, field.value, multiple],
  );

  const removeFile = (fileName: string) => {
    setValue(
      name,
      (prevFiles: File[]) => prevFiles.filter((file) => file.name !== fileName),
      { shouldValidate: true },
    );
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: multiple,
  });

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const displayFiles = field.value || [];
        const hasFiles = displayFiles.length > 0;

        return (
          <div>
            <div {...getRootProps()} style={dropzoneStyle}>
              <input
                {...getInputProps()}
                onChange={(e) => {
                  const files = (e.target as HTMLInputElement).files;
                  if (files) {
                    onDrop(Array.from(files));
                  }
                }}
              />
              {isDragActive ? (
                <p>Drop the files here...</p>
              ) : (
                <p>Drag n drop some files here, or click to select files</p>
              )}
            </div>
            {!hasFiles && defaultValue && (
              <div style={filesContainerStyle}>
                <div style={fileItemStyle}>
                  <span style={removeIconStyle}>&#10006;</span>{' '}
                  {/* Remove Icon */}
                  <span style={fileNameStyle}>{defaultValue}</span>
                </div>
              </div>
            )}
            {hasFiles && (
              <div style={filesContainerStyle}>
                {displayFiles.map((file: File) => (
                  <div key={file.name} style={fileItemStyle}>
                    <span
                      style={removeIconStyle}
                      onClick={() => removeFile(file.name)}
                    >
                      &#10006;
                    </span>{' '}
                    {/* Remove Icon */}
                    <span style={fileNameStyle}>{file.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      }}
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
  marginTop: '10px',
};

const fileItemStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  padding: '5px',
  borderBottom: '1px solid #ddd',
};

const removeIconStyle: React.CSSProperties = {
  cursor: 'pointer',
  marginRight: '10px',
};

const fileNameStyle: React.CSSProperties = {
  flexGrow: 1,
};

export default FileDropzone;
