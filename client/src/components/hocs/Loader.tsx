// import { Box } from '@mui/material';
// import React from 'react';
// import { Rings } from 'react-loader-spinner';

// type LoaderProps = {
//   children: React.ReactElement;
//   isLoading: boolean;
// };

// export default function Loader({ children, isLoading }: LoaderProps): JSX.Element {
//   if (isLoading)
//     return (
//       <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//         <Rings
//           visible
//           height="80"
//           width="80"
//           color="#4fa94d"
//           ariaLabel="rings-loading"
//           wrapperStyle={{}}
//           wrapperClass=""
//         />
//       </Box>
//     );
//   return children;
// }
import React from 'react'

export default function Loader() {
  return (
    <div>Loader</div>
  )
}
