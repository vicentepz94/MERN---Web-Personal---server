function getFilePath(file) {
  const filePath = file.path;
  // Se utilizan \\ en vez del / del video
  const fileSplit = filePath.split("\\");

  return `${fileSplit[1]}/${fileSplit[2]}`;
}

module.exports = {
  getFilePath,
};
