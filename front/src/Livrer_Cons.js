import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Dashbord from './pages/dashbord/dashbord';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
function Livrer_Cons() {
    const [res, setRes] = useState([]);
  
  
    useEffect(() => {
      axios.get("http://localhost:8000/api/liv_consomable")
        .then((response) => {
          console.log(response.data.Livrer_Cons);
          setRes(response.data.Livrer_Cons);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }, []);
  
    
  
 
 
 
 
    return (
        <Dashbord>
    
        <TableContainer style={{ width: '1000px' }}>
          <Table sx={{ maxdth: 500 }} aria-label="custom pagination table">
            <TableHead>
              <TableRow>
                <TableCell align="center">numLiv</TableCell>
                <TableCell align="center">ref</TableCell>
                <TableCell align="center">quantite_liv</TableCell>
                <TableCell align="center">quantite_consomee</TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {res.map((row) => (
                <TableRow key={row.id}>
                  <TableCell align="center" component="th" scope="row">
                    {row.numLiv}
                  </TableCell>
                  <TableCell align="center">{row.ref}</TableCell>
                  <TableCell align="center">{row.quantite_liv}</TableCell>
                  <TableCell align="center">{row.quantite_consomee}</TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      
      </Dashbord>
  )
}

export default Livrer_Cons
