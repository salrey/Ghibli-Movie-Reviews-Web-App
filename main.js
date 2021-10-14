const BASE_URL = "https://ghibliapi.herokuapp.com/films/" 
const movieSelection = document.querySelector("#movie-selection")

fetch(BASE_URL)
    .then((response) => response.json())
    .then((movies) => {
        //check data
        // console.log(data[0])
        movies.forEach((movie) => {
            const option = document.createElement("option");
            option.value = movie.title
            //check option.value is formatted correctly
            // console.log(option.value) 
            option.textContent = movie.title
            movieSelection.append(option)

        })
        //Add event when an option is selected 
        movieSelection.addEventListener("change", (event) => {

            //remove/reset
            document.querySelector("#display-info").classList.remove("hidden")
            document.querySelector("#default-info p").classList.remove("error")
            document.querySelector("#default-info").classList.add("hidden")

            movies.forEach((movie) => {
                if (event.target.value === movie.title) {
                    if (!document.querySelector("#display-info h3")) {
                        let movieHeader = document.createElement("h3")
                        movieHeader.textContent = movie.title
                        let movieYear = document.createElement("div")
                        movieYear.textContent = movie.release_date
                        let movieDescription = document.createElement("p")
                        movieDescription.textContent = movie.description
                        //Manipulate DOM
                        document.querySelector("#display-info").append(movieHeader, movieYear, movieDescription)
                    } else {
                        document.querySelector("#display-info h3").textContent = movie.title 
                        document.querySelector("#display-info div").textContent = movie.release_date 
                        document.querySelector("#display-info p").textContent = movie.description 
                    }
                }
            })
        })
        
        //Add event when submitting a review  
        document.querySelector("form").addEventListener("submit", (event) => {
            event.preventDefault();
            
            const input = event.target["movie-review"].value
        
            //remove/reset old things 
            document.querySelector("#default-info p").classList.remove("error")
            document.querySelector("#default-reviews p").classList.remove("error")
            document.querySelector("#display-info").classList.add("hidden")
            document.querySelector("#default-info").classList.remove("hidden")
        
            if (!input) {
                document.querySelector("#default-reviews p").classList.add("error")
            } else {
                //reset/remove old things 
                document.querySelector("#default-info p").classList.remove("error")
                document.querySelector("#default-reviews p").classList.remove("error")
                document.querySelector("#default-reviews p").classList.add("hidden")

                const newReview = document.createElement("li")
                newReview.innerHTML = `<strong>${document.querySelector("#display-info h3").textContent}:</strong> ${input}` 
                document.querySelector("ul").append(newReview)
                
            }
            // reset twice to reset both dropdown and text input 
            event.target.reset();
            event.target.reset();
        })
    })
