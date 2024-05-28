"use client"
import React,{useState,useEffect} from 'react'
import { TrendingCoins } from '../config/api';
import { CrytoState } from '../CrytoContext';
import axios from 'axios';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import Link from 'next/link';
const responsive = {
  0: {
    items: 2,
  },
  512: {
    items: 4,
  },
};

const Carousel = () => {
  const [trending, setTrending] = useState([]);
  const { currency, symbol } = CrytoState();

  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency));

    console.log(data);
    setTrending(data);
  };

  useEffect(() => {
    fetchTrendingCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  const items = trending.map((coin) => {
    let profit = coin?.price_change_percentage_24h >= 0;

    function numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return (
      <Link style={{display:'flex',flexDirection:'column',alignItems:'center',cursor:'pointer',textTransform:'uppercase',color:'white'}} href={`/coins/${coin.id}`}>
        <img
          src={coin?.image}
          alt={coin.name}
          height="80"
          style={{ marginBottom: 10 }}
        />
        <span>
          {coin?.symbol}
          &nbsp;
          <span
            style={{
              color: profit > 0 ? "rgb(14, 203, 129)" : "red",
              fontWeight: 500,
            }}
          >
            {profit && "+"}
            {coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>
        <span style={{ fontSize: 22, fontWeight: 500 }}>
          {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
        </span>
      </Link>
    );
  });


  return (
    <div style={{height:"50%",display:'flex',alignItems:'center'}}>
      <AliceCarousel mouseTracking infinite autoPlayInterval={1000} animationDuration={1500} disableDotsControls responsive={responsive}
      autoPlay items={items} disableButtonsControls/>
    </div>
  )
}

export default Carousel