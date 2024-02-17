import React from 'react';
import 'rsuite/Steps/styles/index.css';

import { Steps } from 'rsuite';

const ShowStatus = () => {

  const styles = {
    width: '200px',
    display: 'inline-table',
    verticalAlign: 'top',
    
  }

  return (
    
<div>

<div className="m-4 items-center justify-center flex border-orange-400 shadow-lg rounded-md">

  <h1 className="font-bold text-orange-400 text-3xl font-[popins] m-4 p-2">Your Case Current Status</h1>
  <div><p className="mb-10 font-medium ">Contact for know more</p></div>

  </div>


  <div className="m-4 items-center justify-center flex border-orange-400 shadow-lg pb-5 rounded-sm">

  
    {/* < Steps current={1} vertical style={styles} >
      <Steps.Item title="Finished" />
      <Steps.Item title="In progress" />
      <Steps.Item title="Waiting" />
      <Steps.Item title="Waiting" />
    </Steps> */}

    <Steps current={1} vertical style={styles} className="text-orange-400 m-4 ">
      <Steps.Item title="Submitted" description="Your Registration is submited. Our team will contact you." />
      <Steps.Item title="In Progress" description="Process is on going, we will notify you when it is done." />
      <Steps.Item title="Waiting" description="Your Case is complex, it taking time..." />
      <Steps.Item title="Waiting" description="Description" />
      <Steps.Item title="Done" description="Your case is done." />
    </Steps>
  </div>



  </div>
    
  )
}

export default ShowStatus