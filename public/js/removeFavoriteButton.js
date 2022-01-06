const removeFavoriteButton = document.querySelector('#remove-favorite-button');

if (removeFavoriteButton) {
    removeFavoriteButton.addEventListener('submit', removeFavorite); 
}


async function removeFavorite(e) {
    e.preventDefault()
    try {
        const response = await fetch('/recipe/favorites', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                recipeId: e.target.elements['id'].value    
            })
        })
        const data = await response.json();
        console.log(data);
    } catch(error) {
        console.log(error);
    
    }
    location.reload();
}