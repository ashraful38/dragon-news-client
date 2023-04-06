import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import Main from "../../layout/Main";
import Category from "../../pages/Category/Category/Category";
import Home from "../../pages/Home/Home/Home";
import News from "../../pages/News/News/News";
import Login from "../../pages/Login/Login/Login";
import Registration from "../../pages/Login/Registration/Registration";
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import TermsAndCondition from '../../pages/Other/TermsAndCondition/TermsAndCondition';
import Profile from '../../pages/Other/Profile/Profile';

export const router = createBrowserRouter([
    
    {
        path:'/',
        element:<Main></Main>,
        children:[
            {
                path:'/',
                element:<Home></Home>,
                loader:()=>fetch('http://localhost:5000/news')
            },
            {
                path:'/category/:id',
                element:<Category></Category>,
                loader:({params})=> fetch(`http://localhost:5000/category/${params.id}`)
            },
            {
                path:'/news/:id',
                element:<PrivateRoute><News></News></PrivateRoute>,
                loader: ({params})=>fetch(`http://localhost:5000/news/${params.id}`)
                
            },
            {
                path:'/login',
                element:<Login></Login>
            },
            {
                path:'/registration',
                element:<Registration></Registration>
            },
            {
                path:'/terms',
                element:<TermsAndCondition></TermsAndCondition>
            },
            {
                path:'/profile',
                element:<PrivateRoute><Profile></Profile></PrivateRoute>
            }

        ]
  
    }
    
]);



