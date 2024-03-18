
import React from 'react'


const Failure = () => {
   
    return (
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 text-center">
                <div className="alert alert-danger text-center">
                    <h4 className="alert-heading">Oops, something went wrong! You payment has been cancelled</h4>
                </div>
                <a href='/'>Back to Home</a>
            </div>
          </div>
        </div>
      );
}

export default Failure
// import React from 'react'

// const page = () => {
//   return (
//     <div className='flex justify-center items-center text-center'>
//     You payment has been cancelled
//     </div>
//   )
// }

// export default page