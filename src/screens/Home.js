// src/FormPage.js
import React, { useState } from 'react';
import { postToApi } from '../api';
import '../styles/Home.css'; // Import the CSS styles

const Home = () => {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [input3, setInput3] = useState('');
  const [input4, setInput4] = useState('');
  const [predictedLabel, setPredictedLabel] = useState(null);

  const [response, setResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const payload = {
        'data':[[
            input1,input2,input3,input4
        ]]
      };

      console.log("paylaod=>",payload )
      const apiResponse = await postToApi(payload);

      console.log('Api=>',apiResponse["predictions"][0]["predicted_label"])

        // Assuming the API response contains the 'predictions' array
        if (apiResponse.predictions && apiResponse.predictions.length > 0) {
            // Get the first prediction and its predicted_label
            const firstPrediction = apiResponse.predictions[0];
            setPredictedLabel(firstPrediction.predicted_label); // Extract and set the predicted_label
          }

      setResponse(apiResponse);

    } catch (error) {
      console.error('Error:', error);
      setResponse({ error: 'Something went wrong. Please try again later.' });
    }
  };

  return (
    <div className="form-container">
      <h2>Form Page</h2>
      <form onSubmit={(handleSubmit)}>
        <div className="form-group">
          <label>Left-weight:</label>
          <input type="text" value={input1} onChange={(e) => setInput1(e.target.value)} />
        </div>
        <div className="form-group">
          <label>left-distance</label>
          <input type="text" value={input2} onChange={(e) => setInput2(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Right-weight</label>
          <input type="text" value={input3} onChange={(e) => setInput3(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Right-distance</label>
          <input type="text" value={input4} onChange={(e) => setInput4(e.target.value)} />
        </div>
        <button className="submit-button" type="submit">Submit</button>
      </form>

      {predictedLabel !== null && (
        <div>
          <h3>Predicted Label:</h3>
          <p>{predictedLabel}</p> {/* Display the predicted_label */}
        </div>
      )}
    </div>
  );
};

export default Home;
