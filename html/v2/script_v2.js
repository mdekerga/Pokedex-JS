function pad(num, size) {
    let s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
}

document.addEventListener('DOMContentLoaded', function() {
    let pokemonsPerPage = 25;
    let currentPage = 1;

    function displayPokemons(page) {
        let tbody = document.querySelector('tbody');
        tbody.innerHTML = '';
    
        let start = (page - 1) * pokemonsPerPage;
        let end = start + pokemonsPerPage;
        let pokemonsToShow = pokemons
            .filter(pokemon => pokemon.form === 'Normal') 
            .slice(start, end);
    
        pokemonsToShow.forEach(pokemon => {
            let poke_gen = 0;
            let type = "";
            pokemon_type.forEach(pok => {
                if (pokemon.pokemon_id == pok.pokemon_id) {
                    type = pok.type.join(', ');
                }
            });
    
            generations.forEach(generation => {
                for (let gen in generation) {
                    generation[gen].forEach(poke => {
                        if(poke.id == pokemon.pokemon_id){
                            poke_gen = poke.generation_number
                        }
                    });
                }
            });
		
			let types = getTypeString(pokemon.pokemon_id);
            let typeCells = types.map(type => `<a class="${type} type">${type}</a>`).join('');
    
            let row = document.createElement('tr');
            row.innerHTML = `
                <td>${pokemon.pokemon_id}</td>
                <td>${pokemon.pokemon_name}</td>
                <td>${poke_gen}</td>
                <td class="pokemon_type">${typeCells}</td>
                <td>${pokemon.base_attack}</td>
                <td>${pokemon.base_defense}</td>
                <td>${pokemon.base_stamina}</td>
                <td><img src="../webp/images/${pad(pokemon.pokemon_id, 3)}.webp" class="image_pokemon" alt="${pokemon.pokemon_name}"></td>
            `;
            tbody.appendChild(row);
        });
    

        updatePageInfo();
    }


    function updatePageInfo() {
        let pageInfo = document.querySelector('#pageInfo');
        let totalPages = Math.ceil(898 / pokemonsPerPage);
        pageInfo.textContent = `${currentPage} / ${totalPages}`;


        let prevButton = document.querySelector('#prevButton');
        let nextButton = document.querySelector('#nextButton');

        prevButton.disabled = currentPage === 1;
        nextButton.disabled = currentPage === totalPages;
    }

	 function getTypeString(pokemonId) {
        let types = [];
        pokemon_type.forEach(pokemon => {
            if (pokemon.pokemon_id == pokemonId) {
                types = pokemon.type;
            }
        });
        return types;
    }



    document.querySelector('#prevButton').addEventListener('click', function() {
        if (currentPage > 1) {
            currentPage--;
            displayPokemons(currentPage);
            document.getElementById('logo').scrollIntoView({
				behavior: 'smooth',
				block: 'start' // 
			});
        }
    });

    document.querySelector('#nextButton').addEventListener('click', function() {
        let totalPages = Math.ceil(898 / pokemonsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            displayPokemons(currentPage);
            document.getElementById('logo').scrollIntoView({
				behavior: 'smooth',
				block: 'start' // 
			});
        }
    });


    displayPokemons(currentPage);
});
