import fetch from "node-fetch";

const spellUrlDefault = "https://raw.githubusercontent.com/vorpalhex/srd_spells/master/spells.json";
const spellFactoryDefault = (json: any) => <Spell>json;

interface Spell {
    name: string;
    castingTime: string;
    components: any;
    description: string;
    duration: string;
    level: string;
    range: string;
    school: string;
}

interface SpellQuery {
    school: string;
    level: string;
}

interface SpellProvider {
    get(name: string): Spell | Spell[];
    search(query: SpellQuery): Spell[];
}

class SimpleSpellProvider implements SpellProvider {
    constructor(
        private readonly spells: Spell[]
    ) {

    }

    public get(name: string) {
        const regex = new RegExp(name);
        const matchingSpells = this.spells.filter(s => regex.test(s.name));

        return matchingSpells.length === 1 ? matchingSpells[0] : matchingSpells;
    }

    public search(query: SpellQuery) {
        return this.spells.filter(
            s => s.level === query.level && s.school === query.school);
    }
}

function format(spell: Spell) {
    // const wrap = wordwrap(15);
    return `${spell.name} - ${spell.school}, ${spell.level}\n`
        + `${spell.description}`;
}

async function createSpellProvider(
    spellUrlOrData?: string | any[],
    spellFactory?: (json: any) => Spell
) : Promise<SpellProvider> {
    var spellPromise: Promise<Spell[]>;

    spellFactory = spellFactory || spellFactoryDefault;
    
    if (typeof spellUrlOrData === "undefined") {
        spellPromise
            = fetch(spellUrlDefault)
            .then(r => r.json())
            .then(ss => ss.map(spellFactory));
    } else if (typeof spellUrlOrData === "string") {
        spellPromise
            = fetch(spellUrlOrData)
            .then(r => r.json())
            .then(ss => ss.map(spellFactory));
    } else {
        spellPromise
            = Promise.resolve(spellUrlOrData.map(spellFactory));
    }
    
    return new SimpleSpellProvider(await spellPromise);
}

export { Spell, createSpellProvider, format };