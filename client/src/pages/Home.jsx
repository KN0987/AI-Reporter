import React from 'react'
import Demo from "../components/Demo";
import Header from "../components/Header";

export default function Home() {
  return (
    <main className="relative">
      <div className="main">
        <div className="gradient"></div>
      </div>
      <div className="app flex flex-col items-center justify-center relative z-10">
      <h1 className="head_text pt-10">
          Summarize Articles with <br/>
          <span className="orange_gradient">OpenAI GPT-4</span>
      </h1>
      <h2 className="desc">
        Summarize your reading by copy URL of articles. We transform lengthy articles into clear and concise summaries. 
      </h2>
      <Demo />
      </div>
    </main>
  )
}
