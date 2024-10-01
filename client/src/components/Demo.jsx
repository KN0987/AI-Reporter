import React, {useState, useEffect} from 'react'
import {copy, linkIcon, loader, tick} from "../assets/index.js";
import { useLazyGetSummaryQuery } from '../redux/article.js';

export default function Demo() {
  const [article, setArticle] = useState({url:'', summary: '',});
  const [allArticles, setAllArticles] = useState([]);
  const [copied, setCopied] = useState("");
  const [getSummary, {error, isFetching}] = useLazyGetSummaryQuery();
  
  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(localStorage.getItem("articles"));
    if(articlesFromLocalStorage){
      setAllArticles(articlesFromLocalStorage);
    }
  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const {data} = await getSummary({articleUrl: article.url});
    if(data?.summary){
      const newArticle = {...article, summary: data.summary};
      const updatedAllArticles = [newArticle,...allArticles];
      setArticle(newArticle);
      setAllArticles(updatedAllArticles);
      localStorage.setItem("articles", JSON.stringify(updatedAllArticles));
    }
  }
  const handleChange = async (event) => {
    setArticle({...article,  url: event.target.value})
  }
  const handleCopy=(copyUrl) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => setCopied(false), 3000);
  }
  return (
    <section className="mt-16 w-full max-w-xl">
      <div className="flex flex-col w-full gap-2">
        
        {/*Search Bar*/}
        <form className="relative flex justify-center items-center" onSubmit={handleSubmit}>
          <img src={linkIcon} alt = "link_icon" className = "absolute left-0 my-2 ml-3 w-5" />
          <input type="url" name="input-url" placeholder="Enter a Complete URL" value={article.url} onChange={handleChange} required className="h-16 url_input peer"/>
          <button type="submit" className="submit_btn py-2 peer-focus:border-gray-700 peer-focus:text-gray-700">Go</button>
        </form>
        
        {/*Show history*/}
        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
          {allArticles.map((item, index) => (
            <div key={`link-${index}`} onClick={() => setArticle(item)} className="link_card">
              <div className="copy_btn" onClick={()=> handleCopy(item.url)}>
                <img src={copied === item.url ? tick : copy} alt="copy icon" className="w-[40%] h-[40%] object-contain"/>
              </div>
              <p className="flex-1 font-satoshi text-blue-700 font-medium text-sm truncate">{item.url}</p>
            </div>
          ))}
        </div>

        {/*Display result*/}
        <div className="my-10 max-w-full flex justify-center items-center">
          {isFetching ? (
            <img src={loader} alt="loader" className="w-20 h-20 object-contain"/>
          ) : error ? (
            <p className="font-montserrat font-bold text-black text-center ">
              Something went wrong here 
              <br />
              <span className="font-montserrat font-normal text-gray-700">
                {error?.data?.error}
              </span>
            </p>
          ) : (
            article.summary && (
              <div className="flex flex-col gap-3">
                <h2 className="font-fredoka font-bold text-gray-600 text-xl">
                  <span className="blue_gradient text-xl">Summary</span>
                </h2>
                <div className="summary_box">
                  <p className="font-fredoka text-xl text-gray-700">{article.summary}</p>
                </div>
              </div>
            )
          )}
        </div>
      </div>
      
    </section>
  )
}
