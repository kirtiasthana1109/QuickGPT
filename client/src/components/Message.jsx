import React, { useEffect } from 'react'
import { assets } from '../assets/assets'
import moment from 'moment';  
import Markdown from 'react-markdown';
import Prism from 'prismjs';

const Message = ({message}) => {

useEffect(() => {
  Prism.highlightAll();
}, [message.content]);

  if (!message || !message.role) return null; 

  return (
    <div>
     
      {message.role === "user" ? ( 
        
        <div className='flex items-start justify-end my-4 gap-2'>
          <div className='flex flex-col gap-2 p-2 px-4 bg-slate-50 dark:bg-[#57317C]/30 border border-[#80609F]/30 rounded-md max-w-2xl'>
            <p className='text-sm dark:text-primary'>{message.content}</p>
            <span className='text-xs text-gray-400 dark:text-[#B1A6C0]'>
            {moment(message.timestamp).fromNow()}</span>
          </div>
          <img src={assets.user_icon} alt="User Avatar" className='w-8 rounded-full'/>
        </div>
      )
      :
      (
        // Assistant Message (Left Alignment)
        <div className='flex items-start justify-start my-4 gap-2'>
          
          {/* Assistant Avatar (Logo ya default icon) */}
          <img 
            src={assets.logo} // Yahan ek appropriate logo/icon use kiya hai
            alt="AI Avatar" 
            className='w-8 rounded-full'
          />
          
          {/* Fix 2: 'inline-flex' hata kar proper div structure diya */}
          <div className='flex flex-col gap-2 p-2 px-4 max-w-2xl bg-primary/20 
          dark:bg-[#57317C]/30 border border-[#80609F]/30 rounded-md'>
            
            {message.isImage ? (
              <img src={message.content} alt="Generated Image" className='w-full max-w-md mt-2 rounded-md'/>
            ) : (
              <div className='text-sm dark:text-primary reset-tw'>
              <Markdown>{message.content}</Markdown></div>
            )}
            
            <span className='text-xs text-gray-400 dark:text-[#B1A6C0]'>
            {moment(message.timestamp).fromNow()}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default Message