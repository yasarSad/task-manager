import { Auth } from 'aws-amplify';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, TextField, Button, Typography } from '@mui/material';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const handleSubmit = async () => {
        try {
            await Auth.signUp({ username: email, password });
            alert('Successfully signed up');
            history.push('/login');
        } catch (error) {
            console.error('Error while signing up', error);
        }
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="100vh"
            gap={2}
            sx={{
                backgroundColor: '#C8C8C8',
                color: '#C0C0C0',
                marginTop: '10px',
            }}
        >

        <Typography variant="h2" sx={{color:'#FF5733', mb:2, fontSize:'1.5rem'}}>
            Sign Up
        </Typography>
            <TextField
                label="Email"
                variant="outlined"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{
                    backgroundColor: "#F5F5F5",
                    color: '#484848',
                    borderRadius: '16px',
                    width: '300px',
                }}
                InputProps={{
                    sx:{
        
                        borderRadius:"16px"
                    }
                }}
                
            />
            <TextField
                label="Password"
                variant="outlined"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                sx={{
                    backgroundColor: "#F5F5F5",
                    color: '#484848',
                    borderRadius: '16px',
                    width: '300px',
                }}
                InputProps={{
                    sx:{
        
                        borderRadius:"16px"
                    }
                }}
            />
            <Button
                variant="contained"
                color="primary"
                type="submit"
                onClick={handleSubmit}
                sx={{
                    borderRadius: '16px',
                    backgroundColor: '#ff6347',
                    color: '#FFFFFF',
                }}
            >
                Sign Up
            </Button>
        </Box>
    );
};

export default Signup;