const iconPlaceholder = document.getElementById("film-list-icon")
const headPlaceholder = document.getElementById("film-list-placeholder")



function getWatchlistHtml (){
    iconPlaceholder.classList.remove("fa-solid")
    iconPlaceholder.classList.remove("fa-film")
    iconPlaceholder.classList.add("hidden")
    headPlaceholder.classList.add("hidden")
    const watchlistMovies = JSON.parse(localStorage.getItem("watchlist"))
    const watchListHtml = watchlistMovies.map(movie => {
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
        <a data-watchlist=${movie.imdbID}><i class="fa-solid fa-square-plus"></i>Delete</a>
        
        
        </div>
        
        <div class="movie-plot">
        <p>${movie.Plot}</p>
        </div>
        
    </div>
    </div>`
        
    }).join("")
    
     document.getElementById("film-list").innerHTML = watchListHtml
}

getWatchlistHtml()

document.addEventListener("click", function(e){
    if(e.target.dataset.watchlist){
        let watchlist = JSON.parse(localStorage.getItem("watchlist"))
        
        watchlist = watchlist.filter(movie => movie.imdbID !== e.target.dataset.watchlist)
        
        localStorage.setItem("watchlist", JSON.stringify(watchlist))
        
        getWatchlistHtml()
    }
})