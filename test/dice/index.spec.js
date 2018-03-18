"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var chai_1 = require("chai");
var dice_1 = require("../../src/dice");
describe("parse", function () {
    function testRank(rank) {
        var spec = dice_1.parse("1d" + rank);
        chai_1.expect(spec.rank).to.equal(rank);
    }
    it("accepts d4", function () { return testRank(4); });
    it("accepts d6", function () { return testRank(6); });
    it("accepts d8", function () { return testRank(8); });
    it("accepts d10", function () { return testRank(10); });
    it("accepts d12", function () { return testRank(12); });
    it("accepts d20", function () { return testRank(20); });
    it("accepts d100", function () { return testRank(100); });
    it("doesn't accept missing rank", function () { return chai_1.expect(function () { return dice_1.parse("1d"); }).to.throw(); });
    it("doesn't accept invalid rank", function () { return chai_1.expect(function () { return dice_1.parse("1d9"); }).to.throw(); });
    it("doesn't accept quantity zero", function () { return chai_1.expect(function () { return dice_1.parse("0d6"); }).to.throw(); });
    it("doesn't accept negative quantity", function () { return chai_1.expect(function () { return dice_1.parse("-1d6"); }).to.throw(); });
    it("doesn't accept missing quantity", function () { return chai_1.expect(function () { return dice_1.parse("d6"); }).to.throw(); });
    it("accepts quantity greater than zero", function () { return chai_1.expect(dice_1.parse("3d6").quantity).to.equal(3); });
    it("accepts quantity with multiple digits", function () { return chai_1.expect(dice_1.parse("13d4").quantity).to.equal(13); });
    it("accepts missing bonus", function () { return chai_1.expect(dice_1.parse("1d4").bonus).to.equal(0); });
    it("accepts positive bonus", function () { return chai_1.expect(dice_1.parse("1d4 +1").bonus).to.equal(1); });
    it("accepts negative bonus", function () { return chai_1.expect(dice_1.parse("1d4 -1").bonus).to.equal(-1); });
    it("accepts explicit zero bonus", function () { return chai_1.expect(dice_1.parse("1d4 +0").bonus).to.equal(0); });
    it("accepts explicit negative zero bonus", function () { return chai_1.expect(dice_1.parse("1d4 -0").bonus).to.equal(0); });
    it("accepts multi-digit bonus", function () { return chai_1.expect(dice_1.parse("1d4 +11").bonus).to.equal(11); });
    it("accepts spec without any whitespace", function () {
        var _a = dice_1.parse("1d4+5"), quantity = _a.quantity, rank = _a.rank, bonus = _a.bonus;
        chai_1.expect(quantity).to.equal(1);
        chai_1.expect(rank).to.equal(4);
        chai_1.expect(bonus).to.equal(5);
    });
    it("accepts spec with whitespace", function () {
        var _a = dice_1.parse(" 1 d  4 +    5"), quantity = _a.quantity, rank = _a.rank, bonus = _a.bonus;
        chai_1.expect(quantity).to.equal(1);
        chai_1.expect(rank).to.equal(4);
        chai_1.expect(bonus).to.equal(5);
    });
    it("doesn't accept spec with unexpected characters", function () { return chai_1.expect(function () { return dice_1.parse("1d4~4"); }).to.throw(); });
});
