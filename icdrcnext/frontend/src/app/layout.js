

import '../../src/styles/globals.css';
import { Suspense } from 'react';
import PageLoader from '../components/pageloader/page';






export const metadata = {
  title: 'ICDRC: ',
  description: 'One Stop Solution For Insurance Claim Dispute',
}

export default function RootLayout({ children }) {
  return (
   
    
    
    <html lang="en">

      <body>
      <Suspense fallback={<PageLoader />}>
        {children}
        
        </Suspense>

        
        
        



        
        
      </body>
      
    </html>
    
    
  )
}
