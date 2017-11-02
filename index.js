// A         or   Amaj      [0 0 2 2 2 0] (Db E  A) : major triad

let fs = require('fs');
let path = require('path');

let contents = fs.readFileSync(path.join(__dirname, 'chords.txt'), 'utf8');

let lines = contents.split('\n');

let chords = {};

for(let i = 0; i < lines.length; i++) {
    let line = lines[i];
    let frets = line.match(/\[(.*)\]/)[1].replace(/x/g, '-1').split(' ').map(p => parseInt(p));
    //let names = line.match(/(\S+\s?\S+)/g).filter(n => n != 'or');
    let name = line.match(/\S+\s/)[0].trim();
    let chord = chords[name];

    if (chord) {
        if(!chord.variations) {
            chord.variations = [];
        }

        chord.variations.push(frets);
    } else {
        chords[name] = {
            frets
        }
    }
}

fs.writeFileSync(path.join(__dirname, 'chords.json'), JSON.stringify(chords), 'utf8');