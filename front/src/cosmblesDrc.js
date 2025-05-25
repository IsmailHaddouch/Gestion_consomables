import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Dashbord from './pages/dashbord/dashbord';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

function ConsmblesDrc() {
  const [res, setRes] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/cmd_consomable")
      .then((response) => {
        console.log(response.data.commander_consomables);
        setRes(response.data.commander_consomables);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  




  return (
    <Dashbord>
    
      <TableContainer style={{ width: '1000px' }}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <TableCell align="center">numCmd</TableCell>
              <TableCell align="center">réf</TableCell>
              <TableCell align="center">quantité_commandé</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {res.map((row) => (
              <TableRow key={row.id}>
                <TableCell align="center" component="th" scope="row">
                  {row.numCmd}
                </TableCell>
                <TableCell align="center">{row.réf}</TableCell>
                <TableCell align="center">{row.quantité_commande}</TableCell>
               
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    
    </Dashbord>
  );
}

export default ConsmblesDrc;
