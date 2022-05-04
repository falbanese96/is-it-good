const userInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const video = document.getElementById('trailer');
const reviews = document.getElementById('reviews');

// const video = document.getElementById('youtube-video');
const videoLink = document.getElementById('youtube-link');

function getSearchResult() {
    const searchAPI = 'https://api.themoviedb.org/3/search/movie?api_key=1bc4ec58dc00c942690743be433f730d&language=en-US&query='+userInput.value+'&page=1&include_adult=false';
    
        fetch(searchAPI)
        .then((result) => {
            return(result.json())
        }).then((data)=> {
            renderMovieInfo(data)
            let title = data.results[0].title;
            const movieTitle = document.createElement('h2');
            movieTitle.textContent = title;
            video.appendChild(movieTitle);
        })
}

function renderMovieInfo(data) {
    const movieData = data;
    console.log(movieData);
    const movieID = movieData.results[0].id
    
    const tmdbVideoAPI = 'https://api.themoviedb.org/3/movie/'+movieID+'/videos?api_key=1bc4ec58dc00c942690743be433f730d&language=en-US'
    const tmdbReviewAPI = 'https://api.themoviedb.org/3/movie/'+movieID+'/reviews?api_key=1bc4ec58dc00c942690743be433f730d&language=en-US&page=1'

    fetch(tmdbVideoAPI)
        .then((result) => {
            return(result.json())
        }).then((data)=> {
            console.log(data);
            renderVideo(data);
        })

        fetch(tmdbReviewAPI)
        .then((result) => {
            return(result.json())
        }).then((data)=> {
            console.log(data);
            reviews.innerHTML = '';
            for (i=0; i < data.results.length; i++){
                let author =  document.createElement('p');
                author.textContent = data.results[i].author;
                let review = document.createElement('p');
                review.textContent = data.results[i].content;
                reviews.append(author, review);
            }
            
        })     

}

function renderVideo(data) {
    const videoData = data;
    console.log(videoData);
    const youtubeID = videoData.results[0].key;
    const title = videoData.results[0].title;

    const movieTitle = document.createElement('h2');
    movieTitle.textContent = title;
    


    const youtubeAPI = 'https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id='+youtubeID+'&key=AIzaSyBD_G6CwLIRwiOxUT6JVCwO5OLihLFTzN8'
        fetch(youtubeAPI)
        .then((result) => {
            return(result.json())
        }).then((data)=> {
            console.log(data)
            const thumbImg = document.createElement('img');
            thumbImg.setAttribute('src', data.items[0].snippet.thumbnails.default.url);

            
            const vidLink = document.createElement('a')
            vidLink.setAttribute('href','https://youtube.com/watch?v=' + data.items[0].id);
            vidLink.innerHTML = 'Watch on Youtube!';

            
            
            const vid = data.items[0].snippet.title;
            const vidTitle = document.createElement('h4');
            vidTitle.textContent = vid;
            video.append(vidTitle, thumbImg, vidLink)
    })
}

function handleSearchSubmit(event) {
    event.preventDefault();

    if (!userInput) {
        alert(response.message)
    }
    getSearchResult();
}

searchBtn.addEventListener('click', handleSearchSubmit);