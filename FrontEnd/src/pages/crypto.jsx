import React, { useState ,useEffect } from 'react'
import styles from "../crypto.module.css"
import { getCoinData } from '../api/external'
import Loader from '../components/loader'

function Crypto() {
  const [coins,setCoins] = useState([])
  
  useEffect(()=>{
    // IIFE immediately invoked function expression
    (async function coinCall() {
      const resp = await getCoinData();
      setCoins(resp)
    })();
    // cleanup  crypto wala page jab unMount hoga jab ye cleanup chlega
    return () => setCoins([]);
  },[])

  if(coins.length === 0){
    return <Loader text="Crypto Currencies" />
  }

  const negativeStyle = {color: "#ea3943"};
  const positiveStyle = {color: "#16c784"};

  return (
    <div>
      <div>
        <h1 style={{textAlign:"center",marginTop:"20px",marginBottom:"30px",fontStyle:"italic"}} >Crypto page</h1>
      </div>
      <table className={styles.table}>
      <thead>
        <tr className={styles.head}>
          <th>#</th>
          <th>Coin</th>
          <th>Symbol</th>
          <th>Price</th>
          <th>24h</th>
        </tr>
      </thead>
      <tbody>
        {coins.map((coin) => (
          <tr id={coin.id} className={styles.tableRow}>
            <td>{coin.market_cap_rank}</td>
            <td>
              <div className={styles.logo}>
                <img src={coin.image} width={40} height={40} /> {coin.name}
              </div>
            </td>
            <td>
              <div className={styles.symbol}>{coin.symbol}</div>
            </td>
            <td>$ {coin.current_price}</td>
            <td
              style={coin.price_change_percentage_24h < 0 ? negativeStyle:positiveStyle}>{coin.price_change_percentage_24h}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  )
}

export default Crypto