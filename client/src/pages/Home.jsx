import React from 'react'
import Demo from "../components/Demo";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <div className="main">
        <div className="gradient"></div>
      </div>
      
      <div className="app flex flex-col items-center justify-center relative z-10 min-h-screen pt-20">
        <div className="text-center mb-12 float-animation">
          <h1 className="head_text">
            Summarize Articles with <br/>
            <span className="gradient-text">OpenAI GPT-4</span>
          </h1>
          <h2 className="desc">
            Transform lengthy articles into clear and concise summaries with the power of AI. 
            Simply paste a URL and let our advanced technology do the rest.
          </h2>
        </div>
        
        <div className="w-full max-w-4xl">
          <Demo />
        </div>
        
        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-6xl w-full px-4">
          <div className="glass-card p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Lightning Fast</h3>
            <p className="text-white/80">Get summaries in seconds with our optimized AI processing</p>
          </div>
          
          <div className="glass-card p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Accurate Results</h3>
            <p className="text-white/80">Powered by GPT-4 for the most precise summaries</p>
          </div>
          
          <div className="glass-card p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Easy to Use</h3>
            <p className="text-white/80">Simple interface designed for effortless summarization</p>
          </div>
        </div>
      </div>
    </main>
  )
}