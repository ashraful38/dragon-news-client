import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const Registration = () => {
    const {createUser , updateUserProfile, varifyEmail}= useContext(AuthContext);
    
    const [error , setError] = useState("")
    const [accepted, setAccepted] = useState(false);

    const navigation = useNavigate()

    

    const handleSubmit = event =>{
        event.preventDefault();
        const form = event.target;
        const name= form.name.value;
        const photoURL = form.photoURL.value;
        const email = form.email.value;
        const password = form.password.value;
        console.log(name, photoURL , email , password);

        createUser(email , password)
        .then(result => {
            const user = result.user;
            console.log(user);
            setError('');
            form.reset();
            //navigation('/login')
            handleUpdateUserProfile(name , photoURL);
            handleEmailVarification();
            toast.success('Please varify your email address before login');
        })
        .catch(e => {
            console.error(e);
            setError(e.message);
        })

    }

    const handleUpdateUserProfile =(name , photoURL)=>{
        const profile = {
            displayName : name,
            photoURL: photoURL
        }

        updateUserProfile(profile)
        .then(()=>{})
        .catch(error => console.error(error));


    }

    const handleEmailVarification= ()=>{
        varifyEmail()
        .then(()=>{})
        .catch(error => console.error(error));

    }

    const handleAccepted = (event)=>{
        setAccepted(event.target.checked);

    }
    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Your Name</Form.Label>
                <Form.Control name="name" type="text" placeholder="Enter Your Name" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicphotoURL">
                <Form.Label>Photo URL</Form.Label>
                <Form.Control name="photoURL" type="text" placeholder="Photo URL" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control name='email' type="email" placeholder="Enter email" required/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control name='password' type="password" placeholder="Password" required />
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check 
                type="checkbox" 
                onClick={handleAccepted}
                label={<>Accept <Link to='/terms'>Terms and conditions</Link></>} />
            </Form.Group>


        
            
            <Button variant="primary" type="submit" disabled={!accepted}>
                Register
            </Button>
        
            <Form.Text className="text-danger">
                {
                    error
                }
            </Form.Text> 

        </Form>
    );
};

export default Registration;