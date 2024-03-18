// import React from 'react'

// const Success = () => {
//     return (
//         <div className="container">
//           <div className="row justify-content-center">
//             <div className="col-md-6 text-center">
//                 <div className="alert alert-success text-center">
//                     <h4 className="alert-heading">Payment Successfull</h4>
//                 </div>
//                 <a href='/'>Back to Home</a>
//             </div>
//           </div>
//         </div>
//       );
// }

// export default Success
import React from 'react'

const page = () => {
  // useEffect(() => {
  //   // Retrieve form data from local storage
  //   const complaintFormData = JSON.parse(localStorage.getItem("complaintFormData"));
  //   if (complaintFormData) {
  //     // Submit form data to the server
  //     axios.post(`${url}/api/individualcomplaint`, complaintFormData)
  //       .then((res) => {
  //         if (res.data.success) {
  //           // Clear form data from local storage after successful submission
  //           localStorage.removeItem("complaintFormData");
            
  //         }
  //       })
  //       .catch((error) => {
  //         console.error("Error registering complaint", error);
  //       });
  //   }
  // }, []);
  return (
    <div className='flex justify-center items-center text-center'>
    You payment has been done successfully
    </div>
  )
}

export default page