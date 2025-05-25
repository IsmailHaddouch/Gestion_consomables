import React from 'react';
import './App.css';
 import Signin from './Signin';
// import Menu from './Menu';
import Users from './pages/users'
import { BrowserRouter, Route ,Routes} from 'react-router-dom';
import Commandes from './pages/Commandes';
import Livrables from './pages/Livrables';
import FormUs from './pages/FormeUs';
// import CreateForma from './CreateForma';
import ConsomableCrud from './ConsomableCrud'
import Graphiques from './pages/Graphiques';
import AjouterConsomable from './AjouterConsomable';
import CosmblesDrc from './cosmblesDrc';
import Consomables from './Consomables'
import Livrer_Cons from './Livrer_Cons';

function App() {

  return (
    <>
    <div className='App'>

   
   
 {/* <Home/> */}
  <BrowserRouter>
  <Routes>
  <Route path='/' element={ <Signin/> }/>
  {/* <Route path='/Graphiques' element={<Dashbord/>}/> */}
  <Route path='/Graphiques' element={<Graphiques/>}/>

     <Route path='/Utilisateures' element={<Users/>}/>
     <Route path='/Utilisateure' element={<FormUs/>}/>

    <Route path='/Commandes' element={<Commandes/>}/>
    {/* <Route path='/AjoutCmd' element={<CreateForma/>}/>   //hadi makhedamch lina */}


    <Route path='/Livrables' element={<Livrables/>}/>
    <Route path='/product' element={<Consomables/>}/>
    <Route path='/consomables' element={<ConsomableCrud/>}/>

    <Route path='/AjouterConsomable' element={<AjouterConsomable/>}/>

    <Route path='/voirconsomable' element={<CosmblesDrc/>}/>
    <Route path='/livrConso' element={<Livrer_Cons/>}/>


    





  </Routes>
  
  </BrowserRouter>
  </div>
    </>
  );
}
export default App;