import React, { useState } from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Grid, Typography, Paper, Box } from '@mui/material';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';
import Dashbord from './pages/dashbord/dashbord';

export default function () {
 
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({
        réf:'',
        désignation: '',
        quantité_stock: '',
        untité: '',
        photo: null, // Changed to null
    });
 
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    // Handle file input change
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormValues({ ...formValues, photo: file });
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('réf', formValues.réf);
        formData.append('désignation', formValues.désignation);
        formData.append('quantité_stock', formValues.quantité_stock);
        formData.append('untité', formValues.untité);
        formData.append('photo', formValues.photo); // Append the photo to the form data
        
        axios.post('http://localhost:8000/api/consomable-create', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          .then((response) => {
            console.log(response.data);
            setFormValues({
              réf: '',
              désignation: '',
              quantité_stock: '',
              untité: '',
              photo: null, // Reset the photo field to null after submission
            });
            navigate('/consomables');
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
              Ajouter consommable
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2} sx={{ marginTop: '20px' }}>
                <Grid item xs={6}>
                  <TextField fullWidth label="ref" name="réf" value={formValues.réf} onChange={handleChange} />
                </Grid>
                <Grid item xs={6}>
                  <TextField fullWidth label="designation" name="désignation" value={formValues.désignation} onChange={handleChange} />
                </Grid>
                <Grid item xs={6}>
                  <TextField fullWidth label="quantite_stock" name="quantité_stock" value={formValues.quantité_stock} onChange={handleChange} />
                </Grid>
                <Grid item xs={6}>
                  <TextField fullWidth label="untité" name="untité" value={formValues.untité} onChange={handleChange} />
                </Grid>
                <Grid item xs={12}>
                  {/* Replace TextField with file input */}
                  <input type="file" name="photo" onChange={handleFileChange} />
                </Grid>
              </Grid>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button type="submit" variant="contained" sx={{backgroundColor:'#001f3f',margin:'20px'}}>
                  Ajouter
                </Button>
              </div>
            </form>
          </Paper>
        </Box>
      </Dashbord>

    )
}
