import Uppy from "@uppy/core";
import XHRUpload from "@uppy/xhr-upload";
import { Dashboard } from "@uppy/react";
import Image from "next/image";
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";
import { useEffect } from "react";
import { useRouter } from "next/router";

var isFileUploaded = false;
const uppy = new Uppy({
  allowMultipleUploads: false,
}).use(XHRUpload, {
  endpoint: "http://127.0.0.1:8000/summarization/upload_file", // TODO: Update to our upload endpoint
});

function UploadFilePage() {
  const router = useRouter();

  useEffect(() => {
    uppy.on("complete", handleUploadComplete);
  }, []);

  async function handleUploadComplete(result) {
    console.log(
      "Upload complete! We've uploaded these files:",
      result.successful
    );
    if (!isFileUploaded) {
      isFileUploaded = true;
      // Redirect to SummaryPage
      router.push("/summary");
    }
  }

  return (
    <div className="px-10 py-10 flex items-start">
      <div className="container">
        <span className="appName">
          <Image
            src="/enabled-logo.svg"
            width={300}
            height={100}
            alt="enabled logo"
          />
          <h4 className="subAppName">Summarization app</h4>
        </span>
        <h3 className="font-sans text-xl font-bold">
          Put here the PDF file you want to summarize.
        </h3>
        <Dashboard proudlyDisplayPoweredByUppy={false} uppy={uppy} />
      </div>
    </div>
  );
}

export default UploadFilePage;
