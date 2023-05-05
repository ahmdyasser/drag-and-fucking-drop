import Uppy from '@uppy/core'
import XHRUpload from '@uppy/xhr-upload'
import { Dashboard } from '@uppy/react'
import Image from 'next/image';
import '@uppy/core/dist/style.css'
import '@uppy/dashboard/dist/style.css'

const uppy = new Uppy({
  allowMultipleUploads: false,
})
	.use(XHRUpload, {
		endpoint: 'https://api2.transloadit.com'
	});

uppy.on('complete', (result) => {
	console.log('Upload complete! Weve uploaded these files: ', result.successfful)
})

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
    </div>
  )
}