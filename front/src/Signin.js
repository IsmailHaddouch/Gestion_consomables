// Import des composants et des fonctions nécessaires
import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';

export default function Signin() {
    const [matricul, setMatricul] = useState('');
    const [password, setPassword] = useState('');
    const[fonction,setFonction]=useState('');
    const [error, setError] = useState('');

    
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault(); // Empêche le rechargement de la page lors de la soumission du formulaire
        const data = {
            'matricul': matricul,
            'motDePass': password
        };
    
        // Envoi des données au serveur
        axios.post("http://localhost:8000/api/personnel-login", data)

            .then((res) => {
                console.log(res.data);
                setFonction(res.data.function);
       localStorage.setItem("userdata",JSON.stringify(res.data.function))
       localStorage.setItem("userMatricul",JSON.stringify(res.data.matricul))
       console.log(res.data.matricul)
            localStorage.setItem("isloged",true)
                if (res.data.function === 'directeur' || res.data.function === 'directeur complexe') {
                    navigate('/Graphiques');
                } else if (res.data.function === 'magasinier') {
                    navigate('/Graphiques');
                } else if (res.data.function === 'formateur')  {
                    navigate('/product');
                }
            })
            .catch((err) => {
                console.log(err.response.data);
                setError(err.response.data.message);

            });
    };
    

    return (

        <div className='container' style={{ display: 'flex' }}>
            <Grid item xs={12} sm={6}>
                <div className='leftSide' style={{ width: '45vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: "center", backgroundColor: '#d3d3d3' }}>
                    <img src='/img/logo_proj2.png' width={400} height={400} alt='Logo' />
                </div>
            </Grid>
            <div className='rightSide' style={{ width: '55vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: "center" }}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                 {   console.log(fonction)}

                    <Box 
                        sx={{
                            marginTop: 0,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <h1>Log in</h1>
                        {error && <Alert severity="error">{error}</Alert>}

                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="matricul"
                                label="Matricul"
                                name="matricul"
                                autoComplete="matricul"
                                autoFocus
                                value={matricul}
                                onChange={(e) => setMatricul(e.target.value)}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            <Button style={{ backgroundColor: 'black' }}
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </div>
        </div>
    );
}
