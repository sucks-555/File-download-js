function downloadFile(url, fileName, fileExtension) {
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('ネットワークの応答が正常ではありませんでした');
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
      console.error('エラー:', error);
    });
}
function conversion(files) {
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    downloadFile(file.url, `file${i}`, file.extension);
  }
}
function getExtension(url) {
  const pathArray = url.split('/');
  const lastPath = pathArray[pathArray.length - 1];
  const parts = lastPath.split('.');
  if (parts.length > 1) {
    const extension = parts[parts.length - 1];
    return { url: url, extension: extension };
  } else {
    console.error('エラー: URLにファイル拡張子がありません');
    return null;
  }
}
const url = location.href;
const fileData = getExtension(url);

if (fileData) {
  conversion([fileData]);
}
