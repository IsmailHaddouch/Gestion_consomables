import React, { useEffect, useState } from 'react';
import { TextField, Button, Grid, Typography, Paper, Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Dashbord from './pages/dashbord/dashbord';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

function CreateForma() {
  const navigate = useNavigate();

  const[matricul, setMatricul]= useState('')

  
useEffect(()=>{
  const matrc = JSON.parse(localStorage.getItem("userMatricul"));
  console.log(matrc)
  setMatricul(matrc)
},[])

const [formValues, setFormValues] = useState({
  matricul:'',
  date_cmd: '',
  validee: '',
  anneeFormation: '',
  observation: ''
});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
   formValues.matricul = matricul
   formValues.validee = 0

    console.log(matricul)
    axios.post('http://localhost:8000/api/commande-create', formValues)
      .then(response => {
        console.log(response.data);
        setFormValues({
          matricul:matricul ,
          validee:0,
          date_cmd: '',
          anneeFormation: '',
          observation: ''
        });
        navigate('/Commandes');
      })
      .catch(error => {
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
          marginLeft: '200px',
          width: '700px'
        }}
      >
        <Paper elevation={3} sx={{ padding: '20px' }}>
          <form onSubmit={handleSubmit}>
            <Typography variant="h5" align="center">Ajouter Commande </Typography>
            <Grid container spacing={2} sx={{ marginTop: '20px' }}>
              
              <Grid item xs={6} sx={{ marginTop: '20px' }}>
                <TextField
                  type='Date'
                  fullWidth
                  name="date_cmd"
                  value={formValues.date_cmd}
                  onChange={handleChange}
                  InputProps={{
                    style: {
                      borderRadius: "30px",
                      backgroundColor: 'rgba(255, 255, 255, 95%)'
                    },
                  }}
                />
              </Grid>
             
              <Grid item xs={6} sx={{ marginTop: '20px' }}>
                <TextField
                  fullWidth
                  label="annéeFormation"
                  name="anneeFormation"
                  value={formValues.anneeFormation}
                  onChange={handleChange}
                  InputProps={{
                    style: {
                      borderRadius: "30px",
                      backgroundColor: 'rgba(255, 255, 255, 95%)'
                    },
                  }}
                />
              </Grid>
              <Grid item xs={6} sx={{ marginTop: '20px' }}>
                <TextField
                  fullWidth
                  label="observation"
                  name="observation"
                  value={formValues.observation}
                  onChange={handleChange}
                  InputProps={{
                    style: {
                      borderRadius: "30px",
                      backgroundColor: 'rgba(255, 255, 255, 95%)',
                      width:'652px'
                      
                    },
                  }}
                />
              </Grid>
            </Grid>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
              <Button type="submit" variant="contained" sx={{ backgroundColor: '#001f3f' }}>Ajouter</Button>
            </div>
          </form>
        </Paper>
      </Box>
    </Dashbord>
  );
}

export default CreateForma;

