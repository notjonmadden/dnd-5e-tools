"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isValidRank(rank) {
    return [4, 6, 8, 10, 12, 20, 100].indexOf(rank) !== -1;
}
function rank(r) {
    if (!isValidRank(r)) {
        throw Error("invalid rank");
    }
    else {
        return r;
    }
}
exports.rank = rank;
var rollSpecRegex = /^\s*(\d+)\s*d\s*(4|6|8|100|10|12|20)\s*(([+-])\s*(\d+))?/i;
var validCharacterRegex = /\s|\d|[d+-]/i;
function containsInvalidCharacters(spec) {
    return !Array.prototype.every.call(spec, function (c) { return validCharacterRegex.exec(c) !== null; });
}
function parse(spec) {
    var matches = rollSpecRegex.exec(spec);
    if (matches === null || containsInvalidCharacters(spec)) {
        throw Error("invalid roll spec");
    }
    else {
        var _ = matches[0], quantityStr = matches[1], rankStr = matches[2], bonusStr = matches[3], bonusSignStr = matches[4], bonusValueStr = matches[5];
        var quantity = parseInt(quantityStr);
        var rank_1 = parseInt(rankStr);
        var hasBonus = !!bonusStr;
        var bonus = 0;
        if (hasBonus) {
            bonus = parseInt(bonusValueStr);
            if (bonusSignStr === "-") {
                bonus = -bonus;
            }
        }
        if (quantity < 1) {
            throw Error("invalid roll spec: can't roll less than one die");
        }
        return { quantity: quantity, rank: rank_1, bonus: bonus };
    }
}
exports.parse = parse;
function roll(spec) {
    var rollResult = 0;
    var _a = typeof spec === "string" ? parse(spec) : spec, quantity = _a.quantity, rank = _a.rank, bonus = _a.bonus;
    for (var i = 0; i < quantity; i += 1) {
        rollResult += Math.floor(Math.random() * rank) + 1;
    }
    return rollResult + bonus;
}
exports.roll = roll;
