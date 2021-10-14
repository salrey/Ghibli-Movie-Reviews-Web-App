const BASE_URL = "https://ghibliapi.herokuapp.com/films/" 
const movieSelection = document.querySelector("#movie-selection")

fetch(BASE_URL)
    .then((response) => response.json())
    .then((movies) => {
        //check data
        // console.log(data[0])
        movies.forEach((movie) => {
            const option = document.createElement("option");
            option.value = movie.title.split(" ").join("-").toLowerCase().replace("'", "") 
            //check option.value is formatted correctly
            // console.log(option.value) 
            option.textContent = movie.title
            movieSelection.append(option)

        })
        //Add event when an option is selected 
        const options = document.querySelectorAll("option")
        options.forEach((option) => {
            option.addEventListener("click", () => {
                
                //movie found
                const found = movies.find((movie) => movie.title === option.textContent)
                //test will not run properly if checking for default option
                // if (movieSelection.value === "default") {
                //     //remove/reset 
                //     document.querySelector("#display-info").classList.add("hidden")

                //     document.querySelector("form p").classList.add("error")
                //     document.querySelector("#default-info").classList.remove("hidden")
                // } else {}

                    //remove/reset
                    document.querySelector("#display-info").classList.remove("hidden")
                    document.querySelector("#default-info p").classList.remove("error")
                    document.querySelector("#default-info").classList.add("hidden")

    
                    if (!document.querySelector("#display-info h3")) {
                        let movieHeader = document.createElement("h3")
                        movieHeader.textContent = found.title
                        let movieYear = document.createElement("div")
                        movieYear.textContent = found.release_date
                        let movieDescription = document.createElement("p")
                        movieDescription.textContent = found.description
                        //Manipulate DOM
                        document.querySelector("#display-info").append(movieHeader, movieYear, movieDescription)
                    } else {
                        document.querySelector("#display-info h3").textContent = found.title 
                        document.querySelector("#display-info div").textContent = found.release_date 
                        document.querySelector("#display-info p").textContent = found.description 
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
        
            // if (!document.querySelector("#display-info h3")) {
            //     document.querySelector("#default-info").classList.remove("hidden")
            // }
        
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
