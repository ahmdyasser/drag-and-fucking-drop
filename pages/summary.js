import { useState, useEffect, useRef } from "react";
import ReactLoading from "react-loading";
import QuestionAndAnswer from "../components/QuestionAndAnswer";

export default function SummaryPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [summarizedTextArray, setSummarizedTextArray] = useState([]);
  const hasRequestedSummaryRef = useRef(false);
  const iframeRef = useRef(null);

  useEffect(() => {
    if (!hasRequestedSummaryRef.current) {
      hasRequestedSummaryRef.current = true;
      setIsLoading(true);
      getFile();
      getSummarization();
    }

    return () => {
      // Cleanup function: remove the iframe when unmounting the component
      if (iframeRef.current) {
        document.body.removeChild(iframeRef.current);
      }
    };
  }, []);

  async function getSummarization() {
    let url = "http://127.0.0.1:8000/summarization/summarize";
    let response = await fetch(url);
    const jsonResponse = await response.json();
    setSummarizedTextArray(jsonResponse.summary);
    setIsLoading(false);
  }

  async function getFile() {
    let url = "http://127.0.0.1:8000/summarization/get_file";
    let response = await fetch(url);
    if (response.ok) {
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const iframe = document.createElement("iframe");
      iframe.src = url;
      iframe.width = "50%";
      iframe.height = "500px";
      document.body.appendChild(iframe);
      iframeRef.current = iframe;
    }
  }

  return (
    <div className='flex flex-col items-center py-10 px-30 bg-indigo-500'>
      <ul className='px-30'>
        {summarizedTextArray.map((item, index) => (
          <li key={index}>
            <span>- {item}</span>
          </li>
        ))}
      </ul>
      {isLoading ? (
        <div className='flex flex-col items-center'>
          <p className='text-l font-sans font-bold'
          >Generating summary...</p>
          <ReactLoading
            className="reactLoading"
            color={"black"}
          />
        </div>
      ) : null}
      <QuestionAndAnswer />
    </div>
  );
}
