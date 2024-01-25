
import '../../src/styles/globals.css';



import { Provider } from 'react-redux';
import store from './store'; // Adjust the path accordingly



export const metadata = {
  title: 'ICDRC: ',
  description: 'One Stop Solution For Insurance Claim Dispute',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">

      <body>
        {children}
      </body>
    </html>
  )
}
