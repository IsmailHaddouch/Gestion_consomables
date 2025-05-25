import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Dashbord from './pages/dashbord/dashbord';
import { Box, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';

export default function Consomables() {
    const [products, setProducts] = useState([]);
    useEffect(()=>{
        const matrc = JSON.parse(localStorage.getItem("userMatricul"));
        console.log(matrc)
        setMatricul(matrc)
      },[])
    useEffect(() => {
        axios.get("http://localhost:8000/api/consomable").then((res) => {
            console.log(res.data.consomables);
            setProducts(res.data.consomables);
        });
    }, []);
    const[matricul, setMatricul]= useState('')

    const[réf,setRéf]=useState('')

    const[quantite,setQuantite]=useState('')
   
    const handleSubmit = () => {
        const currentDate = new Date();
        const dateString = currentDate.toISOString().split('T')[0]; 
        const year = currentDate.getFullYear();
    
        axios.post('http://127.0.0.1:8000/api/commande-create', {
            date_cmd: dateString,
            anneeFormation: year,
            matricul: matricul,
            observation: 'null',
            validee: '0'
        })
        .then(res => {
            console.log('Commande créée', res.data);
            const numCmd = res.data.commande.numCmd; 
    
            axios.post('http://127.0.0.1:8000/api/cmd_consomable-create', {
                réf: réf,
                quantité_commande: quantite,
                numCmd: numCmd 
            })
            .then(res => {
                console.log('Produit associé à la commande', res.data);
                
            
                axios.post('http://127.0.0.1:8000/api/livraison-create', {
                    numCmd: numCmd, 
                    dateLiv: dateString,
                    liv_validee: '0',
                    observation: 'null'
                })
                .then(res => {
                    console.log('Livraison créée', res.data);
                })
                .catch(error => {
                    console.log('Erreur lors de la création de la livraison', error);
                });
    
            })
            .catch(error => {
                console.log('Erreur lors de l\'association du produit à la commande', error);
            });
        })
        .catch(error => {
            console.log('Erreur lors de la création de la commande', error);
        });
    };
    
   

    const getData=(réf,quantite)=>{
setRéf(réf)
setQuantite(quantite)
    }

    return (
        <Dashbord>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', columnGap: "20px", rowGap: "20px", width: '185vh' }}>
                {products.map((product) => (
                    <ProductCard key={product.réf} product={product} getData={getData} handleComnd={handleSubmit} />
                ))}
            </Box>
            
        </Dashbord>
    );
}