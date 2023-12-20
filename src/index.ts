import "../sass/main.scss"
interface Symbol {
    name: string;
    imageUrl: string;
}

interface SymbolData {
    name: string;
    index: number; 
    reelIndex: number
}

const symbols: Symbol[] = [{name: "spade", imageUrl: "../assets/spade.png"},{name: "heart", imageUrl: "../assets/heart.png"}, {name: "club", imageUrl: "../assets/club.png"},
                           {name: "bonus", imageUrl: "../assets/bonus.png"},{name: "spade", imageUrl: "../assets/spade.png"},{name: "heart", imageUrl: "../assets/heart.png"},
                           {name: "club", imageUrl: "../assets/club.png"},{name: "spade", imageUrl: "../assets/spade.png"},{name: "heart", imageUrl: "../assets/heart.png"},
                           {name: "club", imageUrl: "../assets/club.png"},{name: "spade", imageUrl: "../assets/spade.png"},{name: "heart", imageUrl: "../assets/heart.png"},
                           {name: "club", imageUrl: "../assets/club.png"},{name: "spade", imageUrl: "../assets/spade.png"},{name: "heart", imageUrl: "../assets/heart.png"},
                           {name: "club", imageUrl: "../assets/club.png"}]


const reel1 = document.getElementById('reel1') as HTMLElement
const reel2 = document.getElementById('reel2') as HTMLElement
const reel3 = document.getElementById('reel3') as HTMLElement


const generatedSymbolsReel1: SymbolData[] = [];
const generatedSymbolsReel2: SymbolData[] = [];
const generatedSymbolsReel3: SymbolData[] = [];
const shuffleArray = (array: Symbol[]): Symbol[] => {
    for(let i = array.length -1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i]
        array[i] = array[j];
        array[j] = temp;
    }
    return array
}

function addSymbolsToReel(symbols: Symbol[], reelContainer: HTMLElement, generatedSymbols: SymbolData[], reelIndex: number): void{

    symbols.forEach((symbol, index) => {
        const symbolDiv = document.createElement('div');
        symbolDiv.classList.add('symbol');
        symbolDiv.setAttribute('data-index', `${index}`)
        symbolDiv.setAttribute('data-reel', `${reelIndex}`)
        const symbolImage = document.createElement('img');
        symbolImage.src = symbol.imageUrl;
        symbolImage.alt = symbol.name;

        symbolDiv.appendChild(symbolImage);
        reelContainer.appendChild(symbolDiv)
        generatedSymbols.push({name: symbol.name, index: index, reelIndex: reelIndex})
    })

}

addSymbolsToReel(shuffleArray(symbols), reel1, generatedSymbolsReel1, 1)
addSymbolsToReel(shuffleArray(symbols), reel2, generatedSymbolsReel2, 2)
addSymbolsToReel(shuffleArray(symbols), reel3, generatedSymbolsReel3, 3)



function applyBounceToWinningSymbols(visibleSymbolsReel1: SymbolData[], visibleSymbolsReel2: SymbolData[], visibleSymbolsReel3: SymbolData[], lineIndex: number) {
    const winningSymbol1 = visibleSymbolsReel1[lineIndex];
    const winningSymbol2 = visibleSymbolsReel2[lineIndex];
    const winningSymbol3 = visibleSymbolsReel3[lineIndex];

    const reel1Symbol = document.querySelector(`#reel${winningSymbol1.reelIndex} .symbol[data-index="${winningSymbol1.index}"]`);
    const reel2Symbol = document.querySelector(`#reel${winningSymbol2.reelIndex} .symbol[data-index="${winningSymbol2.index}"]`);
    const reel3Symbol = document.querySelector(`#reel${winningSymbol3.reelIndex} .symbol[data-index="${winningSymbol3.index}"]`);

    reel1Symbol?.classList.add("bounce");
    reel2Symbol?.classList.add("bounce");
    reel3Symbol?.classList.add("bounce");
}



function checkForWinningLinesAndApplyBounce() {

    const translateY = -159;
    const symbolHeight = 14.88;
    const firstVisibleSymbolIndex = Math.abs(translateY) / symbolHeight;
    const numberOfVisibleSymbols = 3;
    
    
    const visibleSymbolsReel1 = generatedSymbolsReel1.slice(firstVisibleSymbolIndex, firstVisibleSymbolIndex + numberOfVisibleSymbols);
    const visibleSymbolsReel2 = generatedSymbolsReel2.slice(firstVisibleSymbolIndex, firstVisibleSymbolIndex + numberOfVisibleSymbols);
    const visibleSymbolsReel3 = generatedSymbolsReel3.slice(firstVisibleSymbolIndex, firstVisibleSymbolIndex + numberOfVisibleSymbols);
    
    
    if(visibleSymbolsReel1[0].name === visibleSymbolsReel2[0].name && visibleSymbolsReel2[0].name === visibleSymbolsReel3[0].name)
    {

        applyBounceToWinningSymbols(visibleSymbolsReel1, visibleSymbolsReel2, visibleSymbolsReel3, 0);
    }
    if(visibleSymbolsReel1[1].name === visibleSymbolsReel2[1].name && visibleSymbolsReel2[1].name === visibleSymbolsReel3[1].name)
    {
        applyBounceToWinningSymbols(visibleSymbolsReel1, visibleSymbolsReel2, visibleSymbolsReel3, 1)
    }
    if(visibleSymbolsReel1[2].name === visibleSymbolsReel2[2].name && visibleSymbolsReel2[2].name === visibleSymbolsReel3[2].name)
    {
        applyBounceToWinningSymbols(visibleSymbolsReel1, visibleSymbolsReel2, visibleSymbolsReel3, 2)
    }
    if(visibleSymbolsReel1[0].name === visibleSymbolsReel2[1].name && visibleSymbolsReel2[1].name === visibleSymbolsReel3[2].name)
    {
        applyBounceToWinningSymbols(visibleSymbolsReel1, visibleSymbolsReel1, visibleSymbolsReel1, 0)
        applyBounceToWinningSymbols(visibleSymbolsReel2, visibleSymbolsReel2, visibleSymbolsReel2, 1)
        applyBounceToWinningSymbols(visibleSymbolsReel3, visibleSymbolsReel3, visibleSymbolsReel3, 2)
    }
    if(visibleSymbolsReel1[2].name === visibleSymbolsReel2[1].name && visibleSymbolsReel2[1].name === visibleSymbolsReel3[0].name)
    {
        applyBounceToWinningSymbols(visibleSymbolsReel3, visibleSymbolsReel3, visibleSymbolsReel3, 0)
        applyBounceToWinningSymbols(visibleSymbolsReel2, visibleSymbolsReel2, visibleSymbolsReel2, 1)
        applyBounceToWinningSymbols(visibleSymbolsReel1, visibleSymbolsReel1, visibleSymbolsReel1, 2)
    }
    
}

function resetAnimations() {
    document.querySelectorAll('.symbol.bounce').forEach(symbol => symbol.classList.remove('bounce'));
}

function startSpinning(reelSymbols: HTMLElement, animationDuration: number, callback: () => void) {
    reelSymbols.style.animation = "none";

    setTimeout(() => {
        reelSymbols.style.animation = `spin ${animationDuration}s ease-out forwards`;
        setTimeout(callback, animationDuration * 1000);
    }, 0);
}

let wallet: number = 10000;
let bet: number = 10

document.getElementById('spinButton')?.addEventListener('click', () => {
    resetAnimations(); 
    wallet = wallet - bet;
    if (bet > wallet) {
        console.log("Solde insuffisant pour ce pari");
        return;
    }
   
    generatedSymbolsReel1.length = 0;
    generatedSymbolsReel2.length = 0;
    generatedSymbolsReel3.length = 0;

    const animationDuration: number = Math.random() + 0.5;

    reel1.innerHTML = ""
    reel2.innerHTML = ""
    reel3.innerHTML = ""
    addSymbolsToReel(shuffleArray(symbols), reel1, generatedSymbolsReel1, 1)
    addSymbolsToReel(shuffleArray(symbols), reel2, generatedSymbolsReel2, 2)
    addSymbolsToReel(shuffleArray(symbols), reel3, generatedSymbolsReel3, 3)
    

    
    startSpinning(reel1, animationDuration, checkForWinningLinesAndApplyBounce);
    startSpinning(reel2, animationDuration, checkForWinningLinesAndApplyBounce)
    startSpinning(reel3, animationDuration, checkForWinningLinesAndApplyBounce)

    checkForWinningLinesAndApplyBounce();
    
    updateBetDisplay(bet)
})



const betBtn10 = document.getElementById('betButton10')
const betBtn50 = document.getElementById('betButton50')
const betBtn100 = document.getElementById('betButton100')
const betBtn250 = document.getElementById('betButton250')
const betBtn500 = document.getElementById('betButton500')
const betBtn750 = document.getElementById('betButton750')
const betBtn1000 = document.getElementById('betButton1000')

function updateBetDisplay(bet: number) {
    const betElement = document.getElementById('bet');
    const walletElement = document.getElementById('wallet');
    const spinButton = document.getElementById('spinButton') as HTMLButtonElement;

    if (walletElement) {
        walletElement.textContent = `Solde: ${wallet}`
    }
    if (betElement) {
        betElement.textContent = `Bet: ${bet} €`;
    }

    if (spinButton) {
        spinButton.disabled = bet > wallet;
    }
}


updateBetDisplay(bet);

betBtn10?.addEventListener('click', () => {
    bet = 10
    updateBetDisplay(bet);
})

betBtn50?.addEventListener('click', () => {
    bet = 50
    updateBetDisplay(bet);
})

betBtn100?.addEventListener('click', () => {
    bet = 100
    updateBetDisplay(bet);
})

betBtn250?.addEventListener('click', () => {
    bet = 250
    updateBetDisplay(bet);
})

betBtn500?.addEventListener('click', () => {
    bet = 500
    updateBetDisplay(bet);
})

betBtn750?.addEventListener('click', () => {
    bet = 750
    updateBetDisplay(bet);
})

betBtn1000?.addEventListener('click', () => {
    bet = 1000
    updateBetDisplay(bet);
})