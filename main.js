const movieSelection = document.querySelector("#movie-selection")

fetch("https://ghibliapi.herokuapp.com/films/")
    .then((response) => response.json())
    .then((data) => {
        //check data
        // console.log(data[0])
        data.forEach((movie) => {
            const option = document.createElement("option");
            option.value = movie.title.split(" ").join("-").toLowerCase().replace("'", "") 
            //check option.value is formatted correctly
            // console.log(option.value) 
            option.textContent = movie.title
            movieSelection.append(option)
        })
    })

document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();
    
    const input = event.target["movie-review"].value

    //remove/reset old things 
    document.querySelector("form p").classList.remove("error")
    document.querySelector("#default-reviews p").classList.remove("error")
    // document.querySelector("#display-info article").remove() 
    document.querySelector("#default-info").classList.remove("hidden")

    if (movieSelection.value === "default") {
        document.querySelector("form p").classList.add("error")
    } else if (!input) {
        document.querySelector("#default-reviews p").classList.add("error")
    } else {
        //reset/remove old things 
        document.querySelector("form p").classList.remove("error")
        document.querySelector("#default-reviews p").classList.remove("error")
        // fetch()
    }
    
    //reset twice to reset both dropdown and text input 
    event.target.reset();
    event.target.reset();
})