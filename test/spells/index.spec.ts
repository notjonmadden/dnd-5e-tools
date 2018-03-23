import "mocha";
import { expect } from "chai";

import { createSpellProvider, Spell } from "../../src/spells";

describe("spells", async () => {
    const testSpell = {
        name: "Test",
        school: "Abjuration",
        level: "cantrip",
        range: "60 ft",
        duration: "instant",
        description: "",
        components: "M",
        castingTime: "instant"
    };

    const provider = await createSpellProvider([testSpell]);

    it("finds spell by exact name",
        () => expect(provider.get("Test")).to.equal(testSpell));
});