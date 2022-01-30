import React, {useState} from 'react';
import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import LanguageIcon from '@material-ui/icons/Language';

const App = () => {

  const [val, setVal] = useState('In the name of God, The Most Gracious, The Dispenser of Grace:');
  const [snum, setSnum] = useState(1);
  const [num, setNum] = useState(1);
  const [lang, setlang] = useState('en.asad');

  var min = 1;
  var max = 6236;

  var tweetURL =`https://twitter.com/intent/tweet?text=${val} - ${snum}:${num} &hashtags=islamstatus360%20%23dailyquranverse`;
 

  function getRandomColor() {
    var letters = 'ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * letters.length)];
    }
    console.log(color);
    return color;
  }

  const getData = async () => {
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min; 
    const result = await fetch(`https://api.alquran.cloud/v1/ayah/${randomNumber}/${lang}`);
    const mainData = await result.json();
    console.log(result);
    setVal(mainData.data.text);
    setSnum(mainData.data.surah.number);
    setNum(mainData.data.numberInSurah);
    document.body.style.background = getRandomColor();
  }
  
  const getLanguage = () => {
    let val = lang;
    if(val === 'en.asad'){
      document.getElementById("text").style.direction = "rtl";
      document.getElementById("language-title").textContent = "Urdu ";
      setlang('ur.junagarhi');
    }else if(val === 'ur.junagarhi'){
      document.getElementById("text").style.direction = "rtl";
      document.getElementById("language-title").textContent = "Arabic ";
      setlang('ur');
    }else{
      document.getElementById("text").style.direction = "ltr";
      document.getElementById("language-title").textContent = "English ";
      setlang('en.asad');
    }
  }


  return (
    <>
      <div>
        <button className="btn btntxt  btn-outline-primary" onClick={getLanguage}>
          <span id='language-title'>English </span><LanguageIcon/>
        </button>
      </div>
      
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
