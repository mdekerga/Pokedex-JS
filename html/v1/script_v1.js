function pad(num, size) {
    let s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
}




 function createPokemonRows() {
    let tbody = document.querySelector('tbody');
    pokemons.forEach(function(pokemon,index){
        if(pokemon.form == "Normal"){
            let row = document.createElement('tr');

            let poke_gen = 0;

            generations.forEach(generation => {
                for (let gen in generation) {
                    generation[gen].forEach(poke => {
                        if(poke.id == pokemon.pokemon_id){
                            poke_gen = poke.generation_number
                        }
                    });
                }
            });


            let type = pokemon_type[index].type

            row.innerHTML = `
                <td>${pokemon.pokemon_id}</td>
                <td>${pokemon.pokemon_name}</td>
                <td>${poke_gen}</td>
                <td>${type}</td>
                <td>${pokemon.base_attack}</td>
                <td>${pokemon.base_defense}</td>
                <td>${pokemon.base_stamina}</td>
                <td><img src="../webp/images/${pad(pokemon.pokemon_id, 3)}.webp" class="image_pokemon" alt="${pokemon.pokemon_name}"></td>
            `;
            tbody.appendChild(row);
        }
    });
}


createPokemonRows();
