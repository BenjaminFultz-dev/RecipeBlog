const favoriteButton = document.querySelector('#favorite-button');

favoriteButton.addEventListener('submit', addFavorite); 



async function addFavorite(e) {
    e.preventDefault()
    try {
        const response = await fetch('/recipe/favorites/add', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                recipeId: e.target.elements['id'].value
                
            })
        })
        console.log(e.target.elements['id'].value);
        const data = await response.json()
        console.log(data)
    } catch(error) {
        console.log(error)
    
    }
    location.reload()
}