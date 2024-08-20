class Attack{
    static all_attacks = []

    constructor(move_id,name,type,duration,energy_delta,power,stamina_loss_scaler,critical_chance){
        this._move_id = move_id
        this._name = name
        this._type = type
        this._power = power
        this._duration = duration
        this._energy_delta = energy_delta
        this._stamina_loss_scaler = stamina_loss_scaler
        this._critical_chance = critical_chance
    }


    import_attacks(){
        charged_moves.forEach(move => {
            const attack = new Attack(
                move.move_id,
                move.name,
                move.type,
                move.power,
                move.duration,
                move.energy_delta,
                move.stamina_loss_scaler,
                move.critical_chance || 0 
            );
            Attack.all_attacks[move.move_id] = attack;
        });
    
        fast_moves.forEach(move => {
            const attack = new Attack(
                move.move_id,
                move.name,
                move.type,
                move.power,
                move.duration,
                move.energy_delta,
                move.stamina_loss_scaler,
                0 
            );
            Attack.all_attacks[move.move_id] = attack;
        });
    }
}