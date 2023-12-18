import "../sass/main.scss"
interface Symbol {
    name: string;
    imageUrl: string;
}

const symbols: Symbol[] = [{name: "spade", imageUrl: "../assets/spade.png"},{name: "heart", imageUrl: "../assets/heart.png"}, {name: "club", imageUrl: "../assets/club.png"}, {name: "bonus", imageUrl: "../assets/bonus.png"}]
const reel1 = document.getElementById('reel1') as HTMLElement
const reel2 = document.getElementById('reel2') as HTMLElement
const reel3 = document.getElementById('reel3') as HTMLElement

const generatedSymbolsReel1: string[] = [];
const generatedSymbolsReel2: string[] = [];
const generatedSymbolsReel3: string[] = [];
const shuffleArray = (array: Symbol[]): Symbol[] => {
    for(let i = array.length -1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i]
        array[i] = array[j];
        array[j] = temp;
    }
    return array
}

function addSymbolsToReel(symbols: Symbol[], reelContainer: HTMLElement, generatedSymbols: string[]): void{

    symbols.forEach(symbol => {
        const symbolDiv = document.createElement('div');
        symbolDiv.classList.add('symbol');
        const symbolImage = document.createElement('img');
        symbolImage.src = symbol.imageUrl;
        symbolImage.alt = symbol.name;

        symbolDiv.appendChild(symbolImage);
        reelContainer.appendChild(symbolDiv)
        generatedSymbols.push(symbol.name)
    })

}

addSymbolsToReel(shuffleArray(symbols), reel1, generatedSymbolsReel1)
addSymbolsToReel(shuffleArray(symbols), reel2, generatedSymbolsReel2)
addSymbolsToReel(shuffleArray(symbols), reel3, generatedSymbolsReel3)
addSymbolsToReel(shuffleArray(symbols), reel1, generatedSymbolsReel1)
addSymbolsToReel(shuffleArray(symbols), reel2, generatedSymbolsReel2)
addSymbolsToReel(shuffleArray(symbols), reel3, generatedSymbolsReel3)
addSymbolsToReel(shuffleArray(symbols), reel1, generatedSymbolsReel1)
addSymbolsToReel(shuffleArray(symbols), reel2, generatedSymbolsReel2)
addSymbolsToReel(shuffleArray(symbols), reel3, generatedSymbolsReel3)
addSymbolsToReel(shuffleArray(symbols), reel1, generatedSymbolsReel1)
addSymbolsToReel(shuffleArray(symbols), reel2, generatedSymbolsReel2)
addSymbolsToReel(shuffleArray(symbols), reel3, generatedSymbolsReel3)
addSymbolsToReel(shuffleArray(symbols), reel1, generatedSymbolsReel1)
addSymbolsToReel(shuffleArray(symbols), reel2, generatedSymbolsReel2)
addSymbolsToReel(shuffleArray(symbols), reel3, generatedSymbolsReel3)


function applyBounceToWinningSymbols(lineIndex: number) {

    const reel1Symbol = document.querySelector(`#reel1 .symbol:nth-child(${lineIndex + 1})`);
    const reel2Symbol = document.querySelector(`#reel2 .symbol:nth-child(${lineIndex + 1})`);
    const reel3Symbol = document.querySelector(`#reel3 .symbol:nth-child(${lineIndex + 1})`);

    reel1Symbol?.classList.add("bounce");
    reel2Symbol?.classList.add("bounce");
    reel3Symbol?.classList.add("bounce");
}

function applyBounceToDiagonalWinners(isDiagonalWinner: boolean, diagonal: string) {
    if (isDiagonalWinner) {
        if (diagonal === 'topLeftToBottomRight') {
            document.querySelector('#reel1 .symbol:nth-child(1)')?.classList.add('bounce');
            document.querySelector('#reel2 .symbol:nth-child(2)')?.classList.add('bounce');
            document.querySelector('#reel3 .symbol:nth-child(3)')?.classList.add('bounce');
        } else if (diagonal === 'bottomLeftToTopRight') {
            document.querySelector('#reel1 .symbol:nth-child(3)')?.classList.add('bounce');
            document.querySelector('#reel2 .symbol:nth-child(2)')?.classList.add('bounce');
            document.querySelector('#reel3 .symbol:nth-child(1)')?.classList.add('bounce');
        }
    }
}


function checkForWinningLinesAndApplyBounce() {

    const translateY = -159;
    const symbolHeight = 14.88;
    const firstVisibleSymbolIndex = Math.abs(translateY) / symbolHeight;
    const numberOfVisibleSymbols = 3;
    
    
    const visibleSymbolsReel1 = generatedSymbolsReel1.slice(firstVisibleSymbolIndex, firstVisibleSymbolIndex + numberOfVisibleSymbols);
    const visibleSymbolsReel2 = generatedSymbolsReel2.slice(firstVisibleSymbolIndex, firstVisibleSymbolIndex + numberOfVisibleSymbols);
    const visibleSymbolsReel3 = generatedSymbolsReel3.slice(firstVisibleSymbolIndex, firstVisibleSymbolIndex + numberOfVisibleSymbols);
    
    if(visibleSymbolsReel1[0] === visibleSymbolsReel2[0] && visibleSymbolsReel2[0] === visibleSymbolsReel3[0])
    {
        applyBounceToWinningSymbols(0)
        console.log("Line 1 win");
    }
    if(visibleSymbolsReel1[1] === visibleSymbolsReel2[1] && visibleSymbolsReel2[1] === visibleSymbolsReel3[1])
    {
        applyBounceToWinningSymbols(1)
        console.log("Line 2 win");
    }
    if(visibleSymbolsReel1[2] === visibleSymbolsReel2[2] && visibleSymbolsReel2[2] === visibleSymbolsReel3[2])
    {
        applyBounceToWinningSymbols(2)
        console.log("Line 3 win");
    }
    const isDiagonalWinner1 = visibleSymbolsReel1[0] === visibleSymbolsReel2[1] && visibleSymbolsReel2[1] === visibleSymbolsReel3[2];
    applyBounceToDiagonalWinners(isDiagonalWinner1, 'topLeftToBottomRight');
    const isDiagonalWinner2 = visibleSymbolsReel1[2] === visibleSymbolsReel2[1] && visibleSymbolsReel2[1] === visibleSymbolsReel3[0];
    applyBounceToDiagonalWinners(isDiagonalWinner2, 'bottomLeftToTopRight');
}

function resetAnimations() {
    document.querySelectorAll('.symbol.bounce').forEach(symbol => symbol.classList.remove('bounce'));
}

function startSpinning(reelSymbols: HTMLElement, animationDuration: number, callback: () => void) {
    reelSymbols.style.animation = "none";

    setTimeout(() => {
        reelSymbols.style.animation = `spin ${animationDuration}s linear forwards`;
        setTimeout(callback, animationDuration * 1000);
    }, 0);
}


document.getElementById('spinButton')?.addEventListener('click', () => {
    resetAnimations();

    generatedSymbolsReel1.length = 0;
    generatedSymbolsReel2.length = 0;
    generatedSymbolsReel3.length = 0;

    const animationDuration: number = Math.random() + 0.5;

    reel1.innerHTML = ""
    reel2.innerHTML = ""
    reel3.innerHTML = ""
    addSymbolsToReel(shuffleArray(symbols), reel1, generatedSymbolsReel1)
    addSymbolsToReel(shuffleArray(symbols), reel2, generatedSymbolsReel2)
    addSymbolsToReel(shuffleArray(symbols), reel3, generatedSymbolsReel3)
    addSymbolsToReel(shuffleArray(symbols), reel1, generatedSymbolsReel1)
    addSymbolsToReel(shuffleArray(symbols), reel2, generatedSymbolsReel2)
    addSymbolsToReel(shuffleArray(symbols), reel3, generatedSymbolsReel3)
    addSymbolsToReel(shuffleArray(symbols), reel1, generatedSymbolsReel1)
    addSymbolsToReel(shuffleArray(symbols), reel2, generatedSymbolsReel2)
    addSymbolsToReel(shuffleArray(symbols), reel3, generatedSymbolsReel3)
    addSymbolsToReel(shuffleArray(symbols), reel1, generatedSymbolsReel1)
    addSymbolsToReel(shuffleArray(symbols), reel2, generatedSymbolsReel2)
    addSymbolsToReel(shuffleArray(symbols), reel3, generatedSymbolsReel3)
    addSymbolsToReel(shuffleArray(symbols), reel1, generatedSymbolsReel1)
    addSymbolsToReel(shuffleArray(symbols), reel2, generatedSymbolsReel2)
    addSymbolsToReel(shuffleArray(symbols), reel3, generatedSymbolsReel3)
    addSymbolsToReel(shuffleArray(symbols), reel1, generatedSymbolsReel1)
    addSymbolsToReel(shuffleArray(symbols), reel2, generatedSymbolsReel2)
    addSymbolsToReel(shuffleArray(symbols), reel3, generatedSymbolsReel3)

    
    startSpinning(reel1, animationDuration, checkForWinningLinesAndApplyBounce);
    startSpinning(reel2, animationDuration, checkForWinningLinesAndApplyBounce)
    startSpinning(reel3, animationDuration, checkForWinningLinesAndApplyBounce)

    checkForWinningLinesAndApplyBounce();
})