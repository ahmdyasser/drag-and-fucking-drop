import React, { useState } from 'react';

function QuestionAndAnswer() {
  const [inputText, setInputText] = useState('');
  const [responseText, setResponseText] = useState('');

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleButtonClick = async () => {
    console.log(inputText)
    await fetch(`http://127.0.0.1:8000/summarization/get_answer/${inputText}`)
      .then((response) => response.json())
      .then((data) => {
        setResponseText(data.answer);
        // TODO: Dispaly the URLs returned in data.sources
      })
  };

  return (
    <div>
      <input className='border-black border-md border-2' type="text" value={inputText} onChange={handleInputChange} />
      <button className='rounded-md bg-black p-2 text-white' onClick={handleButtonClick}>
        Send
      </button>
      <div>{responseText}</div>
    </div>
  );
}

export default QuestionAndAnswer;
