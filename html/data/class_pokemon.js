class Pokemon{
    static all_pokemons = []

    constructor(pokemon_id,name, stamina,form, attack, defense,types,attaques){
        this._pokemon_id = pokemon_id
        this._pokemon_name = name
        this._base_stamina = stamina
        this._form = form 
        this._base_attack = attack
        this._base_defense = defense
        this._types = types
        this._attacks = attaques
    }

    toString() {
        return `${this._pokemon_name} - ${this._form}`;
    }


    import_pokemon(){
        pokemons.forEach((item) => {
            if(item.form == "Normal" ){
                let id = item.pokemon_id
                let types = []; 
                let attaques = []; 
                
                
                pokemon_type.forEach((type)=>{
                    if(type.pokemon_id == id){
                        types.push(type.type)
                    }
                })

                pokemon_move.forEach((attack)=>{
                    if(attack.pokemon_id == id){
                        attaques.push(attack)
                    }
                })
                


                let poke = new Pokemon(item.pokemon_id,item.pokemon_name,item.base_stamina,item.form,item.base_attack,item.base_defense,types,attaques)
                Pokemon.all_pokemons[id] = poke
            }
          })
    }


    getTypes() {
        return this._types;
    }

    getAttacks() {
        return this._attacks;
    }
}
