import "mocha";
import { expect } from "chai";

import { parse, roll, rank } from "../../src/dice";

describe("parse", () => {
    function testRank(rank: number) {
        const spec = parse(`1d${rank}`);

        expect(spec.rank).to.equal(rank);
    }

    it("accepts d4", () => testRank(4));
    it("accepts d6", () => testRank(6));
    it("accepts d8", () => testRank(8));
    it("accepts d10", () => testRank(10));
    it("accepts d12", () => testRank(12));
    it("accepts d20", () => testRank(20));
    it("accepts d100", () => testRank(100));
    
    it("doesn't accept missing rank",   
        () => expect(() => parse("1d")).to.throw());

    it("doesn't accept invalid rank",
        () => expect(() => parse("1d9")).to.throw());

    it("doesn't accept quantity zero",
        () => expect(() => parse("0d6")).to.throw());

    it("doesn't accept negative quantity",
        () => expect(() => parse("-1d6")).to.throw());

    it("doesn't accept missing quantity",
        () => expect(() => parse("d6")).to.throw());

    it("accepts quantity greater than zero",
        () => expect(parse("3d6").quantity).to.equal(3));

    it("accepts quantity with multiple digits",
        () => expect(parse("13d4").quantity).to.equal(13));

    it("accepts missing bonus",
        () => expect(parse("1d4").bonus).to.equal(0));

    it("accepts positive bonus",
        () => expect(parse("1d4 +1").bonus).to.equal(1));

    it("accepts negative bonus",
        () => expect(parse("1d4 -1").bonus).to.equal(-1));

    it("accepts explicit zero bonus",
        () => expect(parse("1d4 +0").bonus).to.equal(0));

    it("accepts explicit negative zero bonus",
        () => expect(parse("1d4 -0").bonus).to.equal(0));

    it("accepts multi-digit bonus",
        () => expect(parse("1d4 +11").bonus).to.equal(11));

    it("accepts spec without any whitespace", () => {
        const { quantity, rank, bonus } = parse("1d4+5");

        expect(quantity).to.equal(1);
        expect(rank).to.equal(4);
        expect(bonus).to.equal(5);
    })

    it("accepts spec with whitespace", () => {
        const { quantity, rank, bonus } = parse(" 1 d  4 +    5");

        expect(quantity).to.equal(1);
        expect(rank).to.equal(4);
        expect(bonus).to.equal(5);
    });

    it("doesn't accept spec with unexpected characters",
        () => expect(() => parse("1d4~4")).to.throw());
});