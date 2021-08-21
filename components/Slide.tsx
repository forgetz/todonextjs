function Slide({ data }) {
   return (
      <span>
         {
            data?.docs.map((doc, i) => <div>{i+1}. {doc.data().image_url} </div>) 
         }
      </span>
   );
}

export default Slide;