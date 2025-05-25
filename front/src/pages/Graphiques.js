import { Card,CardContent, Typography,Grid } from '@mui/material'
import React from 'react'
import Box from '@mui/material/Box'
import {chart as ChartJS} from 'chart.js/auto'
import{Bar,Doughnut,Line} from 'react-chartjs-2'
import Dashboard from '../pages//dashbord/dashbord'
export default function Graphiques() {
  return (
   <Dashboard>
   <Grid container spacing={2} sx={{backgroundColor:'#f0f2f5', maxWidth: '97%' }}>
      {/* Diagramme 3 */}
      <Grid item xs={12} md={12} sm={12}>
        <Card sx={{ width: '97%', height: '350px',backgroundColor:'#f0f2f5' }}>
          <Typography>Diagramme 3</Typography>
          <Box>
            <Line
              data={{
                labels: ['A', 'B', 'C'],
                datasets: [
                  {
                    label: 'Revenus',
                    data: [200, 300, 500],
                  },
                  {
                    label: 'Pertes',
                    data: [90, 80, 20],
                  },
                ],
              }}
              width={400} // Largeur de 400px
              height={300} // Hauteur de 300px
              options={{
                plugins: {
                  legend: {
                    position: 'top',
                  },
                },
                maintainAspectRatio: false, // Permet au graphique de s'adapter à la taille du conteneur sans maintenir le ratio
              }}
              sx={{ margin: '0 auto' }} // Centrer horizontalement
            />
          </Box>
        </Card>
      </Grid>

      {/* Diagramme 1 */}
      <Grid item xs={12} md={6} sm={12}>
        <Card sx={{ width: '500px', height: '100%',backgroundColor:'#f0f2f5' }}>
          <Typography>Diagramme 1</Typography>
          <Bar
            data={{
              labels: ['A', 'B', 'C'],
              datasets: [
                {
                  label: 'Revenus',
                  data: [200, 300, 500],
                  backgroundColor: 'rgba(0, 255, 0, 0.2)', // Vert
                  borderWidth: 1,
                },
                {
                  label: 'Pertes',
                  data: [90, 80, 70],
                  backgroundColor: 'rgba(54, 162, 235, 0.2)', // Bleu
                  borderColor: 'rgba(54, 162, 235, 1)',
                  borderWidth: 1,
                },
                {
                  label: 'Autre',
                  data: [50, 150, 250],
                  backgroundColor: 'rgba(255, 0, 0, 0.2)', // Rouge
                  borderWidth: 1,
                },
              ],
            }}
          />
        </Card>
      </Grid>

      {/* Diagramme 2 */}
      <Grid item xs={12} md={6} sm={12}>
        <Card sx={{ width: '500px', height: '300px', alignItems: 'center',backgroundColor:'#f0f2f5' }}>
          <Typography>Diagramme 2</Typography>
          <Box sx={{ height: '250px', alignItems: 'center', marginLeft: '100px' }}>
            <Doughnut
              data={{
                labels: ['A', 'B', 'C'],
                datasets: [
                  {
                    label: 'Revenus',
                    data: [200, 300, 500],
                  },
                ],
              }}
            />
          </Box>
        </Card>
      </Grid>
    </Grid>






   </Dashboard>
  )
}
