const myKey = "6b960d67"
const searchInput = document.getElementById("search-input")
const searchBtn = document.getElementById("search-btn")
const filmList = document.getElementById("film-list")
const movieContainer = document.getElementById("movie-description")

if(!localStorage.getItem("watchlist")){
  localStorage.setItem("watchlist", JSON.stringify([]))
}


searchBtn.addEventListener("click", getMovieList)



async function getMovieList() {   
    
  try {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${myKey}&s=${searchInput.value}`);
    const data = await response.json();

    if (data.Response === "True") {
      
      const detailedMovies = await Promise.all(
        data.Search.map(async (movie) => {
          const detailsResponse = await fetch(`https://www.omdbapi.com/?apikey=${myKey}&i=${movie.imdbID}&plot=short`);
          const detailsData = await detailsResponse.json();
          
          return detailsData;
        })
        
      );
      
  

      
      const movieHtml = detailedMovies.map(movie => {
        return `
        
        <div class="movie-layout">
        
    <div>
        
        <img src="${movie.Poster}" class="movie-poster">
    
    </div>
        
    
    <div class="movie-description">
    
        <div class="movie-title-rating">
        <h3>${movie.Title}</h3>
        <p><span>⭐</span> ${movie.imdbRating}</p>
        </div>
        
        <div class="movie-duration-button">
        <p>${movie.Runtime}</p>
        <p>${movie.Genre}</p>
        <a data-watchlist=${movie.imdbID}><i class="fa-solid fa-square-plus"></i>Watchlist</a>
        
        
        </div>
        
        <div class="movie-plot">
        <p>${movie.Plot}</p>
        </div>
        
    </div>
    </div>
    `
      }).join("")
      
      filmList.innerHTML = movieHtml
      
    } else {
      console.error("No results found:", data.Error);
    }
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

document.addEventListener("click", function(e){
  if(e.target.dataset.watchlist){
     fetch(`https://www.omdbapi.com/?apikey=${myKey}&i=${e.target.dataset.watchlist}`)
     .then(res => res.json())
     .then(data => {
      const savedMovie = data
      
      let watchlist = JSON.parse(localStorage.getItem("watchlist"))
      
      watchlist.push(savedMovie)
      
      localStorage.setItem("watchlist", JSON.stringify(watchlist))
      
      
     })
  }
})



