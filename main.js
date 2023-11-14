function downloadFile(url, fileName, fileExtension) {
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.blob();
    })
    .then(blob => {
      const objectURL = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = objectURL;
      link.download = `${fileName}.${fileExtension}`;
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(objectURL);
      document.body.removeChild(link);
    })
    .catch(error => {
      console.error('error:',error);
    });
}
function conversion(files) {
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    downloadFile(file.url, `file${i}`, file.extension);
  }
}

// ファイルダウンロード例
const url = location.href;
conversion([{ url: url, extension: 'jpg' }]);
