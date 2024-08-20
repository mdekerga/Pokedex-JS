class Type{

  static all_types = []

  constructor(name){
      this._name = name
  }

  import_type() {
   pokemon_type.forEach((item) => {
     if (item.form === "Normal") {
       item.type.forEach((type_pokemon) => {
         if (!Type.all_types.includes(type_pokemon)) {
           Type.all_types[type_pokemon] = new Type(type_pokemon);
         }
       });
     }
   });
 }

  getEfficacite(name,def){
      return "Le type"+ this.name + "a un multiplicateur de " +type_effectiveness[0][name][def] + "contre le type" + def;
   }
     
   toString(){
       return "Le type" + this.name
   }

}