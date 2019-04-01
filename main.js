const cardTemplate = `
<div class="bingo-card">
    <h1 class="card-title"></h1>
    <h2 class="card-subtitle"></h2>
    <table class="card">
        <thead>
            <tr><th>B</th><th>I</th><th>N</th><th>G</th><th>O</th></tr>
        </thead>
        <tbody>
        </tbody>
    </table>
</div>
`;

const getCardWords = (wordList) => {
    let cardWords = [];
    let newWord;
    do {
        newWord = wordList.words[Math.floor(Math.random() * wordList.words.length)];
        if (!cardWords.includes(newWord)) {
            cardWords.push(newWord);
        }
    } while (cardWords.length < 25);
    return cardWords;
}

const getWordList = async (wordListFile) => {
    const response = await fetch(wordListFile);
    const json = await response.json();
    return json;
}

const clearCards = () => {
    document.getElementById('cards').innerHTML = '';
}

const createCard = async (wordList) => {
    const cardWords = getCardWords(wordList);
    let row, column, tr, td;
    let card = document.createElement('DIV');
    card.innerHTML = cardTemplate;
    card.querySelector('.card-title').innerHTML = wordList.title;
    card.querySelector('.card-subtitle').innerHTML = wordList.subtitle;

    for (row = 0; row < 5; row++) {
        tr = document.createElement('TR');
        for (column = 0; column < 5; column++) {
            td = document.createElement('TD');
            if (row === 2 && column === 2) {
                td.className = "card-word free";
                td.innerHTML = wordList.freeSpace;
            } else {
                td.className = "card-word";
                td.innerHTML = cardWords[row * 5 + column];
            }
            tr.appendChild(td);
        }
        card.querySelector('tbody').appendChild(tr);
    }
    document.getElementById('cards').appendChild(card);
}

const createCards = async () => {
    const wordListFile = document.getElementById('word-list').value;
    const wordList = await getWordList(wordListFile);
    const cardCount = document.getElementById('card-count').value;
    clearCards();
    for (let i = 0; i < cardCount; i++) {
        await createCard(wordList);
    }
}

createCards();
