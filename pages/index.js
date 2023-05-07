import Uppy from '@uppy/core'
import XHRUpload from '@uppy/xhr-upload'
import { Dashboard } from '@uppy/react'
import Image from 'next/image';
import '@uppy/core/dist/style.css'
import '@uppy/dashboard/dist/style.css'
import { useState } from 'react';
import ReactLoading from 'react-loading';

const uppy = new Uppy({
  allowMultipleUploads: false,
})
	.use(XHRUpload, {
		endpoint: 'https://api2.transloadit.com'
	});

function Summarization() {
  const [isLoading, setIsLoading] = useState(false);
  uppy.on('complete', (result) => {
    let timerId = setInterval(async function() {
      if (await fetchStatus()) {
        clearInterval(timerId);
        setIsLoading(false);
      }
    }, 2000);
    setIsLoading(true);
    console.log('Upload complete! Weve uploaded these files: ', result.successfful);
  })
    
  async function fetchStatus() {
    var time;
    let response = await fetch("https://reqres.in/api/users", {
    method: "POST",
    body: JSON.stringify({
      name: "morpheus",
      job: "leader"
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
  
  const jsonResponse = await response.json()
  time = jsonResponse["createdAt"];
  const minutes = time.split('T')[1].split(':')[1]
  console.log(jsonResponse);
  console.log(minutes);
  
    console.log(time);
    if (minutes == 29) {
      return true
    } else { 
      return false
    }
      
    } 
   
    if (isLoading) {
      return (
        <>
          <ReactLoading className = "reactLoading" color={"black"} height={50} width={100} />
        </>
      )
    }
    return(
      <>
        <p>
          here we get the summarized text
        </p>
      </>
    )
  }


export default function Home() {

  return (
    <div className='container'>
      <span className='appName'>
      <Image
      src="/enabled-logo.svg"
      width={300}
      height={100}
      alt="enabled logo"
    />
    <h4 className='subAppName'>Summarization app</h4>
      </span>
      <h3 className='heading'>
        Put here the pdf file you want to summarize.
      </h3>
      <Dashboard
        proudlyDisplayPoweredByUppy={false}
				uppy={uppy}
			/>
      <Summarization/>
    </div>
  )
}