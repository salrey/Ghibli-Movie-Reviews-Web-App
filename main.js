const BASE_URL = "https://ghibliapi.herokuapp.com/films/" 

const movieSelection = document.querySelector("#movie-selection")
const defaultInfo = document.querySelector("#default-info")
const displayInfo = document.querySelector("#display-info")
const defaultReviews = document.querySelector("#default-reviews")
const displayReviews = document.querySelector("#display-reviews")

fetch(BASE_URL)
    .then((response) => response.json())
    .then((movies) => {

        //create dropdown menu
        movies.forEach((movie) => {
            const option = document.createElement("option");
            option.value = movie.title
            option.textContent = movie.title
            movieSelection.append(option)

            //set defaultInfo to first option
            if (movieSelection.value === movie.title) {
                const [h4, div, p] = defaultInfo.children
                h4.textContent = movie.title
                div.textContent = movie.release_date
                p.textContent = movie.description
            }

        })    

        //Add event when selection is changed 
        movieSelection.addEventListener("change", () => {

            //Switch to displayInfo
            defaultInfo.classList.add("hidden")  
            displayInfo.classList.remove("hidden")  
            
            movies.forEach((movie) => {
                if (movieSelection.value === movie.title) {
                    const [h4, div, p] = displayInfo.children
                    h4.textContent = movie.title
                    div.textContent = movie.release_date
                    p.textContent = movie.description
                }
            })
        })
        
        //Add event when submitting a review  
        document.querySelector("form").addEventListener("submit", (event) => {
            event.preventDefault();

            //reset to displayInfo
            defaultInfo.classList.remove("hidden")  
            displayInfo.classList.add("hidden") 
            
            const input = event.target["movie-review"].value

            if (!input) {
                defaultReviews.children[0].classList.add("error")
                defaultReviews.children[0].classList.remove("hidden")  
            } 

            let isDuplicate = false
            document.querySelectorAll("#display-reviews li").forEach((list) => {
                if (list.textContent.includes(movieSelection.value)) {
                    defaultReviews.children[0].classList.add("error")
                    defaultReviews.children[0].classList.remove("hidden")
                    isDuplicate = true
                } 
            })
            
            //Add new review
            if (input && !isDuplicate) {

                defaultReviews.children[0].classList.add("hidden")
                defaultReviews.children[0].classList.remove("error")
            
                const newReview = document.createElement("li")
                const strongTitle = document.createElement("strong")
                newReview.textContent = input
                strongTitle.textContent = `${movieSelection.value}: `

                newReview.prepend(strongTitle) 
                displayReviews.children[0].append(newReview)
            }

            //Add event to remove review
            document.querySelectorAll("li").forEach((list) => {
                list.addEventListener("click", () => {
                    list.remove();
                    if (document.querySelectorAll("li").length === 0) {
                        defaultReviews.children[0].classList.remove("hidden")
                    } 
                })
            })

            // reset twice to reset both dropdown and text input 
            event.target.reset();
            event.target.reset();
        })
    })
