const startBtn=document.querySelector('.start-btn');
const nextBtn=document.querySelector('.next');
const question=document.querySelector('.question');
const questionTab=document.querySelector('.question-tab');
const startTab=document.querySelector('.start-tab');
const questionChoice=document.querySelector('.question-choice');
const currentQuestionNumber=document.querySelector('.quest-no');
const actualTime=document.querySelector('.time');
const allQuestions=Array.from(questionChoice.children);
const rightSound=new Audio("correct.mp3");
const wrongSound=new Audio("wrong.mp3");
const score=document.querySelector('.score');
const music=document.querySelector('.music-logo');
let myAudio = new Audio('audio.mp3');
const correctAns=document.createElement('span');
const wrongAns=document.createElement('span');
const seconds=document.querySelector('.seconds');
const result=document.querySelector('.result');
const childDiv=document.querySelector('.child-div');
const correctPercentage=document.querySelector('.correct-value');
const inCorrectPercentage=document.querySelector('.incorrect-value');
const retryBtn=document.querySelector('.retry-btn');
wrongAns.innerHTML="&#10006;";
wrongAns.classList.add('wrong');
correctAns.innerHTML="&#10003;";
correctAns.classList.add('tick');
myAudio.volume = 0.5;
let index;
let totalTime;
let valueSelected=false;
function finalize(){
    let percent=parseInt((correctAnswer/25)*100);
    let inPer=100-percent;
    childDiv.style.width=`${percent}%`;
    correctPercentage.innerText=percent+"%";
    inCorrectPercentage.innerText=inPer+"%";
}
function changeBackgroundColor(x,color){
    x.style.backgroundColor=color;
}
function changeColor(x,color){
    x.style.color=color;
}
music.addEventListener('click',()=>{
      
            if(music.stop){
               music.innerHTML="&#119189;"
               music.stop=false;
               myAudio.play();
            }
            else{
            music.innerHTML="&#119188;";
            music.stop=true;
            myAudio.pause();   
            }
})
function changeValuefor5Seconds(){
        changeBackgroundColor(body,"#D4D69F")
       changeBackgroundColor(actualTime,"#C5B100")
       changeBackgroundColor(nextBtn,"#D4D69F")
       changeColor(nextBtn,"#C58800")
}
function changeValueFor15Seconds(){
        changeBackgroundColor(body,"#DBADAD");
       changeBackgroundColor(nextBtn,"#DBADAD")
       changeBackgroundColor(actualTime,"#C50C00 ");
       changeColor(nextBtn,"#C50C00")
}
let count;
let correctAnswer=0;
let questionNumber;
let myData=JSON.parse(localStorage.getItem("myData")) || {};
if(myData.count && myData.questionNumber){
    if(myData.count>=24){
        myData.count=-1;
        myData.questionNumber=1;
    }

}
else{
        myData.count=-1;
        myData.questionNumber=1;
}
count=myData.count;
questionNumber=myData.questionNumber;
function timer(){
wholevalue=30;
let time=setInterval(()=>{

    seconds.innerText=wholevalue; 
    if(wholevalue==30){
        changeBackgroundColor(body,"#CCE2C2")
       changeBackgroundColor(actualTime,"#02A409")
       changeBackgroundColor(nextBtn,"##CCE2C2")
       changeColor(nextBtn,"#fffff")
    }
    if(wholevalue===0){
        clearInterval(time);
        nextBtn.click();
    }
    else if(wholevalue==15){
       changeBackgroundColor(body,"#D4D69F")
       changeBackgroundColor(actualTime,"#C5B100")
       changeBackgroundColor(nextBtn,"#D4D69F")
       changeColor(nextBtn,"#C58800")
    }
    else if(wholevalue==5){
       changeBackgroundColor(body,"#DBADAD");
       changeBackgroundColor(nextBtn,"#DBADAD")
       changeBackgroundColor(actualTime,"#C50C00 ");
       changeColor(nextBtn,"#C50C00")
    }
    wholevalue--;
},1000)
return time;
}
const data = {
    question: [
        "Which planet is known as the 'Red Planet'?",
        "Who is known as the 'Father of the Computer'?",
        "The Great Wall of China was mainly built to protect against which group?",
        "What is the capital city of Canada?",
        "Which gas do humans exhale during respiration?",
        "The currency of Japan is:",
        "Who painted the famous 'Mona Lisa'?",
        "Which country is called the 'Land of the Rising Sun'?",
        "What is the largest organ in the human body?",
        "Which is the world’s longest river (by length)?",
        "Which element has the chemical symbol 'O'?",
        "Who developed the theory of relativity?",
        "Which country hosted the 2016 Summer Olympics?",
        "What is the capital of Australia?",
        "Which is the smallest continent in the world?",
        "In which year did World War II end?",
        "Which metal is liquid at room temperature?",
        "What is the national animal of Pakistan?",
        "Which country gifted the Statue of Liberty to the USA?",
        "Which is the fastest land animal?",
        "Who wrote the play 'Romeo and Juliet'?",
        "Which ocean is the largest by area?",
        "How many players are there in a cricket team?",
        "Which planet is the largest in the solar system?",
        "Which scientist discovered penicillin?"
    ],
    choice: [
        ["Venus", "Mars", "Jupiter", "Saturn"],
        ["Charles Babbage", "Alan Turing", "Thomas Edison", "Isaac Newton"],
        ["Mongols", "Japanese", "Russians", "Persians"],
        ["Toronto", "Vancouver", "Ottawa", "Montreal"],
        ["Oxygen", "Carbon dioxide", "Nitrogen", "Hydrogen"],
        ["Yen", "Yuan", "Won", "Ringgit"],
        ["Leonardo da Vinci", "Pablo Picasso", "Vincent van Gogh", "Michelangelo"],
        ["India", "Japan", "Thailand", "China"],
        ["Heart", "Brain", "Liver", "Skin"],
        ["Nile", "Amazon", "Yangtze", "Mississippi"],
        ["Oxygen", "Gold", "Osmium", "Iron"],
        ["Albert Einstein", "Isaac Newton", "Galileo Galilei", "Nikola Tesla"],
        ["Brazil", "China", "UK", "Japan"],
        ["Sydney", "Canberra", "Melbourne", "Brisbane"],
        ["Asia", "Europe", "Australia", "South America"],
        ["1940", "1942", "1945", "1948"],
        ["Mercury", "Aluminium", "Gallium", "Lead"],
        ["Markhor", "Lion", "Horse", "Tiger"],
        ["France", "Spain", "Germany", "Italy"],
        ["Cheetah", "Tiger", "Horse", "Leopard"],
        ["William Shakespeare", "Charles Dickens", "Jane Austen", "George Orwell"],
        ["Atlantic", "Indian", "Arctic", "Pacific"],
        ["9", "11", "10", "12"],
        ["Earth", "Jupiter", "Saturn", "Neptune"],
        ["Alexander Fleming", "Louis Pasteur", "Marie Curie", "Joseph Lister"]
    ],
    answer: [
        1, 
        0, 
        0, 
        2, 
        1, 
        0,
        0, 
        1, 
        3, 
        0, 
        0, 
        0, 
        0, 
        1, 
        2, 
        2, 
        0, 
        0, 
        0, 
        0, 
        0, 
        3, 
        1, 
        1, 
        0  
    ]
};
const body=document.querySelector('body');
body.classList.add('green-color');
question.innerText=data.question[count];
startBtn.addEventListener('click',()=>{
    questionTab.classList.remove('display-none');
    startTab.classList.add('display-none');
    body.classList.add('green-color');
    score.classList.remove('display-none');
    myAudio.play();
    nextBtn.click();
})
questionChoice.addEventListener('click',(e)=>{
    let x=Array.from(questionChoice.children);
    if(x.includes(e.target)){
        let value=e.target;
        index=parseInt(value.getAttribute('index'));
        if(index==data.answer[count]){
            value.append(correctAns);
            rightSound.play();
            clearInterval(totalTime);
            correctAnswer++;
            myData.score=correctAnswer;
            localStorage.setItem("myData",JSON.stringify(myData))
        }
        else{
            value.append(wrongAns);
            let correct=allQuestions[data.answer[count]];
            correct.append(correctAns);
            wrongSound.play();
            clearInterval(totalTime)

        }
        x.forEach((y)=>{
            y.classList.add('disabled');
        })
        nextBtn.classList.remove('disabled');
    }
})
nextBtn.addEventListener('click',()=>{
    count++;;
    console.log(count);
    if(count===25){
        questionTab.classList.add('display-none');
        result.classList.remove('display-none');
        clearInterval(totalTime);
        finalize();
    }
    else{
    myData.count=count;
    myData.questionNumber=questionNumber;
    localStorage.setItem("myData",JSON.stringify(myData));
       changeBackgroundColor(body,"#CCE2C2")
       changeBackgroundColor(actualTime,"#02A409")
       changeBackgroundColor(nextBtn,"##CCE2C2")
       changeColor(nextBtn,"#fffff")
    totalTime=timer();
    currentQuestionNumber.innerText=questionNumber;
    questionNumber++;
    question.innerText= data.question[count];
    allQuestions.forEach((x,i)=>{
    x.innerText= data.choice[count][i]
    let b=Array.from(questionChoice.children);
    b.forEach((y)=>{
        y.classList.remove('disabled');
    })

    if(!valueSelected){
        nextBtn.classList.add('disabled');
    }

})
    }

})
retryBtn.addEventListener('click',()=>{
    location.reload();
})






