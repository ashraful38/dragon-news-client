import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const Login = () => {
    const navigate = useNavigate();
    const [error , setError] = useState('')

    const { signIn ,  setLoading} = useContext(AuthContext);

    // private route 
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const handlesubmit = (event)=>{
        event.preventDefault();
        const form = event.target;

        const email = form.email.value;
        const password = form.password.value;
        console.log( email , password);

        signIn(email, password)
        .then(result=>{
            const user = result.user;
            console.log(user);
            form.reset();
            // navigate('/');
            setError('');
           // navigate( from , {replace: true})
            if(user.emailVerified){
                navigate( from , {replace: true})
            }
            else{
                toast.error('Your email is not varify : Please varify your email')
            }
        })
        .catch(e => {
            console.error(e);
            setError(e.message);
        })
        .finally(()=>{
            setLoading(false);
        })


    }
    return (
        <Form onSubmit={handlesubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control name='email' type="email" placeholder="Enter email"  required/>
                
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control name='password' type="password" placeholder="Password" required />
            </Form.Group>


           
            
            <Button variant="primary" type="submit">
                Login
            </Button>
        
            <Form.Text className="text-danger">
                {
                    error
                }
            </Form.Text> 
        </Form>
    );
};

export default Login;