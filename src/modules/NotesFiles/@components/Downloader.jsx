import React from 'react';
import { http } from '@exzeo/core-ui';

export const downloadFile = (fileUrl, fileName, errorHandler) => {
  const proxyUrl = `${process.env.REACT_APP_API_URL}/download`;
  const params = { url: fileUrl };

  return http
    .get(proxyUrl, { responseType: 'blob', params })
    .then(response => {
      const blobUrl = window.URL.createObjectURL(response.data);
      const link = window.document.createElement('a');
      link.href = blobUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return true;
    })
    .catch(err => {
      return errorHandler({ message: err.response.statusText });
    });
};

const Downloader = ({
  fileName,
  fileUrl,
  errorHandler,
  showFileName = false
}) => {
  return (
    <div
      className="attachment-wrapper"
      onClick={() => downloadFile(fileUrl, fileName, errorHandler)}
    >
      <i title={fileName} className="fa fa-file" />
      {showFileName && <div className="btn btn-link btn-sm">{fileName}</div>}
    </div>
  );
};

export default Downloader;
