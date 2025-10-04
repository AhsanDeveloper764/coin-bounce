import axios from "axios";
const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY
const CRYPTO_API_KEY = import.meta.env.VITE_CRYPTO_API_KEY
const NEWS_API_ENDPOINT = `https://newsapi.org/v2/everything?q=bitcoin&language=en&apiKey=${NEWS_API_KEY}`;
const CRYPTO_API_ENDPOINT = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&
page=1&sparkline=false&x_cg_demo_api_key=${CRYPTO_API_KEY}`

export const getNews = async () => {
    try{
        const resp = await axios.get(NEWS_API_ENDPOINT)
        const getData = resp.data.articles.slice(0,50);        
        return getData;
    }catch(error){
        return error
    }
}

export const getCoinData = async () => {
    try{
        const resp = await axios.get(CRYPTO_API_ENDPOINT);
        return resp.data 
    }catch(error){
        return error
    }
}  
