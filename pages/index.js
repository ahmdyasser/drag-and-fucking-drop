import Uppy from "@uppy/core";
import XHRUpload from "@uppy/xhr-upload";
import { Dashboard } from "@uppy/react";
import Image from "next/image";
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useState } from "react";

var isFileUploaded = false;

function Home() {
  const router = useRouter();
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const uppy = new Uppy({
    allowMultipleUploads: false,
  }).use(XHRUpload, {
    endpoint: "http://127.0.0.1:8000/summarization/upload_file", // TODO: Update to our upload endpoint
  });
  useEffect(() => {
    uppy.on("complete", handleUploadComplete);
  }, []);

  async function handleUploadComplete(result) {
    console.log(
      "Upload complete! We've uploaded these files:",
      result.successful
    );
    if (!isFileUploaded) {
      setIsFileUploaded(true);
      // Redirect to SummaryPage
      router.push("/summary");
    }
  }

  return (
      <div className="flex flex-col items-center bg-indigo-500 py-10">
          <Image
            src="/enabled-logo.svg"
            width={300}
            height={100}
            alt="enabled logo"
          />
          <p className="text-2xl font-sans font-bold  pb-20 pt-5">Summarization app</p>
        <p className="font-sans text-xl">
          Put here the PDF file you want to summarize.
        </p>
        <Dashboard proudlyDisplayPoweredByUppy={false} uppy={uppy} />
      </div>
  );
}

export default Home;
