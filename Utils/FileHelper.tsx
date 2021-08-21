function FileHelper() {
   const re = /(?:\.([^.]+))?$/;

   const getFileExtension = (filename: string) => {
      return re.exec(filename)[1]
   }
    
}

export default FileHelper;