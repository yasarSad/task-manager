import { Auth } from 'aws-amplify';
import {useState} from 'react';
import {TextField, Button, Box, Typography} from '@mui/material';
import {useHistory} from 'react-router-dom';


const Login = () => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const history = useHistory();


    const handleSubmit = async () => {

        try{
            await Auth.signIn(email, password);
            alert('Login was Successful!!');
            history.push('/create-task');
        

        }catch(error){
            console.error('Error while logging in', error);
            alert('Login Failed');
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
            backgroundColor:'#C8C8C8',
            color:'#C0C0C0',
            marginTop: '10px',
            boxShadow: 3,
        }}
        >
        <Typography variant="h2" sx={{color:'#FF5733', mb:2, fontSize:'1.5rem'}}>
            Log In
        </Typography>
        <TextField
        label="Email"
        variant="outlined"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        sx={{
            backgroundColor:"#F5F5F5",
            color:'#484848',
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
        onChange={(e)=> setPassword(e.target.value)}
        sx={{
            backgroundColor:"#F5F5F5",
            color:'#484848',
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
            color:'#FFFFFF',
        }}
        >
        Log In
        </Button>
        


    

    </Box>
);


};

export default Login;