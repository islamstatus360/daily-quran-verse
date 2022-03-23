import React, { useState } from 'react';
import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import LanguageIcon from '@material-ui/icons/Language';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import html2canvas from 'html2canvas';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';

const App = () => {

  const exportAsPicture = () => {
    const html = document.getElementsByTagName('HTML')[0];
    const body =  document.getElementsByTagName('BODY')[0];
    let htmlWidth = html.clientWidth;
    let bodyWidth = body.clientWidth;

    const data = document.getElementById('screen')
    const newWidth = data.scrollWidth - data.clientWidth


    if (newWidth > data.clientWidth){
        htmlWidth += newWidth
        bodyWidth += newWidth
    }

    html.style.width = htmlWidth + 'px'
    body.style.width = bodyWidth + 'px'

    html2canvas(data).then((canvas)=>{
        return canvas.toDataURL('image/png', 1.0)
    }).then((image)=>{
        saveAs(image, `daily-quran-verse-[${snum}-${num}].png`);
        html.style.width = null
        body.style.width = null
    })
}

const saveAs = (blob, fileName) =>{
    const elem = window.document.createElement('a');
    elem.href = blob
    elem.download = fileName;
    (document.body || document.documentElement).appendChild(elem);
    if (typeof elem.click === 'function') {
        elem.click();
    } else {
        elem.target = '_blank';
        elem.dispatchEvent(new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true
        }));
    }
    URL.revokeObjectURL(elem.href);
    elem.remove()
}

  const [val, setVal] = useState('In the name of God, The Most Gracious, The Dispenser of Grace:');
  const [snum, setSnum] = useState(1);
  const [num, setNum] = useState(1);
  const [lang, setlang] = useState('en.asad');

  var min = 1;
  var max = 6236;

  var tweetURL =`https://twitter.com/intent/tweet?text=${val} - ${snum}:${num} &hashtags=islamstatus360%20%23dailyquranverse`;
  var facebookURL =`https://www.facebook.com/sharer/sharer.php?text=${val} - ${snum}:${num} &hashtags=islamstatus360%20%23dailyquranverse`;
  var whatsappURL =`https://api.whatsapp.com/send?text=${val} - ${snum}:${num} &hashtags=islamstatus360%20%23dailyquranverse data-action="share/whatsapp/share`;
 
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
    getData();
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
      <div className='btntxt'>
        <FullscreenIcon id="shot" onClick={exportAsPicture} />
        <button className="btn btn-outline-primary" onClick={getLanguage}>
          <span id='language-title'>English </span><LanguageIcon/>
        </button>
      </div>

      <div id="screen" className="wrapper d-flex align-items-center justify-content-center">
        {/* <div id='screen-box'> */}
            <div className="col-6 box p-4 mt-0 rounded" id="quote-box">
                    <div className="mb-4">
                        <p id="text" className="quote"><strong><i className="fas fa-quote-left fa-2x"></i>{val}</strong></p>
                        
                        <div className = "writer" >
                          <cite className="d-block text-center author" id="author" >
                            <h2>[{snum}:{num}]</h2>
                          </cite>
                        </div>                        
                    </div>

                <div className="d-flex justify-content-between">
                  <div className='d-flex icons'>
                    <a href={tweetURL} target="_blank"><TwitterIcon className='icon'/></a>
                    <a href={whatsappURL} target="_blank"><WhatsAppIcon className='icon'/></a>
                    <a href={facebookURL} target="_blank"><FacebookIcon className='icon'/></a>
                  </div>
                    <button className="btn  btn-outline-primary" onClick={getData} id="new-quote">
                      Get Next
                    </button>
                </div>
            </div>
       </div>
       {/* </div> */}
    </>
  );
}

export default App;