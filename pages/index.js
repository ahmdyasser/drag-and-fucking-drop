import Uppy from '@uppy/core'
import XHRUpload from '@uppy/xhr-upload'
import { Dashboard } from '@uppy/react'
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
    <div>
      <h1>
        Put here the pdf file you want to summarize
      </h1>
      <Dashboard
        proudlyDisplayPoweredByUppy={false}
				uppy={uppy}
			/>
    </div>
  )
}