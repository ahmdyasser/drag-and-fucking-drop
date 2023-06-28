import React, { useState } from 'react';

function QuestionAndAnswer() {
    const [inputText, setInputText] = useState('');
    const [responseText, setResponseText] = useState('');
  
    const handleInputChange = (event) => {
      setInputText(event.target.value);
    };
  
    const handleButtonClick = () => {
      fetch(`[BASE_URL]/get_answer?query=${inputText}`)
        .then((response) => response.json())
        .then((data) => {
          setResponseText(data.response);
        })
    };
  
    return (
      <div>
        <input type="text" value={inputText} onChange={handleInputChange} />
        <button class='rounded-full bg-cyan-600 p-2 text-white' onClick={handleButtonClick}>Send</button>
        <div>{responseText}</div>
      </div>
    );
  }

  export default QuestionAndAnswer;