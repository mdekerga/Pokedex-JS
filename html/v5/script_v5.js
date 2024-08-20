
let a1 = new Attack();
a1.import_attacks();

function pad(num, size) {
    let s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
}

function showLargeImage(pokemonId) {
		let largeImage = document.getElementById('largePokemonImage');
		largeImage.src = `../webp/images/${pad(pokemonId, 3)}.webp`;
		largeImage.style.display = 'block';
	}

	function hideLargeImage() {
		let largeImage = document.getElementById('largePokemonImage');
		largeImage.style.display = 'none';
	}


document.addEventListener('DOMContentLoaded', function() {
    let pokemonsPerPage = 25;
    let currentPage = 1;
    let currentSortCriteria = null;
    let sortAscending = true;




    function displayPokemons(page) {
        let tbody = document.querySelector('tbody');
        tbody.innerHTML = '';

        let start = (page - 1) * pokemonsPerPage;
        let end = start + pokemonsPerPage;
        let pokemonsToShow = filterPokemons(pokemons)
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
                        if (poke.id == pokemon.pokemon_id) {
                            poke_gen = poke.generation_number
                        }
                    });
                }
            });

            let row = document.createElement('tr');
            row.setAttribute('data-pokemon-id', pokemon.pokemon_id);

            let types = getTypeString(pokemon.pokemon_id);
            let typeCells = types.map(type => `<a class="${type} type">${type}</a>`).join('');

            row.innerHTML = `
                <td>${pokemon.pokemon_id}</td>
                <td>${pokemon.pokemon_name}</td>
                <td>${poke_gen}</td>
                <td class="pokemon_type">${typeCells}</td>
                <td>${pokemon.base_attack}</td>
                <td>${pokemon.base_defense}</td>
                <td>${pokemon.base_stamina}</td>
                <td>
        <img src="../webp/images/${pad(pokemon.pokemon_id, 3)}.webp" 
             class="image_pokemon" 
             alt="${pokemon.pokemon_name}" 
             onmouseover="showLargeImage(${pokemon.pokemon_id})" 
             onmouseout="hideLargeImage()">
    </td>
            `;
            tbody.appendChild(row);
        });

        updatePageInfo();
    }

	function sortBy(criteria) {

    document.querySelectorAll('.sortable').forEach(header => {
        header.classList.remove('sorted');
    });

    if (currentSortCriteria === criteria) {
        sortAscending = !sortAscending;
    } else {
        sortAscending = true;
        currentSortCriteria = criteria;
    }
    
    pokemons.sort((a, b) => {
        if (criteria === 'type') {
            let typeA = getTypeString(a.pokemon_id).join(', ');
            let typeB = getTypeString(b.pokemon_id).join(', ');
            if (typeA === typeB) {
                return a.pokemon_name.localeCompare(b.pokemon_name);
            } else {
                return sortAscending ? typeA.localeCompare(typeB) : typeB.localeCompare(typeA);
            }
        } else if (criteria === 'poke_gen') {
            let genA = getGenerationNumber(a.pokemon_id);
            let genB = getGenerationNumber(b.pokemon_id);
            if (genA === genB) {
                return a.pokemon_name.localeCompare(b.pokemon_name);
            } else {
                return sortAscending ? genA - genB : genB - genA;
            }
            }else if (criteria === 'pokemon_name') {
            if (sortAscending) {
                return a.pokemon_name.localeCompare(b.pokemon_name);
            } else {
                return b.pokemon_name.localeCompare(a.pokemon_name);
            }
        
        } else {
            if (a[currentSortCriteria] === b[currentSortCriteria]) {
                return a.pokemon_name.localeCompare(b.pokemon_name);
            } else {
                return sortAscending ? a[currentSortCriteria] - b[currentSortCriteria] : b[currentSortCriteria] - a[currentSortCriteria];
            }
        }
    });

    displayPokemons(currentPage);

    let sortedHeader = document.getElementById(criteria + 'Header');
    if (sortedHeader) {
        sortedHeader.classList.add('sorted');
    }
}

    document.getElementById('pokemon_idHeader').addEventListener('click', function() {
        sortBy('pokemon_id');
    });

    document.getElementById('pokemon_nameHeader').addEventListener('click', function() {
        sortBy('pokemon_name');
    });

    document.getElementById('poke_genHeader').addEventListener('click', function() {
        sortBy('poke_gen');
    });

    document.getElementById('typeHeader').addEventListener('click', function() {
        sortBy('type');
    });

    document.getElementById('base_attackHeader').addEventListener('click', function() {
        sortBy('base_attack');
    });

    document.getElementById('base_defenseHeader').addEventListener('click', function() {
        sortBy('base_defense');
    });

    document.getElementById('base_staminaHeader').addEventListener('click', function() {
        sortBy('base_stamina');
    });

    function getGenerationNumber(pokemonId) {
        let genNumber = 0;
        generations.forEach(generation => {
            for (let gen in generation) {
                generation[gen].forEach(poke => {
                    if (poke.id == pokemonId) {
                        genNumber = poke.generation_number
                    }
                });
            }
        });
        return genNumber;
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

	


    function filterPokemons(pokemons) {
        let generationFilter = document.getElementById('generation').value;
        let typeFilter = document.getElementById('type').value.toLowerCase();
        let nameFilter = document.getElementById('name').value.trim().toLowerCase();

        return pokemons.filter(pokemon => {
            let passesGeneration = !generationFilter || getGenerationNumber(pokemon.pokemon_id) === parseInt(generationFilter);
            let passesType = !typeFilter || getTypeString(pokemon.pokemon_id).join(', ').toLowerCase().includes(typeFilter);
            let passesName = !nameFilter || pokemon.pokemon_name.toLowerCase().includes(nameFilter);
            return passesGeneration && passesType && passesName && pokemon.form === 'Normal';
        });
    }


    function showPokemonDetails(pokemonId) {
        let pokemon = pokemons.find(pokemon => pokemon.pokemon_id == pokemonId && pokemon.form == 'Normal');
		
		let clickedPokemon = document.querySelector(`tr[data-pokemon-id="${pokemonId}"]`);

		
		let pokemonPosition = clickedPokemon.getBoundingClientRect();
		
		
        let detailsContent = `
        <div class="detail-section">
            <h2>#${pokemon.pokemon_id}</h2>
            <div class="nom-type">
            <h1>${pokemon.pokemon_name}</h2>
                <div class="type-section">
                    <div class="${getTypeString(pokemon.pokemon_id)[0]} type">${getTypeString(pokemon.pokemon_id)[0]}</div>
                    <div class="${getTypeString(pokemon.pokemon_id)[1]} type">${getTypeString(pokemon.pokemon_id)[1]}</div>
                </div>
            </div>
            <div class="info-pokemon">
                <img src="../webp/images/${pad(pokemon.pokemon_id, 3)}.webp" alt="${pokemon.pokemon_name}">
                <div class="stats-section">
                <h2>Stats</h2>
                    <p>Generation: ${getGenerationNumber(pokemon.pokemon_id)}</p>
                    <p>Base Attack: ${pokemon.base_attack}</p>
                    <p>Base Defense: ${pokemon.base_defense}</p>
                    <p>Base Stamina: ${pokemon.base_stamina}</p>
                </div>
            </div>
        </div>

        <div class="detail-section">
            <h2>Moves</h2>
            <div class="move-section">
                <div class="charged_moves">
                    <h3>Charged moves</h3> 
                    <table>
                        <thead>
                            <tr>
                                <td>MOVE</td>
                                <td>POWER</td>
                                <td>CRIT.CH</td>
                                <td>DURATION</td>
                                <td>ENERGY DELTA</td>
                                <td>TYPE</td>
                            </tr>
                        </thead>
                        <tbody>
                            ${getChargedString(pokemon.pokemon_id)}
                        </tbody>
                    </table>

                </div>
                <div class="fast_moves">
                    <h3>Fast moves</h3> 
                    <table>
                        <thead>
                            <tr>
                                <td>MOVE</td>
                                <td>POWER</td>
                                <td>DURATION</td>
                                <td>ENERGY DELTA</td>
                                <td>TYPE</td>
                            </tr>
                        </thead>
                        <tbody>
                            ${getFastString(pokemon.pokemon_id)}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;

        document.getElementById('detailsContent').innerHTML = detailsContent;

		let pokemonDetails = document.getElementById('pokemonDetails');
		pokemonDetails.style.top = pokemonPosition.top + 'px';
	
        pokemonDetails.style.display = 'flex';
        document.getElementById('overlay').style.display = "block";
        
        pokemonDetails.scrollIntoView({
				behavior: 'smooth',
				block: 'center' // 
			});
        
    }

    function hidePokemonDetails() {
        document.getElementById('pokemonDetails').style.display = 'none';
        document.getElementById('overlay').style.display = "none";
    }

    document.querySelector('tbody').addEventListener('click', function(event) {
        let clickedElement = event.target;
        console.log(clickedElement.tagName);
        if (clickedElement.tagName === 'TD') {
            let pokemonId = clickedElement.parentNode.getAttribute('data-pokemon-id');
            showPokemonDetails(pokemonId);
        }
    });

    document.getElementById('closeDetails').addEventListener('click', function() {
        hidePokemonDetails();
    });

    function updatePageInfo() {
        let pageInfo = document.querySelector('#pageInfo');
        let totalFilteredPokemons = filterPokemons(pokemons).length; 
        let totalPages = Math.ceil(totalFilteredPokemons / pokemonsPerPage); 
        pageInfo.textContent = `${currentPage} / ${totalPages}`;
    

        let prevButton = document.querySelector('#prevButton');
        let nextButton = document.querySelector('#nextButton');
    
        prevButton.disabled = currentPage === 1;
        nextButton.disabled = currentPage === totalPages;
    }
    
    function getChargedString(pokemonId) {
        let chargedMovesString = "";
        pokemon_move.forEach(pokemon => {
            if (pokemon.pokemon_id == pokemonId && pokemon.form == "Normal") {
                pokemon.charged_moves.forEach(moveName => {
                    let move = charged_moves.find(move => move.name === moveName);
                    if (move) {
                        chargedMovesString += `
                        <tr>
                            <td>${move.name}</td> 
                            <td>${move.power}</td> 
                            <td>${move.critical_chance}</td> 
                            <td>${move.duration}</td> 
                            <td>${move.energy_delta}</td> 
                            <td><a class="${move.type} type-detail">${move.type}</a></td>
                        </tr>`;
                    }
                });
            }
        });
        return chargedMovesString;
    }

    function getFastString(pokemonId) {
        let fastMovesString = "";
        pokemon_move.forEach(pokemon => {
            if (pokemon.pokemon_id == pokemonId && pokemon.form == "Normal") {
                pokemon.fast_moves.forEach(moveName => {
                    let move = fast_moves.find(move => move.name === moveName);
                    if (move) {
                        fastMovesString += `
                        <tr>
                            <td>${move.name}</td> 
                            <td>${move.power}</td> 
                            <td>${move.duration}</td> 
                            <td>${move.energy_delta}</td> 
                            <td><a class="${move.type} type-detail">${move.type}</a></td>
                        </tr>`;
                    }
                });
            }
        });
        return fastMovesString;
    }

    function populateGenerationFilter() {
        let generationFilter = document.getElementById('generation');
        generationFilter.innerHTML = '<option value="">Generation</option>'; 

        generations.forEach(generation => {
            for (let gen = 1; gen < 9; gen += 1) {
                let option = document.createElement('option');
                option.value = gen
                option.textContent = gen
                generationFilter.appendChild(option);
            }
        });
    }

    function populateTypeFilter() {
        let typeFilter = document.getElementById('type');
        typeFilter.innerHTML = '<option value="">Type</option>'; 


        let uniqueTypes = new Set();


        pokemon_type.forEach(pokemon => {
            pokemon.type.forEach(type => uniqueTypes.add(type)); 
        });

        let uniqueTypesArray = Array.from(uniqueTypes).sort();

        uniqueTypesArray.forEach(type => {
            let option = document.createElement('option');
            option.value = type;
            option.textContent = type;
            typeFilter.appendChild(option);
        });
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

    document.getElementById('generation').addEventListener('change', function() {
        currentPage = 1; 
        displayPokemons(currentPage);
    });

    document.getElementById('type').addEventListener('change', function() {
        currentPage = 1; 
        displayPokemons(currentPage);
    });

    document.getElementById('name').addEventListener('input', function() {
        currentPage = 1; 
        displayPokemons(currentPage);
    });

    populateGenerationFilter();
    populateTypeFilter();
    displayPokemons(currentPage);
});



