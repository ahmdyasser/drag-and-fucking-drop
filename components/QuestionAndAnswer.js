import React, { useState } from 'react';
import ReactLoading from 'react-loading';

function QuestionAndAnswer() {
  const [inputText, setInputText] = useState('');
  const [responseText, setResponseText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleButtonClick = async () => {
    setIsLoading(true);
    await fetch(`http://127.0.0.1:8000/summarization/get_answer/${inputText}`)
      .then((response) => response.json())
      .then((data) => {
        setResponseText(data.answer);
        // TODO: Display the URLs returned in data.sources
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className='flex flex-col items-center'>
      <div className='flex flex-row items-center'>
        <input className='border-black border-md h-10 border-2' type="text" value={inputText} onChange={handleInputChange} />
        <button className='rounded-md bg-black p-2 text-white' onClick={handleButtonClick}>
          Send
        </button>
      </div>
      {isLoading ? (
        <ReactLoading className='reactLoading' color={'black'} />
      ) : (
        <div>{responseText}</div>
      )}
    </div>
  );
}

export default QuestionAndAnswer;
