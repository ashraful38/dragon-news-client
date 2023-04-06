import { Toaster } from 'react-hot-toast';
import './App.css';
import {router}  from "./routes/Routes/Router";
import { RouterProvider } from 'react-router-dom';



function App() {
  
 
  return (
    <div className="">
      <RouterProvider router={router}></RouterProvider>
      <Toaster></Toaster>
      
    </div>
  );
}

export default App;
