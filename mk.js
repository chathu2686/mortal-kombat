const fighterDb = require("./fighterDb");

class Fighter {
  constructor(fighter) {
    this.name = fighter.name;
    this.health = fighter.health;
    this.realm = fighter.realm;
    this.moves = fighter.moves;
    this.fatalities = fighter.fatalities;
    this.attack = 1;
  }
}

//-------------------Battle-------------------------------------
class Battle {
  constructor(playerName, playerFighter, aiFighter) {
    this.playerName = playerName;
    this.playerFighter = playerFighter;
    this.aiFighter = aiFighter;
    this.mode = "manual";
  }
  //----------randomizer--------
  randomizer(num) {
    return Math.floor(Math.random() * num);
  }
  //---------realmDamage--------
  realmDamage() {
    const playerRealm = this.playerFighter.realm;
    const aiRealm = this.aiFighter.realm;

    if (playerRealm === "Earth" && aiRealm === "Nether") {
      this.playerFighter.attack *= 0.9;
      this.aiFighter.attack *= 1.1;
    } else if (playerRealm === "Earth" && aiRealm === "Chaos") {
      this.playerFighter.attack *= 1.1;
      this.aiFighter.attack *= 0.9;
    } else if (playerRealm === "Nether" && aiRealm === "Earth") {
      this.playerFighter.attack *= 1.1;
      this.aiFighter.attack *= 0.9;
    } else if (playerRealm === "Chaos" && aiRealm === "Earth") {
      this.playerFighter.attack *= 0.9;
      this.aiFighter.attack *= 1.1;
    }

    console.log(`\nRealm Damage`);
    console.log(
      `${this.playerName} gets ${Math.floor(
        this.playerFighter.attack * 100
      )}% of usual attack damage!`
    );
    console.log(
      `${this.aiFighter.name} gets ${Math.floor(
        this.aiFighter.attack * 100
      )}% of usual attack damage!\n`
    );
  }

  //-------------isCritical----------
  isCritical() {
    const critical = this.randomizer(101);
    if (critical > 75) {
      console.log(`It's a critical Hit!!!`);
      return true;
    } else {
      return false;
    }
  }

  //----------------fight--------------
  fight(move) {
    // when player attacks ai---
    console.log(
      `${this.playerName} attacks ${this.aiFighter.name} with ${move}!`
    );

    //player attack damage randomly generated
    const playerAttack = Math.floor(
      this.playerFighter.attack * this.randomizer(26)
    );

    //if player attck is a critical hit
    if (this.isCritical()) {
      this.aiFighter.health -= playerAttack * 3;
      console.log(
        `${this.playerName} inflicts ${playerAttack * 3} damage on ${
          this.aiFighter.name
        }!`
      );
    }

    // if player attack is not a critical hit
    else {
      this.aiFighter.health -= playerAttack;
      console.log(
        `${this.playerName} inflicts ${playerAttack * 3} damage on ${
          this.aiFighter.name
        }!`
      );
    }

    // when ai attacks back player---
    const aiMove = this.aiFighter.moves[this.randomizer(3)];

    console.log(
      `${this.aiFighter.name} attacks ${this.playerName} with ${aiMove}!`
    );
    //ai attack damage randomly generated
    const aiAttack = Math.floor(this.aiFighter.attack * this.randomizer(26));

    // if ai attack is a critical hit
    if (this.isCritical()) {
      this.playerFighter.health -= aiAttack * 3;
      console.log(
        `${this.aiFighter.name} inflicts ${aiAttack * 3} damage on ${
          this.playerName
        }!`
      );
    }
    // if ai attack is not a critical hit
    else {
      this.playerFighter.health -= aiAttack * 3;
      console.log(
        `${this.aiFighter.name} inflicts ${playerAttack} damage on ${this.playerName}!`
      );
    }

    //confirmation of fighter health levels after one round of fighting
    console.log(
      `---${this.playerName} now has ${this.playerFighter.health} health and ${this.aiFighter.name} has ${this.aiFighter.health} health--- \n`
    );
  }
  //-------------ending-----------
  ending(winner, loser, falality) {
    console.log(`${loser} has lost the fight!!!\n`);
    console.log("!!!!!!!!!!!!!!!!!Finish Him!!!!!!!!!!!!!!!!!!!\n");
    console.log(`${winner} kills ${loser} with ${falality} fatality!!!`);
    console.log(`MUHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHA`);
  }
}

class Autobattle extends Battle {
  constructor(userName, userFighter, aiCharacter) {
    super(userName, userFighter, aiCharacter);
    this.mode = "auto";
  }

  autocombat() {
    console.log(`!!!LET THE BATTLE BEGIN!!!\n`);
    // while loop will regenratete fight rounds until one fighter health reaches 0 or below
    while (this.playerFighter.health > 0 && this.aiFighter.health > 0) {
      const userMove = this.playerFighter.moves[this.randomizer(3)];
      this.fight(userMove);
    }

    //checking who won the fight and intialising ending
    let autoWinner;
    let autoLoser;
    let autoFatality;

    if (this.playerFighter.health > 0) {
      autoWinner = this.playerName;
      autoLoser = this.aiFighter.name;
      autoFatality = this.playerFighter.fatalities[this.randomizer(3)];
    } else {
      autoWinner = this.aiFighter.name;
      autoLoser = this.playerName;
      autoFatality = this.aiFighter.fatalities[this.randomizer(3)];
    }
    console.log(`${autoWinner} is the winner!!!`);
    this.ending(autoWinner, autoLoser, autoFatality);
  }
}

module.exports = { Fighter, Battle, Autobattle };
