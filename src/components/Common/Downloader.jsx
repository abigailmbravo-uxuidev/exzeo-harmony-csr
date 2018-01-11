import React from 'react';
import axios from 'axios';

export const downloadFile = (fileUrl) => {
  const proxyUrl = `${process.env.REACT_APP_API_URL}/download`;
  const params = { url: fileUrl };

  return axios.get(proxyUrl, { responseType: 'blob', params })
    .then((response) => {
      const blobUrl = window.URL.createObjectURL(response.data);
      window.open(blobUrl);
    })
    .catch((err) => {
      console.log(err);
    });
};

const Downloader = props => {
  const { fileName, fileUrl } = props;
  return (
    <div onClick={ () => downloadFile(fileUrl) }>{ fileName }</div>
  )
}

export default Downloader;
