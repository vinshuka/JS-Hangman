//variables
let wordList = ['hello', 'there', 'sailor', 'javascript', 'programmer', 'hangman', 'elephant', 'bacon', 'algorithm', 'computer'];
let secretWord = '';
let guessedLetters = [];
let guessCounter = 0;
let validInput = /[abcdefghijklmnopqrstuvwxyz]/i;
let hangman = ['\t\t---------\n\t\t|\t|\n\t\t|\n\t\t|\n\t\t|\n\t\t|\n\t--------------------------',
'\t\t---------\n\t\t|\t|\n\t\t|\tO\n\t\t|\n\t\t|\n\t\t|\n\t--------------------------',
'\t\t---------\n\t\t|\t|\n\t\t|\tO\n\t\t|\t|\n\t\t|\n\t\t|\n\t--------------------------',
'\t\t---------\n\t\t|\t|\n\t\t|\tO\n\t\t|      /|\n\t\t|\n\t\t|\n\t--------------------------',
'\t\t---------\n\t\t|\t|\n\t\t|\tO\n\t\t|      /|\\\n\t\t|\n\t\t|\n\t--------------------------',
'\t\t---------\n\t\t|\t|\n\t\t|\tO\n\t\t|      /|\\\n\t\t|      /\n\t\t|\n\t--------------------------',
'\t\t---------\n\t\t|\t|\n\t\t|\tO\n\t\t|      /|\\\n\t\t|      / \\\n\t\t|\n\t--------------------------'];

//select random word
let getRandomWord = function(wordList)
{
    return wordList[Math.floor(Math.random() * wordList.length)];
}

//create word line
let createWordArea = function(secretWord)
{
    for(let i = 0; i < secretWord.length; i++)
    {
        let letter = document.createElement('li');
        letter.textContent = '_';
        $('.word').append(letter);
    }
    $('.word').css('list-style','none');
    $('li').css('display','inline');
    $('li').css('padding','10px');
}

//display the hangman
let displayHangman = function()
{
    $('.hangman').text(hangman[guessCounter]);
}

//game setup creates the word line and display the gallows
let setup = function(secretWord)
{
    createWordArea(secretWord);
    displayHangman();
}

//sets the letters on the word line
let setLetters = function(guess, secretWord)
{
    let indexes = [];
    for (let i = 0; i < secretWord.length; i++)
    {
        if(secretWord[i] === guess)
        {
            indexes.push(i);
        }
    }
    console.log(indexes);
    for (let i = 0; i < indexes.length; i++)
    {
        $('.word li:nth(' + indexes[i] + ')').text(guess);
    }
}

//grabs the word from the li elements
let grabWord = function()
{
    let word = '';
    for(let i = 0; i < secretWord.length; i++)
    {
        word += $('.word li:nth(' + i + ')').text();
    }
    return word;
}

//determine win/lose condition
let checkWinLose = function(word)
{
    if(word === secretWord)
    {
        $('.condition').text('WIN!');
        $('.condition').css('color','green');
        
    }
    if(guessCounter === 6)
    {
        $('.condition').text('LOSE...');
        $('.condition').css('color','red');
    }
}

let validateGuess = function(guess)
{
    return validInput.test(guess) && !guessedLetters.includes(guess);
}

$('#reset').click(function () 
{
    window.location.reload(false);
})

//select random word
secretWord = getRandomWord(wordList);

//game loop
setup(secretWord)
$('#subguess').click(function()
{
    let guess = $('#letterguess').val();
    if(validateGuess(guess))
    {
        if(secretWord.includes(guess))
        {
            setLetters(guess, secretWord);
            guessedLetters.push(guess);
            $('.prevguess').text(guessedLetters.toString());
            let word = grabWord();
            checkWinLose(word);
            displayHangman();
            $('#letterguess').focus();
        }
        else
        {
            guessedLetters.push(guess);
            $('.prevguess').text(guessedLetters.toString());
            guessCounter++;
            let word = grabWord();
            checkWinLose(word);
            displayHangman();
            $('#letterguess').focus();
        }
        $('#letterguess').val('');
        $('.error').text('');

    }
    else
    {
        $('.error').text('Letter is not valid or has already been guessed.');
        $('#letterguess').val('');
    }
});