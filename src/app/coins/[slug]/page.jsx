"use client"
import axios from 'axios'
import { CrytoState } from '@/app/CrytoContext'
import React,{useState,useEffect} from 'react'
import { SingleCoin } from '@/app/config/api'
import { Typography,LinearProgress, Container } from '@mui/material'
import CoinInfo from '@/app/components/CoinInfo'
import { styled } from '@mui/material/styles';

const Sidebar = styled('div')(({ theme }) => ({
  width: "30%",
      [theme.breakpoints.down("md")]: {
        width: "100%",
      },
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: 25,
      borderRight: "2px solid grey",
  }))

  const MarketData = styled('div')(({ theme }) => ({
    alignSelf: "start",
    padding: 10,
    width: "100%",
    [theme.breakpoints.down("md")]: {
      display: "flex",
      justifyContent: "space-around",
    },
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "center",
    },
    [theme.breakpoints.down("xs")]: {
      alignItems: "start",
    },
    }))

const CoinsPage = ({params}) => {
   const {slug}=params

   const [coin, setCoin] = useState();
   const { currency, symbol } = CrytoState();
 
   const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(slug));
console.log(data)
    setCoin(data);
  };

  useEffect(() => {
    fetchCoin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return (
<Container sx={{
  display: 'flex',
  flexDirection: {
    xs: 'column', // styles for extra-small screens
    md: 'row' // styles for medium screens and up
  },
  alignItems: {
    xs: 'center', // styles for extra-small screens
    md: 'flex-start' // styles for medium screens and up
  }
}}>
    <Sidebar>
      <img
        src={coin?.image.large}
        alt={coin?.name}
        height="100"
        style={{ marginBottom: 20 }}
      />
      <Typography variant="h3" style={{fontWeight:"bold",marginBottom:20}}>
        {coin?.name}
      </Typography>
      <Typography variant="subtitle1" style={{padding:10,textAlign:"justify"}}>
        {(coin?.description.en.slice(0,150)+"..")}.
      </Typography>
    <MarketData>
        <span style={{ display: "flex" }}>
          <Typography variant="h5" style={{fontWeight:'bold',marginBottom:20}}>
            Rank:
          </Typography>
          &nbsp; &nbsp;
          <Typography
            variant="h5"
            style={{
              fontFamily: "Montserrat",
            }}
          >
            {numberWithCommas(coin?.market_cap_rank)}
          </Typography>
        </span>

        <span style={{ display: "flex" }}>
          <Typography variant="h5" style={{fontWeight:'bold',marginBottom:20}}>
            Current Price:
          </Typography>
          &nbsp; &nbsp;
          <Typography
            variant="h5"
            style={{
              fontFamily: "Montserrat",
            }}
          >
            {symbol}{" "}
            {numberWithCommas(
              coin?.market_data.current_price[currency.toLowerCase()]
            )}
          </Typography>
        </span>
        <span style={{ display: "flex" }}>
          <Typography variant="h5" style={{fontWeight:'bold',marginBottom:20}}>
            Market Cap:
          </Typography>
          &nbsp; &nbsp;
          <Typography
            variant="h5"
            style={{
              fontFamily: "Montserrat",
            }}
          >
            {symbol}{" "}
            {numberWithCommas(
              coin?.market_data.market_cap[currency.toLowerCase()]
                .toString()
                .slice(0, -6)
            )}
            M
          </Typography>
        </span>
        </MarketData>
      </Sidebar>
    <CoinInfo coin={coin} />
  </Container>
  )
}

export default CoinsPage