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
    <div>
      <input className='border-black border-md border-2' type="text" value={inputText} onChange={handleInputChange} />
      <button className='rounded-md bg-black p-2 text-white' onClick={handleButtonClick}>
        Send
      </button>
      {isLoading ? (
        <ReactLoading className='reactLoading' color={'black'} height={50} width={100} />
      ) : (
        <div>{responseText}</div>
      )}
    </div>
  );
}

export default QuestionAndAnswer;
