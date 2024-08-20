

function getPokemonsByType(typeName) {
    return Pokemon.all_pokemons.filter(pokemon => {
        return pokemon._types.includes(typeName);
    });
}




function getPokemonsByAttack(attackName) {
    return Pokemon.all_pokemons.filter(pokemon => {
        return pokemon._attaques && pokemon._attaques.some(attaque => attaque._name === attackName);
    });
}


    

    function getAttacksByType(typeName) {
        return Attack.all_attacks.filter(attaque => {
            return attaque._type === typeName;
        });
    }
    

    function sortPokemonByName(){
        return Pokemon.all_pokemons.sort()
    }

    function sortPokemonByStamina(){
        return Pokemon.all_pokemons.sort((a,b) => b._base_stamina - a._base_stamina)
    }

    function getWeakestEnemies(attack) {
        let weakestEnemies = [];
        let lowestMultiplier = Infinity;
    
        Pokemon.all_pokemons.forEach(pokemon => {
            let effectiveness = 1;
    
            pokemon._types.forEach(type => {
                effectiveness *= typeEffectiveness[type._type][attack._type] || 1;
            });
    
            if (effectiveness < lowestMultiplier) {
                lowestMultiplier = effectiveness;
                weakestEnemies = [pokemon];
            } else if (effectiveness === lowestMultiplier) {
                weakestEnemies.push(pokemon);
            }
        });
    
        return weakestEnemies;
    }

    function getBestAttackTypesForEnemy(name) {
        let pokemon = Pokemon.all_pokemons.find(pokemon => pokemon._pokemon_name === name);
        if (!pokemon) {
            return [];
        }
    
        let bestAttackTypes = [];
        let highestMultiplier = 0;
    

        Object.keys(typeEffectiveness).forEach(attackType => {
            let effectiveness = 1;
    
            
            pokemon._types.forEach(type => {
                effectiveness *= typeEffectiveness[type._type][attackType] || 1;
            });
    
            if (effectiveness > highestMultiplier) {
                highestMultiplier = effectiveness;
                bestAttackTypes = [attackType];
            } else if (effectiveness === highestMultiplier) {
                bestAttackTypes.push(attackType);
            }
        });
    
        return bestAttackTypes;
    }
    

    








    







