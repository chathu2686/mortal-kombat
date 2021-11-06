class Fighter {
  constructor(name, health, realm, moves, fatalities) {
    this.name = name;
    this.health = health;
    this.realm = realm;
    this.moves = moves;
    this.fatalities = fatalities;
    this.attack = 1;
  }

  random(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
}

//-------------------Battle-------------------------------------
class Battle {
  constructor(playerName, playerFighter, aiFighter) {
    this.playerName = playerName;
    this.playerFighter = playerFighter;
    this.aiFighter = aiFighter;
  }

  realmDamage() {
    const playerRealm = this.playerFighter.realm;
    const aiRealm = this.aiFighter.realm;

    if (playerRealm === "Earth" && aiRealm === "Nether") {
      this.playerFighter.attack *= 0.9;
      this.aiFighter.attack *= 1.1;
    } else if (playerRealm === "Nether" && aiRealm === "Earth") {
      this.playerFighter.attack *= 1.1;
      this.aiFighter.attack *= 0.9;
    } else if (playerRealm === "Earth" && aiRealm === "Chaos") {
      this.playerFighter.attack *= 1.1;
      this.aiFighter.attack *= 0.9;
    } else if (playerRealm === "Chaos" && aiRealm === "Earth") {
      this.playerFighter.attack *= 0.9;
      this.aiFighter.attack *= 1.1;
    }

    console.log(
      `${this.playerName} gets ${Math.floor(
        this.playerFighter.attack * 100
      )}% attack!`
    );
    console.log(
      `${this.aiFighter.name} gets ${Math.floor(
        this.aiFighter.attack * 100
      )}% attack!`
    );
  }

  randomizer(num) {
    return Math.floor(Math.random() * num);
  }

  attack() {
    const playerMove = this.playerFighter.moves[this.randomizer(4)];
    const playerAttack = Math.floor(
      this.playerFighter.attack * this.randomizer(26)
    );
    this.aiFighter.health -= playerAttack;

    console.log(
      `${this.playerName} attacks ${this.aiFighter.name} with ${playerMove} and inflicts ${playerAttack} damage!!!`
    );

    const aiMove = this.aiFighter.moves[this.randomizer(4)];
    const aiAttack = Math.floor(this.aiFighter.attack * this.randomizer(26));
    this.playerFighter.health -= aiAttack;

    console.log(
      `${this.aiFighter.name} attacks ${this.playerName} with ${aiMove} and inflicts ${aiAttack} damage!!!`
    );

    console.log(
      `${this.playerName} now has ${this.playerFighter.health} health remaining and ${this.aiFighter.name} has ${this.aiFighter.health} health remaining!!!`
    );

    let artiAttack = Math.floor(this.aiFighter.attack * this.randomizer(26));
    this.playerFighter.health -= artiAttack;
  }
}

const tharaka = new Fighter(
  "Raiden",
  450,
  "Earth",
  ["Lightning Storm", "a", "b", "c"],
  ["Electric Decapitation", "Hello"]
);

const bot = new Fighter(
  "scorpion",
  400,
  "Nether",
  ["Fire Whoop", "x", "y", "z"],
  ["Electric Decapitation", "p", "q", "r"]
);

console.log(tharaka);
console.log(bot);

const bat = new Battle("tharaka", tharaka, bot);

bat.realmDamage();

bat.attack();

console.log(bat);
