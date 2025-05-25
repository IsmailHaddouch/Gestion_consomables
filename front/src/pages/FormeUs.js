import React, { useState } from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Grid, Typography, Paper, Box } from '@mui/material';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';
import Dashbord from '../pages/dashbord/dashbord';

function FormUs() {
    const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    matricul: '',
    nom: '',
    prenom: '',
    secteur: '',
    statut: '',
    fonction: '',
    motDePass: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/api/personnel-create', formValues)
      .then((response) => {
        console.log(response.data);
        setFormValues({
          matricul: '',
          nom: '',
          prenom: '',
          secteur: '',
          statut: '',
          fonction: '',
          motDePass: '',
        });
        navigate('/Utilisateures');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Dashbord>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          marginLeft:'180px'
        }}
      >
        <Paper elevation={3} sx={{ padding: '20px', width: '700px' }}>
          <Typography variant="h5" align="center">
            Ajouter Utilisateur
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} sx={{ marginTop: '20px' }}>
              <Grid item xs={6}>
                <TextField fullWidth label="Matricul" name="matricul" value={formValues.matricul} onChange={handleChange}   InputProps={{
                    style: {
                      borderRadius: "15px",
                      backgroundColor: 'rgba(255, 255, 255, 95%)',
                      
                    },
                  }} />
              </Grid>
              <Grid item xs={6}>
                <TextField fullWidth label="Nom" name="nom" value={formValues.nom} onChange={handleChange}   InputProps={{
                    style: {
                      borderRadius: "15px",
                      backgroundColor: 'rgba(255, 255, 255, 95%)',
                      
                    },
                  }} />
              </Grid>
              <Grid item xs={6}>
                <TextField fullWidth label="Prénom" name="prenom" value={formValues.prenom} onChange={handleChange}    InputProps={{
                    style: {
                      borderRadius: "15px",
                      backgroundColor: 'rgba(255, 255, 255, 95%)',
                      
                    },
                  }}/>
              </Grid>
              <Grid item xs={6}>
                <TextField fullWidth label="Secteur" name="secteur" value={formValues.secteur} onChange={handleChange}  InputProps={{
                    style: {
                      borderRadius: "15px",
                      backgroundColor: 'rgba(255, 255, 255, 95%)',
                      
                    },
                  }} />
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="statut-label">Statut</InputLabel>
                  <Select labelId="statut-label" id="statut" name="statut" value={formValues.statut} onChange={handleChange} sx={{borderRadius:'15px'}}>
                    <MenuItem value="vacataire">Vacataire</MenuItem>
                    <MenuItem value="contractuel">Contractuel</MenuItem>
                    <MenuItem value="statutaire">Statutaire</MenuItem>
                    <MenuItem value="coopérant">Coopérant</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="fonction-label">Fonction</InputLabel>
                  <Select labelId="fonction-label" id="fonction" name="fonction" value={formValues.fonction} onChange={handleChange} sx={{borderRadius:'15px'}}>
                    <MenuItem value="directeur">Directeur</MenuItem>
                    <MenuItem value="magasinier">Magasiner</MenuItem>
                    <MenuItem value="formateur">Formateur</MenuItem>
                    <MenuItem value="directeur complexe"> directeur complexe</MenuItem>

                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <TextField fullWidth label="Mot de passe" name="motDePass" type="password" value={formValues.motDePass} onChange={handleChange} style={{ margin: '25px 0' }} 
             InputProps={{
              style: {
                         borderRadius: "15px",
                         backgroundColor: 'rgba(255, 255, 255, 95%)',
                         
                       },
                     }}
            />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button type="submit" variant="contained" sx={{backgroundColor:'#001f3f',marginLeft:'550px'}}>
                Ajouter
              </Button>
            </div>
          </form>
        </Paper>
      </Box>
    </Dashbord>
  );
}

export default FormUs;



