export default function FileHelper() {
   const re = /(?:\.([^.]+))?$/;

   const getFileExtension = (filename: string) => {
      return re.exec(filename)[1]
   }
};