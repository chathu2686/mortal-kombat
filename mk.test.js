const fighterDb = require("./fighterDb");
const { Fighter, Battle, Autobattle } = require("./mk");

describe("(Fighter)", () => {
  test("invoking constructor returns an object that contain the name, health, movies, fatalities, realm properties", () => {
    const input = fighterDb.rayden;

    const tharakaFighter = new Fighter(input);

    expect(tharakaFighter.name).toBe("Rayden");
    expect(tharakaFighter.health).toBe(450);
    expect(tharakaFighter.realm).toBe("Earth");
    expect(tharakaFighter.moves).toEqual([
      "Lightning Storm",
      "Torpedo",
      "Shocking Touch",
    ]);
    expect(tharakaFighter.fatalities).toEqual([
      "Electric Decapitation",
      "Electric Knockout",
      "Explosive Uppercut",
    ]);
    expect(tharakaFighter.attack).toBe(1);
  });
});

describe("Battle", () => {
  test("invoking constructor returns an object", () => {
    const input1 = "Tharaka";
    const input2 = fighterDb.motaro;
    const input3 = fighterDb.shaokhan;

    const testBattle = new Battle(input1, input2, input3);

    expect(testBattle.playerName).toBe("Tharaka");
    expect(testBattle.playerFighter).toEqual(fighterDb.motaro);
    expect(testBattle.aiFighter).toEqual(fighterDb.shaokhan);
    expect(testBattle.mode).toBe("manual");
  });
  test("randomizer function works and will be utilised later  on during the dveelopment process", () => {
    const input = [
      "Raiden",
      450,
      "Earth",
      "Lightning Storm",
      "Electric Decapitation",
    ];

    const input1 = "Tharaka";
    const input2 = new Fighter(fighterDb.motaro);
    const input3 = new Fighter(fighterDb.shaokhan);

    const testBattle = new Battle(input1, input2, input3);

    const testRandomizer1 = testBattle.randomizer(10);
    const testRandomizer2 = testBattle.randomizer(15);

    expect(testRandomizer1).toBeLessThan(10);
    expect(testRandomizer2).toBeLessThan(15);
  });

  test("realmDamage() adjusts attack based on fighter realms", () => {
    const input1 = "Tharaka";
    const input2 = new Fighter(fighterDb.rayden);
    const input3 = new Fighter(fighterDb.shaokhan);

    const testBattle = new Battle(input1, input2, input3);

    testBattle.realmDamage();

    expect(input1.attack).not.toBe(1);
    expect(input2.attack).not.toBe(1);
  });

  test("isCritical function returns a boolean", () => {
    const input = [
      "Raiden",
      450,
      "Earth",
      "Lightning Storm",
      "Electric Decapitation",
    ];

    const input1 = "Tharaka";
    const input2 = new Fighter(fighterDb.motaro);
    const input3 = new Fighter(fighterDb.shaokhan);

    const testBattle = new Battle(input1, input2, input3);

    expect(typeof testBattle.isCritical()).toBe("boolean");
  });

  test("fight() fights one round and reduces health", () => {
    const input1 = "Tharaka";
    const input2 = new Fighter(fighterDb.motaro);
    const input3 = new Fighter(fighterDb.shaokhan);

    const testBattle = new Battle(input1, input2, input3);

    testBattle.fight("Tail Sweep");

    expect(testBattle.playerFighter.health).toBeLessThan(450);
    expect(testBattle.aiFighter.health).toBeLessThan(475);
  });

  describe("Autobattle", () => {
    test("invocation changes the parent class object mode key value to auto", () => {
      const input1 = "Sandra";
      const input2 = new Fighter(fighterDb.shinnok);
      const input3 = new Fighter(fighterDb.kintaro);

      const testBattle = new Autobattle(input1, input2, input3);
      expect(testBattle.mode).toBe("auto");
    });
    test("autobattle() invokes fight() continuously until one of the fighters health reaches 0 or below", () => {
      const input1 = "Sandra";
      const input2 = new Fighter(fighterDb.shinnok);
      const input3 = new Fighter(fighterDb.kintaro);

      const testBattle = new Autobattle(input1, input2, input3);
      testBattle.autocombat();

      expect(input1.health || input2.health).toBeLessThan(1);
    });
  });
});
