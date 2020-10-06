const quoteContainer = document.getElementById("quote-container")
const quoteText = document.getElementById("quote-text")
const twitterIcon = document.getElementById("twitter")
const quote = document.getElementById("quote")
const author = document.getElementById("author")
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader")

function loading(){ 
  loader.hidden = false;
  quoteContainer.hidden = true;
 }

function complete(){ 
  if(!loader.hidden){ 
    quoteContainer.hidden = false
    loader.hidden= true
  }
}

async function getQuote(){
  loading()
      const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
      const apiUrl = 'https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
      try{
          const res = await fetch(proxyUrl+ apiUrl);
          const data = await res.json();
          (data.quoteAuthor === '')?author.innerText = 'Unknown' :author.innerText =data.quoteAuthor;

          quote.innerText = data.quoteText;
          (data.quoteText > 50)? quoteText.classList.add("long-quote"): quoteText.classList.remove('long-quote');
          

      }catch(error){
        
      }

      function tweetQuote(){
        const quote1 = quote.innerText;
        
        const author1 = author.innerText;
       
        const twitterUrl = `https://twitter.com/intent/tweet?text=${quote1} - ${author1}`
        window.open(twitterUrl, '_blank')
      }

      newQuoteBtn.addEventListener('click', getQuote);
      twitterIcon.addEventListener('click', tweetQuote);
 complete()
};

getQuote()
