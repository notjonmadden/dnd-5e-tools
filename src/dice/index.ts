type Rank
    = 4 | 6 | 8 | 10 | 12 | 20 | 100;

interface RollSpec {
    quantity: number;
    rank: Rank;
    bonus: number;
}

function isValidRank(rank: number) {
    return [4, 6, 8, 10, 12, 20, 100].indexOf(rank) !== -1;
}

function rank(r: number) {
    if (!isValidRank(r)) {
        throw Error("invalid rank");
    } else {
        return <Rank>r;
    }
}

const rollSpecRegex
    = /^\s*(\d+)\s*d\s*(4|6|8|100|10|12|20)\s*(([+-])\s*(\d+))?/i;
const validCharacterRegex
    = /\s|\d|[d+-]/i;

function containsInvalidCharacters(spec: string) {
    return !Array.prototype.every.call(spec, (c: string) => validCharacterRegex.exec(c) !== null);
}

function parse(spec: string): RollSpec {
    const matches = rollSpecRegex.exec(spec);
    if (matches === null || containsInvalidCharacters(spec)) {
        throw Error("invalid roll spec");
    } else {
        const [
            _,
            quantityStr,
            rankStr,
            bonusStr,
            bonusSignStr,
            bonusValueStr
        ] = matches;
        const quantity = parseInt(quantityStr);
        const rank = <Rank>parseInt(rankStr);
        const hasBonus = !!bonusStr;
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

        return { quantity, rank, bonus };
    }
}

function roll(spec: string | RollSpec) {
    var rollResult = 0;
    const { quantity, rank, bonus }
        = typeof spec === "string" ? parse(spec) : spec;

    for (let i = 0; i < quantity; i += 1) {
        rollResult += Math.floor(Math.random() * rank) + 1;
    }

    return rollResult + bonus;
}

export { parse, roll, rank };