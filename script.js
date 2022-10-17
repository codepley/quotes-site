const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const quoteAuthor = document.getElementById("author");
const newQuoteBtn = document.getElementById("new-quote");
const tweetBtn = document.getElementById("twitter");
const loader = document.getElementById("loader")

let apiQuotes = [];

// Show Loading
function loading () {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading
function complete () {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

// Show new Quote
function newQuote() {
    loading();
    let x = Math.floor(Math.random()*apiQuotes.length);
    const quote = apiQuotes[x];

    if(!quote.author) {
        quoteAuthor.textContent = 'Unknown'
    }else{
        quoteAuthor.textContent = quote.author;
    }

    if(quote.text.length > 50){
        quoteText.classList.add('long-quote');
    }else{
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent = quote.text;
    complete();
}

// Get Quotes from API
async function getQuotes () {
    loading();
    const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
    try{
        const response = await fetch(apiUrl);
        apiQuotes = await response.json()
        newQuote();
    }catch(error) {

    }
}

// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Load
getQuotes();

// DOM Manipulation
newQuoteBtn.addEventListener('click', () => {
    newQuote();  
})

tweetBtn.addEventListener('click', () => {
    tweetQuote();
})