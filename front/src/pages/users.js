import  Dashbord  from '../pages/dashbord/dashbord'
import { Paper, TableCell, TableContainer,Table,TableHead } from '@mui/material'
import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TableBody from '@mui/material/TableBody';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
// import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import  { useEffect, useState } from 'react';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import { IconButton } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddIcon from '@mui/icons-material/Add';
import Papa from 'papaparse';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { Error } from '@mui/icons-material';

function Users() {
  const[res,setRes]=useState([]) ;
  const [matricul,setMatricul]=useState(null)
  const [open, setOpen] = React.useState(false);             // State pour gérer l'ouverture
  const [formUp, setFormUp] = useState({
    matricul:'',
    nom: '',
    prenom: '',
    statut: '',
    fonction: '',
    secteur: ''
  });
  const handleClickOpen = (matricul) => {
    setMatricul(matricul)
    axios.get('http://127.0.0.1:8000/api/personnel')
    .then((response)=>{
   const userData = response.data.personnels.find(user => user.matricul === matricul);
   if (userData) {
    setFormUp({
      matricul: userData.matricul,
      nom: userData.nom,
      prenom: userData.prenom,
      statut: userData.statut,
      fonction: userData.fonction,
      secteur: userData.secteur
    });
    setOpen(true);
    }else {
      console.log(`Utilisateur avec matricul ${matricul} non trouvé`);
    }
  
  })
    .catch((error)=>{
          console.log('Error de data ',Error)
    })
  };

  const handleClose = () => {                     ///fermeture du dialog
    setOpen(false);
  };



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
        const handleChangeRowsPerPage = (event) => {
            setRowsPerPage(parseInt(event.target.value, 10));
            setPage(0);
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
      
      function createData(matricul,nom,prenom,statut,secteur,fonction) {
        return {matricul,nom,prenom,statut,secteur,fonction};
      }
      
      const rows = [
        
        createData(res.matricul,res.nom,res.prenom,res.statut,res.secteur,res.fonction)
        
      ]
      
     
    const [page, setPage] = React.useState(0);
     const [rowsPerPage, setRowsPerPage] = React.useState(5);
        useEffect(() => {
            axios.get("http://localhost:8000/api/personnel").then((res) => {
              console.log(res.data.personnels);
              setRes(res.data.personnels);
            });
          },[]);
        // Avoid a layout jump when reaching the last page with empty rows.
        const emptyRows =
          page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
      
        const handleChangePage = (event, newPage) => {
          setPage(newPage);
        };
        const handleChangeRowsPerPage = (event) => {
            setRowsPerPage(parseInt(event.target.value, 10));
            setPage(0);
          };






          // Fonction pour soumettre le formulaire
          const handleSubmit = (e) => {
            e.preventDefault();
            console.log(formUp)
            axios.put('http://127.0.0.1:8000/api/personnel-edit/'+formUp.matricul, formUp)
              .then(response =>{
                console.log('Data envoyée');
          
                // Mettre à jour les données dans le tableau
                const updatedRes = res.map(user => {
                  if (user.matricul === formUp.matricul) {
                    return {
                      ...user,
                      nom: formUp.nom,
                      prenom: formUp.prenom,
                      statut: formUp.statut,
                      fonction: formUp.fonction,
                      secteur: formUp.secteur
                    };
                  }
                  return user;
                });
          
                // Mettre à jour les données du tableau avec les nouvelles données
                setRes(updatedRes);
          
                handleClose(); // Fermer le dialogue après la mise à jour
              })
              .catch((error)=>{
                console.log(error);
              });
          };
//confirme de supp
const [openCon, setOpenCon] = React.useState(false);

const handleClickOpenCon = () => {
  setOpenCon(true);
};

const handleCloseCon = () => {

  setOpenCon(false);
};




       //Delete:
          const DeleteSubmit = (matricul) => {
              axios.delete(`http://127.0.0.1:8000/api/personnel-delete/${matricul}`)
              .then(response => {
                  console.log('Utilisateur supprimé avec succès');
                  
                  // Mettre à jour les données dans le tableau en excluant l'utilisateur supprimé
                  const updatedRes = res.filter(user => user.matricul !== matricul);
                  setRes(updatedRes);
                  handleCloseCon()
                })
                .catch(error => {
                  console.error('Erreur lors de la suppression de l\'utilisateur', error);
                });

            };



  // Fonction pour mettre à jour les valeurs des champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormUp({ ...formUp, [name]: value });
  };
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const csvData = e.target.result;
        Papa.parse(csvData, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const jsonData = results.data;
            // Mettre à jour l'état avec les données du fichier
            setFile(jsonData);
          },
        });
      };
      reader.readAsText(file);
    }
  };

  // Fonction pour gérer l'ajout des données importées

  // Définir newFormateur avec useState
  const [newFormateur, setNewFormateur] = useState({
      "matricul" : "",
      "nom" : "",
      "prenom" : "",
      "statut" : "",
      "fonction" : "",    
      "secteur" : "",
      "motDePass" : ""
  });
  
  // Fonction handleAjouter
  const handleAjouter = async () => {
    if (file) {
        for (let i = 0; i < file.length; i++) {
            const row = {
                "matricul" : file[i].matricul,
                "nom" : file[i].nom,
                "prenom" : file[i].prenom,
                "statut" : file[i].statut,
                "fonction" : file[i].fonction,    
                "secteur" : file[i].secteur,
                "motDePass" : file[i].motDePass
                
            }
            console.log(row)
            await axios.post("http://localhost:8000/api/personnel-create", row)
                .then(res => {
                    console.log(res.data.message);
                })
                .catch(err => {
                    console.log(err.response.data);
                });
        }
        setFile(null);
    } else {
        await axios.post("http://localhost:8000/api/personnel-create", newFormateur)
            .then(res => {
                console.log(res.data.message);
            })
            .catch(err => {
                console.log(err.response.data.message);
            });
        setNewFormateur({
            "matricul" : "",
            "nom" : "",
            "prenom" : "",
            "statut" : "",
            "fonction" : "",    
            "secteur" : "",
            "motDePass" : ""
        });
    }
};

  


    return (
<Dashbord>
    <>
    <div>
   
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
    <div>
      <Link to="/Utilisateure">
        <IconButton style={{ color: '#1976d2' }}>
          <AddIcon />
        </IconButton>
      </Link>
      <span style={{ marginLeft: '5px' }}>Ajouter utilisateur</span>
    </div>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {/* Composant d'importation de fichier */}
      <input
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        id="contained-button-file"
        type="file"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      <label htmlFor="contained-button-file" style={{ marginRight: '10px' }}>
        {/* Ajout de la marge à droite */}
        <Button
          variant="outlined"
          component="span"
          startIcon={<CloudUploadIcon />}
        >
          Importer
        </Button>
      </label>
      {/* Bouton d'ajout après l'importation */}
      <Button
        onClick={handleAjouter}
        variant="contained"
        size="large"
      >
        Ajouter
      </Button>
    </div>
  </div>
        <TableContainer style={{width:'1070px'}}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
      <TableHead>
      <TableRow >
        <TableCell sx={{color:'#001F3F',fontWeight:'bold'}} >Matricul</TableCell>
        <TableCell align="right" sx={{color:'#001F3F',fontWeight:'bold'}} >Nom</TableCell>
        <TableCell align="right"sx={{color:'#001F3F',fontWeight:'bold'}}  >Prenom</TableCell>
        <TableCell align="right"sx={{color:'#001F3F',fontWeight:'bold'}} >Statut</TableCell>
        <TableCell align="right"sx={{color:'#001F3F',fontWeight:'bold'}} >Secteur</TableCell>
        <TableCell align="right"sx={{color:'#001F3F',fontWeight:'bold'}} >Fonction</TableCell>
        <TableCell align="right"sx={{color:'#001F3F',fontWeight:'bold'}} >Action</TableCell>

      </TableRow>
    </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? res.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : res
          ).map((row) => (
            <TableRow key={row.matricul}>
              <TableCell component="th" scope="row">
                {row.matricul}
              </TableCell>
              <TableCell  align="right">
                {row.nom}
              </TableCell>
              <TableCell  align="right">
                {row.prenom}
              </TableCell>
              <TableCell  align="right">
                {row.statut}
              </TableCell>
              <TableCell  align="right">
                {row.secteur}
              </TableCell>
              <TableCell  align="right">
                {row.fonction}
              </TableCell>
              <TableCell  align="right">
      <IconButton onClick={() => handleClickOpen(row.matricul)}><EditIcon /></IconButton>
 <Dialog open={open} onClose={handleClose}>
  <DialogTitle>Add User</DialogTitle>
  <DialogContent>
    <DialogContentText>
      Ajouter votre Utilisateures:
    </DialogContentText>
    {/* Formulaire de mise à jour des utilisateurs */}
    <form onSubmit={handleSubmit}>
      <TextField
        autoFocus
        margin="dense"
        id="nom"
        name="nom"
        label="Nom"
        type="text"
        fullWidth
        value={formUp.nom}
        onChange={handleChange}
        sx={{ mb: 2 }}
      />
      <TextField
        margin="dense"
        id="prenom"
        name="prenom"
        label="Prénom"
        type="text"
        fullWidth
        value={formUp.prenom}
        onChange={handleChange}
        sx={{ mb: 2 }}
      />
      <FormControl fullWidth  sx={{ mb: 2 }}>
        <InputLabel id="statut-label">Statut</InputLabel>
        <Select
          labelId="statut-label"
          id="statut"
          name="statut"
          value={formUp.statut}
          onChange={handleChange}
          label="Statut"
        >
          {['vacataire', 'contractuel', 'statutaire', 'coopérant'].map((statut) => (
            <MenuItem key={statut} value={statut}>{statut}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="fonction-label">Fonction</InputLabel>
        <Select
          labelId="fonction-label"
          id="fonction"
          name="fonction"
          value={formUp.fonction}
          onChange={handleChange}
          label="Fonction"
        >
          {['magasinier', 'formateur', 'directeur', 'directeur complexe'].map((fonction) => (
            <MenuItem key={fonction} value={fonction}>{fonction}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        margin="dense"
        id="secteur"
        name="secteur"
        label="Secteur"
        type="text"
        fullWidth
        value={formUp.secteur} 
        onChange={handleChange}
      />
    </form>
  </DialogContent>
  <DialogActions>
    {/* Bouton d'annulation */}
    <Button onClick={handleClose}>Cancel</Button>
    {/* Bouton de soumission */}
    <Button type="submit" onClick={handleSubmit}>Save</Button>
  </DialogActions>
</Dialog>
<React.Fragment>
      <IconButton variant="outlined" onClick={handleClickOpenCon}>
      <DeleteIcon style={{color:'red'}}/> </IconButton>
      <Dialog
        open={openCon}
        onClose={handleCloseCon}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
       
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Vous avez sure de supprimer 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCon}>Non</Button>
          <Button onClick={()=>DeleteSubmit(row.matricul)}>
            Oui
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>


              
              </TableCell>
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={7} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
           
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              slotProps={{
                select: {
                  inputProps: {
                    'aria-label': 'rows per page',
                  },
                  native: true,
                },
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
    </>
    </Dashbord>
  )
}
export default Users;
