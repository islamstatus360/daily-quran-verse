import React, {useState} from 'react';
import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

const App = () => {

  const [val, setVal] = useState();
  const [snum, setSnum] = useState();
  const [num, setNum] = useState();

  

  var min = 1;
  var max = 6236;

  var tweetURL =`https://twitter.com/intent/tweet?text=${val} - ${snum}:${num} &hashtags=%23islamstatus360%20%23dailyquranverse`;

  const getData = async () => {
    var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min; 
    const result = await fetch(`https://api.alquran.cloud/v1/ayah/${randomNumber}/en.asad`);
    const mainData = await result.json();
    console.log(mainData);
    setVal(mainData.data.text);
    setSnum(mainData.data.surah.number);
    setNum(mainData.data.numberInSurah);
  }
  

  return (
    <>
      <div className="wrapper d-flex  align-items-center justify-content-center">
            <div className="col-6 box p-4 rounded" id="quote-box">
                    <div className="mb-4">
                        <p id="text" className="quote"><strong><i className="fas fa-quote-left fa-2x"></i>{val}</strong></p>
                        
                        <div className = "writer" >
                          <cite className="d-block text-center" id="author" className="author">
                            <h2>[{snum}:{num}]</h2>
                          </cite>
                        </div>                        
                    </div>
    
                <div className="d-flex justify-content-between buttons">
                    <a className="btn btn-primary" target="_blank" href={tweetURL} id="tweet-quote"><i className="fab fa-twitter"></i> Tweet</a>
                    <button className="btn  btn-outline-primary" onClick={getData} id="new-quote">
                      Get Next
                    </button>
                </div>
            </div>
       </div>
    </>
  );
}

export default App;
