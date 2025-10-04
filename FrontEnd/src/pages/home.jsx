import React,{ useState , useEffect } from 'react';
import { getNews } from '../api/external';
import Loader from '../components/loader';
import styles from "../home.module.css";

function Home() {
  const [articels,setArticles] = useState([])
  const newApiCall = async () => {
      const resp = await getNews()
      setArticles(resp)
  }

  useEffect(()=>{
    newApiCall()
    // cleanUp Function
    setArticles([]);
  },[])

  const handleClick = (url) => {
    window.open(url,"_blank")
  }

  if(articels.length == 0){
    return <Loader text="Home Page" />
  }

  return <>
    <div className={styles.header}><p>Latest Article</p></div>
    <div className={styles.grid}>
      {
        articels.map((item)=>{
        return (
        <div className={styles.card} key={item.url} onClick={()=> handleClick(item.url)} >
              <img src={item.urlToImage} alt="" />
              <h3>{item.title}</h3>
        </div>
        )
        })
      }
    </div>
  </>
}

export default Home