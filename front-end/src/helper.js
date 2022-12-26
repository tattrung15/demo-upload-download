export const saveFile = (data, fileName, dataType) => {
  const binaryData = [];
  binaryData.push(data);

  const downloadLink = document.createElement("a");
  downloadLink.href = window.URL.createObjectURL(
    new Blob(binaryData, {
      type: dataType,
    })
  );
  downloadLink.setAttribute("download", fileName);

  downloadLink.click();
};

export const getFileName = (disposition) => {
  const utf8FilenameRegex = /filename\*=UTF-8''([\w%\-.]+)(?:; ?|$)/i;
  const asciiFilenameRegex = /^filename=(["']?)(.*?[^\\])\1(?:; ?|$)/i;

  let fileName = null;
  if (utf8FilenameRegex.test(disposition)) {
    fileName = decodeURIComponent(utf8FilenameRegex.exec(disposition)[1]);
  } else {
    const filenameStart = disposition.toLowerCase().indexOf("filename=");
    if (filenameStart >= 0) {
      const partialDisposition = disposition.slice(filenameStart);
      const matches = asciiFilenameRegex.exec(partialDisposition);
      if (matches != null && matches[2]) {
        fileName = matches[2];
      }
    }
  }
  return fileName;
};
