import Dashbord from '../pages/dashbord/dashbord';
import { Paper, TableCell, TableContainer, Table, TableHead } from '@mui/material';
import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TableBody from '@mui/material/TableBody';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { useEffect, useState } from 'react';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';

function Commandes() {
  const [res, setRes] = useState([]);
  const [open, setOpen] = useState(false);
  const [numCmd, setNumCmd] = useState(null);

  const [formUp, setFormUp] = useState({
    numCmd: '',
    matricul: '',
    date_cmd: '',
    validee: '',
    anneeFormation: '',
    observation: ''
  });

  const handleClickOpen = (numCmd) => {
    setNumCmd(numCmd);
    axios.get('http://127.0.0.1:8000/api/commandes')
      .then((response) => {
        const userData = response.data.commandes.find(user => user.numCmd === numCmd);
        if (userData) {
          setFormUp({
            numCmd: userData.numCmd,
            matricul: userData.matricul,
            date_cmd: userData.date_cmd,
            validee: userData.validee,
            anneeFormation: userData.anneeFormation,
            observation: userData.observation
          });
          setOpen(true);
        } else {
          console.log(`commande ${numCmd} non trouvée`);
        }
      })
      .catch((error) => {
        console.log('Error de data ', error);
      });
  };

  const handleClose = () => {
    setOpen(false);
  };
  const userRole = JSON.parse(localStorage.getItem("userdata"));

  useEffect(() => {
    const userRole = JSON.parse(localStorage.getItem("userdata"));
    console.log(userRole)
    if (userRole === 'directeur') {
      
      axios.get("http://localhost:8000/api/commandes")
        .then((res) => {
          console.log(res.data.commandes);
          setRes(res.data.commandes);
        })
        .catch((error) => {
          console.error('Error  commands for directeur:', error);
        });
    } else if (userRole === 'formateur') {
      // const userMatricul = JSON.parse(localStorage.getItem("userMatricul")); 
      console.log(localStorage.getItem("userMatricul"))
      // Retrieve formateur's matricul from localStorage
      if (localStorage.getItem("userMatricul")) {
        axios.get(`http://localhost:8000/api/commandes/${localStorage.getItem("userMatricul")}`)
          .then((res) => {
            console.log(res.data.commandes);
            setRes(res.data.commandes);
          })
          .catch((error) => {
            console.error('Error fetching commands for formateur:', error);
          });
      } else {
        console.error('Formateur matricul not found in localStorage');
      }
    } else {
      console.log("User role is not for  commands");
    }
  }, []);
  

  function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
      onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
      onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
      onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
      onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
      <Box sx={{ flexShrink: 0, ml: 2.5 }}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </Box>
    );
  }

  TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
  };

  function createData(numCmd, matricul, date_cmd, validee, anneeFormation, observation) {
    return { numCmd, matricul, date_cmd, validee, anneeFormation, observation };
  }

  const rows = [
    createData(res.numCmd, res.matricul, res.date_cmd, res.validee, res.anneeFormation, res.observation)
  ].sort((a, b) => (a.calories < b.calories ? -1 : 1));

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formUp);
    axios.put('http://127.0.0.1:8000/api/commande-edit/' + formUp.numCmd, formUp)
      .then(response => {
        console.log('Data envoyée');
        const updatedRes = res.map(user => {
          if (user.numCmd === formUp.numCmd) {
            return {
              ...user,
              numCmd: formUp.numCmd,
              matricul: formUp.matricul,
              date_cmd: formUp.date_cmd,
              validee: formUp.validee,
              anneeFormation: formUp.anneeFormation,
              observation: formUp.observation,
            };
          }
          return user;
        });
        setRes(updatedRes);
        handleClose();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [openCon, setOpenCon] = useState(false);

  const handleClickOpenCon = () => {
    setOpenCon(true);
  };

  const handleCloseCon = () => {
    setOpenCon(false);
  };

  const DeleteSubmit = (numCmd) => {
    axios.delete(`http://127.0.0.1:8000/api/commande-delete/${numCmd}`)
      .then(response => {
        console.log('Commandes supprimé avec succès');
        const updatedRes = res.filter(user => user.numCmd !== numCmd);
        setRes(updatedRes);
        handleCloseCon();
      })
      .catch(error => {
        console.error('Erreur lors de la suppression de Commandes', error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormUp({ ...formUp, [name]: value });
  };

  const handleValide = (numCmd, validee) => {
    const currentCmd = res.find(cmd => cmd.numCmd === numCmd);
    if (currentCmd) {
      const updatedCmd = { ...currentCmd, validee };
      axios.put(`http://127.0.0.1:8000/api/commande-edit/${numCmd}`, updatedCmd)
        .then(response => {
          const  updatedRes = res.map(cmd => cmd.numCmd === numCmd ? updatedCmd : cmd);
          setRes(updatedRes);
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  return (
    <Dashbord>
      <>
        <div>
          <TableContainer style={{ width: '1070px' }}>
        
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Num Commandes</TableCell>
                  <TableCell>Matricule</TableCell>
                  <TableCell>Date commandes</TableCell>
                  <TableCell>Validée</TableCell>
                  <TableCell>Année de Formation</TableCell>
                  <TableCell>Observation</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {res.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((commande) => (
                  <TableRow key={commande.numCmd}>
                    <TableCell>{commande.numCmd}</TableCell>
                    <TableCell>{commande.matricul}</TableCell>
                    <TableCell>{commande.date_cmd}</TableCell>
                    <TableCell>
  {userRole === 'formateur' ? (
    commande.validee === 1 ? (
      <Checkbox
        icon={<CheckCircleOutlineIcon style={{ color: 'green' }} />}
        checkedIcon={<CheckCircleOutlineIcon style={{ color: 'green' }} />}
        checked
        disabled  // Disable checkbox
      />
    ) : (
      <Checkbox
        icon={<CancelOutlinedIcon style={{ color: 'red' }} />}
        checkedIcon={<CancelOutlinedIcon style={{ color: 'red' }} />}
        disabled  // Disable checkbox
      />
    )
  ) : (
    commande.validee === 1 ? (
      <Checkbox
        icon={<CheckCircleOutlineIcon style={{ color: 'green' }} />}
        checkedIcon={<CheckCircleOutlineIcon style={{ color: 'green' }} />}
        checked
        onClick={() => handleValide(commande.numCmd, 0)}
      />
    ) : (
      <Checkbox
        icon={<CancelOutlinedIcon style={{ color: 'red' }} />}
        checkedIcon={<CancelOutlinedIcon style={{ color: 'red' }} />}
        onClick={() => handleValide(commande.numCmd, 1)}
      />
    )
  )}
</TableCell>    
<TableCell>{commande.anneeFormation}</TableCell>
                    <TableCell>{commande.observation}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleClickOpen(commande.numCmd)} color="primary" aria-label="modifier">
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={handleClickOpenCon} color="error" aria-label="Supprimer">
                        <DeleteIcon />
                      </IconButton>
                      <Dialog open={openCon} onClose={handleCloseCon} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                        <DialogTitle id="alert-dialog-title">
                          {"Confirmer la suppression"}
                        </DialogTitle>
                        <DialogContent>
                          <DialogContentText id="alert-dialog-description">
                            êtes-vous sûr de la suppression de cette Commande?
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleCloseCon}>Annuler</Button>
                          <Button onClick={() => DeleteSubmit(commande.numCmd)} autoFocus>
                            Confirmer
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    colSpan={3}
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
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Modifier une Commande</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Remplir le formulaire ci-dessous pour modifier une commande.
            </DialogContentText>
            <TextField
              margin="dense"
              id="numCmd"
              name="numCmd"
              label="Numéro de Commande"
              type="text"
              fullWidth
              variant="standard"
              value={formUp.numCmd}
              onChange={handleChange}
              disabled
            />
            <TextField
              margin="dense"
              id="matricul"
              name="matricul"
              label="Matricule"
              type="text"
              fullWidth
              variant="standard"
              value={formUp.matricul}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              id="date_cmd"
              name="date_cmd"
              label="Date de Commande"
              type="date"
              fullWidth
              variant="standard"
              value={formUp.date_cmd}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              margin="dense"
              id="validee"
              name="validee"
              label="Validee"
              type="text"
              fullWidth
              variant="standard"
              value={formUp.validee}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              id="anneeFormation"
              name="anneeFormation"
              label="anneeFormation"
              type="text"
              fullWidth
              variant="standard"
              value={formUp.anneeFormation}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              id="observation"
              name="observation"
              label="Observation"
              type="text"
              fullWidth
              variant="standard"
              value={formUp.observation}
              onChange={handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Annuler</Button>
            <Button onClick={handleSubmit}>Modifier</Button>
          </DialogActions>
        </Dialog>
      </>
    </Dashbord>
  );
}

export default Commandes;
