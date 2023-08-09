//variables
const GeneralBtn = document.getElementById("General");
const businessBtn = document.getElementById("business");
const sportsBtn = document.getElementById("sports");
const entertainmentBtn = document.getElementById("entertainment");
const technologyBtn = document.getElementById("technology");
const searchBtn = document.getElementById("search");
const newsQuery = document.getElementById("newsQuery");
const newstype = document.getElementById("newstype");
const newsdetails = document.getElementById("newsdetails");

//ARRAY
var newsDataArr = [];

//API
const API_KEYS = "501e11e71738468ebc2a14a9a03de47b";
const GENERAL_NEWS = "https://newsapi.org/v2/top-headlines?country=in&apiKey=501e11e71738468ebc2a14a9a03de47b";
const BUSINESS_NEWS = "https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=501e11e71738468ebc2a14a9a03de47b";
const SPORTS_NEWS = "https://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey=501e11e71738468ebc2a14a9a03de47b";
const ENTERTAINMENT_NEWS = "https://newsapi.org/v2/top-headlines?country=in&category=entertainment&apiKey=501e11e71738468ebc2a14a9a03de47b";
const TECHNOLOGY_NEWS = "https://newsapi.org/v2/top-headlines?country=in&category=technology&apiKey=501e11e71738468ebc2a14a9a03de47b";
const SEARCH_NEWS = "https://newsapi.org/v2/everything?q=";

window.onload = function() {
    newstype.innerHTML="<h4>Headlines</h4>";
    fetchGeneralNews();
};


GeneralBtn.addEventListener("click",function(){
    newstype.innerHTML="<h4>Headlines</h4>";
    fetchGeneralNews();

});

businessBtn.addEventListener("click",function(){
    newstype.innerHTML="<h4>Business</h4>";
    fetchBusinessNews();

});

sportsBtn.addEventListener("click",function(){
    newstype.innerHTML="<h4>Sports</h4>";
    fetchSportsNews();

});

entertainmentBtn.addEventListener("click",function(){
    newstype.innerHTML="<h4>Entertainment</h4>";
    fetchEntertainmentNews();

});

technologyBtn.addEventListener("click",function(){
    newstype.innerHTML="<h4>Technology</h4>";
    fetchTechnologyNews();

});

searchBtn.addEventListener("click",function(){
    newstype.innerHTML="<h4>Search : "+newsQuery.value+"</h4>";
    fetchQueryNews();

});


const fetchGeneralNews = async () => {
    const response = await fetch(GENERAL_NEWS);
    newsDataArr = [];
    if(response.status >=200 && response.status <300){
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    }else {
        //handle errors
        console.log(response.status, response.statusText);
    }

    displayNews();
}
const fetchBusinessNews = async () => {
    const response = await fetch(BUSINESS_NEWS);
    newsDataArr = [];
    if(response.status >=200 && response.status <300){
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    }else {
        //handle errors
        console.log(response.status, response.statusText);
    }

    displayNews();
}
const fetchSportsNews = async () => {
    const response = await fetch(SPORTS_NEWS);
    newsDataArr = [];
    if(response.status >=200 && response.status <300){
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    }else {
        //handle errors
        console.log(response.status, response.statusText);
    }

    displayNews();
}
const fetchEntertainmentNews = async () => {
    const response = await fetch(ENTERTAINMENT_NEWS);
    newsDataArr = [];
    if(response.status >=200 && response.status <300){
        const myJson = await response.json();
        console.log(myJson);
        newsDataArr = myJson.articles;
    }else {
        //handle errors
        console.log(response.status, response.statusText);
    }

    displayNews();
}
const fetchTechnologyNews = async () => {
    const response = await fetch(TECHNOLOGY_NEWS);
    newsDataArr = [];
    if(response.status >=200 && response.status <300){
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    }else {
        //handle errors
        console.log(response.status, response.statusText);
    }

    displayNews();
}
const fetchQueryNews = async () => {
    
    if(newsQuery.value == null)
        return;

    const response = await fetch(SEARCH_NEWS+encodeURIComponent(newsQuery.value)+"&apikey="+API_KEYS);
    newsDataArr = [];
    if(response.status >=200 && response.status <300){
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    }else {
        //handle errors
        console.log(response.status, response.statusText);
    }

    displayNews();
}

function displayNews() {

    newsdetails.innerHTML = "";

    if(newsDataArr.length == 0){
        newsdetails.innerHTML = "<h5>No data found.</h5>"
        return;
    }
    
    newsDataArr.forEach(news => {

        var date = news.publishedAt.split("T");
        
        var col = document.createElement('div');
        col.className="col-sm-12 col-md-4 col-lg-3 p-2 card";

        var card = document.createElement('div');
        card.className = "p-2";

        var image = document.createElement('img');
        image.setAttribute("height","matchparnt");
        image.setAttribute("width", "100%");
        image.src=news.urlToImage;
        
        var cardbody = document.createElement('div');

        var newsHeading = document.createElement('h5');
        newsHeading.className = "card-title";
        newsHeading.innerHTML = news.title;

        var dateHeading = document.createElement('h6');
        dateHeading.className = "text-primary";
        dateHeading.innerHTML = date[0];

        var description = document.createElement('p');
        description.className="text-muted";
        description.innerHTML = news.description;

        var link = document.createElement('a');
        link.className="btn btn-dark";
        link.setAttribute("target", "_blank");
        link.href = news.url;
        link.innerHTML="Read more";

        cardbody.appendChild(newsHeading);
        cardbody.appendChild(dateHeading);
        cardbody.appendChild(description);
        cardbody.appendChild(link);

        card.appendChild(image);
        card.appendChild(cardbody);

        col.appendChild(card)

        newsdetails.appendChild(col);
    });
}