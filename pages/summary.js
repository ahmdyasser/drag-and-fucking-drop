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
    let response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const jsonResponse = await response.json();
    setSummarizedTextArray(jsonResponse.summary);
    setIsLoading(false);
  }

  async function getFile() {
    let url = "http://127.0.0.1:8000/summarization/get_file";
    let response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

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
    <div className="px-10 py-10 flex items-start">
      <div className="container">
        <ul>
          {summarizedTextArray.map((item, index) => (
            <li key={index}>
              <span>- {item}</span>
            </li>
          ))}
        </ul>
        {isLoading ? (
          <div>
            <ReactLoading
              className="reactLoading"
              color={"black"}
              height={50}
              width={100}
            />
            <p>Generating summary...</p>
          </div>
        ) : null}
      </div>
      <QuestionAndAnswer />
    </div>
  );
}
