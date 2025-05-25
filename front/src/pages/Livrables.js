import {
  Paper,
  TableCell,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableFooter,
  TablePagination,
  TableRow,
  IconButton,
  Checkbox,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import {
  FirstPage as FirstPageIcon,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  LastPage as LastPageIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  CheckCircleOutline as CheckCircleOutlineIcon,
  CancelOutlined as CancelOutlinedIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Dashbord from '../pages/dashbord/dashbord';

function Livrables() {
  const [res, setRes] = useState([]);
  const [open, setOpen] = useState(false);
  const [formUp, setFormUp] = useState({
    numLiv: '',
    numCmd: '',
    dateLiv: '',
    liv_validee: 0,
    observation: '',
  });

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const userRole = JSON.parse(localStorage.getItem('userdata'));

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/livraison')
      .then((response) => {
        // Vérifie que la donnée est bien dans response.data.livraison (singulier ou pluriel)
        setRes(response.data.livraison || []);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des livraisons', error);
      });
  }, []);

  const handleClickOpen = (numLiv) => {
    const userData = res.find((user) => user.numLiv === numLiv);
    if (userData) {
      setFormUp({
        numLiv: userData.numLiv,
        numCmd: userData.numCmd,
        dateLiv: userData.dateLiv,
        liv_validee: userData.liv_validee,
        observation: userData.observation,
      });
      setOpen(true);
    } else {
      console.log(`Livraison avec numLiv ${numLiv} non trouvée`);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormUp({ ...formUp, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Requête PUT pour modifier la livraison
    axios
      .put(`http://127.0.0.1:8000/api/livraison-edit/${formUp.numLiv}`, formUp)
      .then((response) => {
        const updatedRes = res.map((liv) =>
          liv.numLiv === formUp.numLiv ? { ...formUp } : liv
        );
        setRes(updatedRes);
        setOpen(false);
      })
      .catch((error) => {
        console.error('Erreur lors de la mise à jour', error);
      });
  };

  // Suppression avec confirmation
  const [openCon, setOpenCon] = useState(false);
  const [numLivToDelete, setNumLivToDelete] = useState(null);

  const handleClickOpenCon = (numLiv) => {
    setNumLivToDelete(numLiv);
    setOpenCon(true);
  };

  const handleCloseCon = () => {
    setOpenCon(false);
    setNumLivToDelete(null);
  };

  const DeleteSubmit = () => {
    if (!numLivToDelete) return;
    axios
      .delete(`http://127.0.0.1:8000/api/livraison-delete/${numLivToDelete}`)
      .then(() => {
        const updatedRes = res.filter((liv) => liv.numLiv !== numLivToDelete);
        setRes(updatedRes);
        handleCloseCon();
      })
      .catch((error) => {
        console.error('Erreur lors de la suppression', error);
      });
  };

  const handleValide = (numLiv, liv_validee) => {
    const currentLiv = res.find((liv) => liv.numLiv === numLiv);
    if (!currentLiv) return;
    const updatedLiv = { ...currentLiv, liv_validee };

    axios
      .put(`http://127.0.0.1:8000/api/livraison-edit/${numLiv}`, updatedLiv)
      .then(() => {
        const updatedRes = res.map((liv) =>
          liv.numLiv === numLiv ? updatedLiv : liv
        );
        setRes(updatedRes);
      })
      .catch((error) => {
        console.error('Erreur lors de la validation', error);
      });
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - res.length) : 0;

  return (
    <Dashbord>
      <>
        <TableContainer component={Paper} style={{ width: '1070px' }}>
          <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Num_Liv</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                  Num_cmd
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                  Date_Liv
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                  Liv_Validée
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                  Observation
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {(rowsPerPage > 0
                ? res.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : res
              ).map((row) => (
                <TableRow key={row.numLiv}>
                  <TableCell component="th" scope="row">
                    {row.numLiv}
                  </TableCell>
                  <TableCell align="center">{row.numCmd}</TableCell>
                  <TableCell align="center">{row.dateLiv}</TableCell>
                  <TableCell align="center">
                    {(userRole === 'formateur' || userRole === 'directeur') ? (
                      <Checkbox
                        icon={
                          <CancelOutlinedIcon style={{ color: 'red' }} />
                        }
                        checkedIcon={
                          <CheckCircleOutlineIcon style={{ color: 'green' }} />
                        }
                        checked={row.liv_validee === 1}
                        disabled
                      />
                    ) : (
                      <Checkbox
                        icon={
                          <CancelOutlinedIcon style={{ color: 'red' }} />
                        }
                        checkedIcon={
                          <CheckCircleOutlineIcon style={{ color: 'green' }} />
                        }
                        checked={row.liv_validee === 1}
                        onClick={() =>
                          handleValide(row.numLiv, row.liv_validee === 1 ? 0 : 1)
                        }
                      />
                    )}
                  </TableCell>
                  <TableCell align="center">{row.observation}</TableCell>
                  <TableCell align="center">
                    <IconButton onClick={() => handleClickOpen(row.numLiv)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleClickOpenCon(row.numLiv)}>
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
                  rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
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

        {/* Dialog de modification */}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Modifier la Livraison</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Veuillez modifier les informations de la livraison.
            </DialogContentText>
            <form onSubmit={handleSubmit}>
              <TextField
                margin="dense"
                id="numLiv"
                name="numLiv"
                label="Numéro Livraison"
                type="text"
                fullWidth
                variant="outlined"
                value={formUp.numLiv}
                onChange={handleChange}
                disabled
              />
              <TextField
                margin="dense"
                id="numCmd"
                name="numCmd"
                label="Numéro Commande"
                type="text"
                fullWidth
                variant="outlined"
                value={formUp.numCmd}
                onChange={handleChange}
              />
              <TextField
                margin="dense"
                id="dateLiv"
                name="dateLiv"
                label="Date Livraison"
                type="date"
                fullWidth
                variant="outlined"
                value={formUp.dateLiv}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              {/* Champ Select pour liv_validee */}
              <TextField
                margin="dense"
                id="liv_validee"
                name="liv_validee"
                label="Liv Validée"
                select
                fullWidth
                variant="outlined"
                value={formUp.liv_validee}
                onChange={(e) =>
                  setFormUp({ ...formUp, liv_validee: Number(e.target.value) })
                }
                SelectProps={{
                  native: true,
                }}
              >
                <option value={0}>Non</option>
                <option value={1}>Oui</option>
              </TextField>
              <TextField
                margin="dense"
                id="observation"
                name="observation"
                label="Observation"
                type="text"
                fullWidth
                variant="outlined"
                value={formUp.observation}
                onChange={handleChange}
              />

              <DialogActions sx={{ mt: 2 }}>
                <button type="submit" style={{ cursor: 'pointer' }}>
                  Modifier
                </button>
                <button
                  type="button"
                  onClick={handleClose}
                  style={{ cursor: 'pointer' }}
                >
                  Annuler
                </button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>

        {/* Dialog confirmation suppression */}
        <Dialog open={openCon} onClose={handleCloseCon}>
          <DialogTitle>Confirmer la suppression</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Voulez-vous vraiment supprimer cette livraison ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <button
              onClick={DeleteSubmit}
              style={{
                backgroundColor: 'red',
                color: 'white',
                cursor: 'pointer',
                border: 'none',
                padding: '6px 12px',
                borderRadius: '4px',
              }}
            >
              Supprimer
            </button>
            <button
              onClick={handleCloseCon}
              style={{
                cursor: 'pointer',
                padding: '6px 12px',
                borderRadius: '4px',
                border: '1px solid #ccc',
              }}
            >
              Annuler
            </button>
          </DialogActions>
        </Dialog>
      </>
    </Dashbord>
  );
}

export default Livrables;
