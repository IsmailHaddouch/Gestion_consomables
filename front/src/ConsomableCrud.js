import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  IconButton,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Link as MuiLink,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import {
  FirstPage as FirstPageIcon,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  LastPage as LastPageIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Dashbord from './pages/dashbord/dashbord';

export default function ConsomableCrud() {
  const [res, setRes] = React.useState([]);
  const [open, setOpen] = React.useState(false); // Dialog édition
  const [openCon, setOpenCon] = React.useState(false); // Dialog confirmation suppression
  const [selectedRef, setSelectedRef] = React.useState(null);

  const [formUp, setFormUp] = React.useState({
    réf: '',
    désignation: '',
    quantité_stock: '',
    untité: '',
    photo: '',
  });

  // Pagination
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Récupération des consommables
  React.useEffect(() => {
    axios.get("http://localhost:8000/api/consomable")
      .then((response) => {
        setRes(response.data.consomables);
      })
      .catch(error => {
        console.error('Erreur chargement consommables', error);
      });
  }, []);

  // Ouverture dialog édition
  const handleClickOpen = (réf) => {
    setSelectedRef(réf);
    const userData = res.find(user => user.réf === réf);
    if (userData) {
      setFormUp({
        réf: userData.réf,
        désignation: userData.désignation,
        quantité_stock: userData.quantité_stock,
        untité: userData.untité,
        photo: userData.photo,
      });
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Pagination handlers
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Modification formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormUp({ ...formUp, [name]: value });
  };

  // Soumission modification
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://127.0.0.1:8000/api/consomable-edit/${formUp.réf}`, formUp)
      .then(() => {
        // Mise à jour locale du tableau
        const updatedRes = res.map(item =>
          item.réf === formUp.réf ? { ...formUp } : item
        );
        setRes(updatedRes);
        setOpen(false);
      })
      .catch(error => {
        console.error('Erreur lors de la mise à jour', error);
      });
  };

  // Suppression
  const handleClickOpenCon = (réf) => {
    setSelectedRef(réf);
    setOpenCon(true);
  };
  const handleCloseCon = () => {
    setOpenCon(false);
  };
  const DeleteSubmit = () => {
    axios.delete(`http://127.0.0.1:8000/api/consomable-delete/${selectedRef}`)
      .then(() => {
        const updatedRes = res.filter(item => item.réf !== selectedRef);
        setRes(updatedRes);
        setOpenCon(false);
      })
      .catch(error => {
        console.error('Erreur suppression', error);
      });
  };

  // Calcul des lignes vides pour éviter saut de layout
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - res.length) : 0;

  return (
    <Dashbord>
      <TableContainer style={{ width: '1070px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Link to="/AjouterConsomable" style={{ textDecoration: 'none' }}>
            <Button variant="contained" color="success" startIcon={<AddIcon />}>
              Ajouter Consomable
            </Button>
          </Link>
        </Box>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: '#001F3F', fontWeight: 'bold' }}>réf</TableCell>
              <TableCell sx={{ color: '#001F3F', fontWeight: 'bold' }} align="right">désignation</TableCell>
              <TableCell sx={{ color: '#001F3F', fontWeight: 'bold' }} align="right">quantité_stock</TableCell>
              <TableCell sx={{ color: '#001F3F', fontWeight: 'bold' }} align="right">untité</TableCell>
              <TableCell sx={{ color: '#001F3F', fontWeight: 'bold' }} align="right">photo</TableCell>
              <TableCell sx={{ color: '#001F3F', fontWeight: 'bold' }} align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? res.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : res
            ).map((row) => (
              <TableRow key={row.ref}>
                <TableCell component="th" scope="row">{row.réf}</TableCell>
                <TableCell align="right">{row.désignation}</TableCell>
                <TableCell align="right">{row.quantité_stock}</TableCell>
                <TableCell align="right">{row.untité}</TableCell>
                <TableCell align="right">
                  <img src={`http://localhost:8000/storage/img/${row.photo}`}   alt={row.désignation} style={{ width: 50, height: 50, objectFit: 'cover' }} />
                </TableCell>
                <TableCell align="right">
                  <IconButton color="primary" onClick={() => handleClickOpen(row.réf)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleClickOpenCon(row.réf)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                colSpan={6}
                count={res.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    'aria-label': 'rows per page',
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>

      {/* Dialog Edition */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Modifier Consomable</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              margin="dense"
              label="Réf"
              type="text"
              fullWidth
              variant="outlined"
              name="réf"
              value={formUp.réf}
              disabled
            />
            <TextField
              margin="dense"
              label="Désignation"
              type="text"
              fullWidth
              variant="outlined"
              name="désignation"
              value={formUp.désignation}
              onChange={handleChange}
              required
            />
            <TextField
              margin="dense"
              label="Quantité stock"
              type="number"
              fullWidth
              variant="outlined"
              name="quantité_stock"
              value={formUp.quantité_stock}
              onChange={handleChange}
              required
            />
            <TextField
              margin="dense"
              label="Unité"
              type="text"
              fullWidth
              variant="outlined"
              name="untité"
              value={formUp.untité}
              onChange={handleChange}
              required
            />
            <TextField
              margin="dense"
              label="Photo (URL)"
              type="text"
              fullWidth
              variant="outlined"
              name="photo"
              value={formUp.photo}
              onChange={handleChange}
            />
            <DialogActions sx={{ mt: 2 }}>
              <Button onClick={handleClose}>Annuler</Button>
              <Button type="submit" variant="contained" color="primary">Enregistrer</Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>

      {/* Dialog Confirmation Suppression */}
      <Dialog open={openCon} onClose={handleCloseCon}>
        <DialogTitle>Confirmer la suppression</DialogTitle>
        <DialogContent>
          Voulez-vous vraiment supprimer le consommable avec la réf : {selectedRef} ?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCon}>Annuler</Button>
          <Button onClick={DeleteSubmit} variant="contained" color="error">Supprimer</Button>
        </DialogActions>
      </Dialog>
    </Dashbord>
  );
}
