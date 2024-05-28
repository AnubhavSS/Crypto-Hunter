"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import { AppBar,Container,Toolbar,Typography,Select,MenuItem,createTheme,ThemeProvider} from '@mui/material'
import { CrytoState } from '../CrytoContext'

const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

const Header = () => {
  const router=useRouter()
  const { currency, setCurrency } = CrytoState();
  return (
    <ThemeProvider theme={darkTheme}>
    <AppBar color="transparent" position="static">
    <Container>
      <Toolbar>
        <Typography
           onClick={() => router.push(`/`)}
          variant="h6"
          
          sx={{flex:1,color:"gold",fontFamily:"monospace",fontWeight:"bold",cursor:'pointer'}}
        >
          Crypto Hunter
        </Typography>
        {/* <Button color="inherit">Login</Button> */}
        <Select
          variant="outlined"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={currency}
          style={{color:'white', width: 100, height: 40, marginLeft: 15 }}
       onChange={(e) => setCurrency(e.target.value)}
        >
          <MenuItem  value={"USD"}>USD</MenuItem>
          <MenuItem value={"INR"}>INR</MenuItem>
        </Select>
      </Toolbar>
    </Container>
  </AppBar></ThemeProvider>
  )
}

export default Header