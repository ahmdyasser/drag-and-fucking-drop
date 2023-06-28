import Uppy from '@uppy/core'
import XHRUpload from '@uppy/xhr-upload'
import { Dashboard } from '@uppy/react'
import Image from 'next/image';
import '@uppy/core/dist/style.css'
import '@uppy/dashboard/dist/style.css'
import { useState } from 'react';
import ReactLoading from 'react-loading';
import QuestionAndAnswer from './QuestionAndAnswer';

var isFileUploaded = false;
const uppy = new Uppy({
  allowMultipleUploads: false,
})
  .use(XHRUpload, {
    endpoint: 'https://api2.transloadit.com' // TODO: Update to our upload endpoint
  });

function Summarization() {
  const [isLoading, setIsLoading] = useState(false);
  var summarizedTextArray;
  uppy.on('complete', (result) => {
    let timerId = setInterval(async function () {
      if (await fetchStatus()) {
        clearInterval(timerId);
        setIsLoading(false);
      }
    }, 2000); // This repeates calling the function every 2 seconds 
    setIsLoading(true);
    console.log('Upload complete! Weve uploaded these files: ', result.successful);
    isFileUploaded = true;
  })

  async function fetchStatus() {
    var isSummarized = false;
    let url = "[BASE_URL/summary_status]" // TODO: Update to our endpoint which checks the status
    let response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })

    const jsonResponse = await response.json()
    isSummarized = jsonResponse["summary_status"]; // returns true or false
    console.log(jsonResponse);
    if (isSummarized) {
      let url = "[BASE_URL]/summarize";
      let response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
      const jsonResponse = await response.json()
      summarizedTextArray = jsonResponse["summary"];
      return true
    } else {
      return false
    }
  }

  if (isLoading && isFileUploaded) {
    return (
      <>
        <ReactLoading className="reactLoading" color={"black"} height={50} width={100} />
      </>
    )
  } else if (!isFileUploaded && !isLoading) {
    return <div></div>
  } else {
    return (
      <>
        <ul>
          {summarizedTextArray.map((item, index) => (
            <li key={index}>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </>
    )
  }
}


export default function Home() {

  return (
    <div className='flexbox-containter'>
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
        <Summarization />
      </div>
      <QuestionAndAnswer />
    </div>
  )
}