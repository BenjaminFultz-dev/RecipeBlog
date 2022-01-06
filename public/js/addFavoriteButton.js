const favoriteButton = document.querySelector('#add-favorite-button');

if (favoriteButton) {
    favoriteButton.addEventListener('submit', addFavorite); 
}


async function addFavorite(e) {
    e.preventDefault()
    try {
        const response = await fetch('/recipe/favorites', {
            method: 'post',
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