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
    <section className="mt-8 w-full max-w-4xl mx-auto px-4">
      <div className="flex flex-col w-full gap-6">
        
        {/* Search Bar */}
        <div className="glass-card p-6">
          <form className="relative flex items-center" onSubmit={handleSubmit}>
            <div className="absolute left-4 z-10">
              <svg className="w-6 h-6 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </div>
            <input 
              type="url" 
              name="input-url" 
              placeholder="Paste your article URL here..." 
              value={article.url} 
              onChange={handleChange} 
              required 
              className="url_input peer"
            />
            <button type="submit" className="submit_btn">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              Summarize
            </button>
          </form>
        </div>
        
        {/* History Section */}
        {allArticles.length > 0 && (
          <div className="glass-card p-6">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Recent Summaries
            </h3>
            <div className="flex flex-col gap-3 max-h-60 overflow-y-auto">
              {allArticles.slice(0, 5).map((item, index) => (
                <div key={`link-${index}`} onClick={() => setArticle(item)} className="link_card group">
                  <div className="copy_btn group-hover:scale-110" onClick={(e) => {e.stopPropagation(); handleCopy(item.url)}}>
                    {copied === item.url ? (
                      <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    )}
                  </div>
                  <p className="flex-1 font-medium text-white/90 text-sm truncate group-hover:text-white transition-colors duration-300">
                    {item.url}
                  </p>
                  <svg className="w-4 h-4 text-white/50 group-hover:text-white/70 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Results Section */}
        <div className="flex justify-center items-center min-h-[200px]">
          {isFetching ? (
            <div className="glass-card p-8 text-center">
              <div className="pulse-glow w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <svg className="w-8 h-8 text-white animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
              <p className="text-white font-medium">Analyzing article...</p>
              <p className="text-white/70 text-sm mt-2">This may take a few moments</p>
            </div>
          ) : error ? (
            <div className="glass-card p-8 text-center max-w-md">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/20 flex items-center justify-center">
                <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <p className="font-semibold text-red-400 mb-2">Something went wrong</p>
              <p className="text-white/70 text-sm">
                {error?.data?.error || "Please check the URL and try again"}
              </p>
            </div>
          ) : (
            article.summary && (
              <div className="w-full">
                <div className="glass-card p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-600 rounded-xl flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-white">
                      Article Summary
                    </h2>
                  </div>
                  
                  <div className="summary_box">
                    <p className="text-lg text-white/90 leading-relaxed">
                      {article.summary}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between mt-6 pt-6 border-t border-white/20">
                    <div className="flex items-center text-white/70 text-sm">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                      Source: {new URL(article.url).hostname}
                    </div>
                    <button 
                      onClick={() => handleCopy(article.summary)}
                      className="glass-button px-4 py-2 text-white/80 hover:text-white text-sm font-medium"
                    >
                      {copied === article.summary ? (
                        <>
                          <svg className="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Copied!
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                          Copy Summary
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  )
}