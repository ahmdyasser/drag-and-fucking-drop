import { useState, useEffect, useRef } from "react";
import ReactLoading from "react-loading";
import QuestionAndAnswer from "../components/QuestionAndAnswer";

export default function SummaryPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [summarizedTextArray, setSummarizedTextArray] = useState([]);
  const hasRequestedSummaryRef = useRef(false);

  useEffect(() => {
    if (!hasRequestedSummaryRef.current) {
      hasRequestedSummaryRef.current = true;
      setIsLoading(true);
      getSummarization();
    }
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