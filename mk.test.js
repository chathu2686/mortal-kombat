const { expect } = require("@jest/globals");
const Fighter = require("./mk");

describe("(Fighter)", () => {
  test("invoking constructor returns an object that contain the name, health, movies, fatalities, realm properties", () => {
    const input = [
      "Raiden",
      450,
      "Earth",
      "Lightning Storm",
      "Electric Decapitation",
    ];

    const tharakaFighter = new Fighter(input);

    expect(tharakaFighter.name).toBe("Raiden");
    expect(tharakaFighter.health).toBe(450);
    expect(tharakaFighter.realm).toBe("Earth");
    expect(tharakaFighter.moves).toBe("Lightning Storm");
    expect(tharakaFighter.fatalities).toBe("Electric Decapitation");
    expect(tharakaFighter.attack).toBe(0);
  });

  test("randomizer function works and will be utilised later  on during the dveelopment process", () => {
    const input = [
      "Raiden",
      450,
      "Earth",
      "Lightning Storm",
      "Electric Decapitation",
    ];

    const testFighter = new Fighter(input);

    const testValue1 = testFighter.randomizer(5, 15);
    const testValue2 = testFighter.randomizer(10, 20);

    expect(testValue1).toBeGreaterThanOrEqual(5);
    expect(testValue1).toBeLessThan(15);

    expect(testValue2).toBeGreaterThanOrEqual(10);
    expect(testValue2).toBeLessThan(20);
  });
});
