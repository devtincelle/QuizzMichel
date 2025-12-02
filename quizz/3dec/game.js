

// ------------------------------
// QUIZ ENGINE - MODE BUZZER
// ------------------------------

let selected_answer = 0;
let selected_team = 0;
let locked = false;
let valid = false

const snow = new SnowFX("snow-container", 300);
snow.init();
snow.start();

var game = new Game()
var quizz = new Quizz()

quizz.load(QUIZZ_DATA)
//quizz.shuffle_answers()


// game. add sound
var game_sounds = {
    correct:new Audio('assets/correct.mp3'),
    incorrect:new Audio('assets/incorrect.mp3')
}


game.add_state("intro",function(id){
    quizz.restart()

    document.getElementById(id).innerHTML = "";
    addCenteredImage(id,"quizz/3dec/splash_screen.png",)

})
game.add_state("menu",function(id){},function(id){})

// QUESTION VIEW
game.add_state("question_title",function(id){
    //snow.restoreColors()
    
    document.getElementById(id).innerHTML = "";
    
    
    
    if(quizz.is_last_question()){
        game.apply_state("result")
        return
    }
    
    if(valid){
        game.apply_state("attribution")
        return
    }
    

    // iterate 
    quizz.next_question();
    quizz.next_team();

    const question = quizz.get_current_question()
    const team = quizz.get_current_team()
    const card = document.createElement("div");
    card.className = "card";
    card.id = "card";
    let test = question.is_demo ? "(test)" : ""
    
    card.innerHTML = `
    <h1>Question ${quizz.get_current_question_number()} / ${quizz.get_question_total()} ${test} </h1>
    `;

    document.getElementById(id).appendChild(card);
    
    selected_answer = 0;

},function(id){


})

//======================QUESTION========================
game.add_state("question",function(id){

    const question = quizz.get_current_question()
    const answers = question.answers
    
    const card = document.createElement("div");
    card.className = "card";
    card.id = "card";
    
    card.innerHTML = `
    <h1>${question.text}</h1>
        ${answers.map((a, i) =>
        `<div class="answer ${i === 0 ? "selected" : ""}" data-i="${i}">
                <span class = "question_number" > (${i+1}) </span> ${a.text}
            </div>`
            ).join("")}
            `;

    document.getElementById(id).innerHTML = "";
    document.getElementById(id).appendChild(card);
    
    selected_answer = 0;



    
},function(id){

    console.log(`select ${selected_answer} `)

    document.querySelectorAll(".answer").forEach(el => el.classList.remove("selected"));
    document.querySelectorAll(".answer")[selected_answer].classList.add("selected");
})


//======================CORRECTION========================
game.add_state("correction", function(id) {

    const question = quizz.get_current_question();
    const team = quizz.get_current_team();
    
    const card = document.createElement("div");
    card.className = "card";
    card.id = "card";
    
    const chosen = question.answers[selected_answer];
    valid = chosen.valid;

    if (chosen.valid != undefined) {
        if (valid) {
            //snow.setColor("green")
            game_sounds.correct.play();
        } else {
            snow.setColor("red")
            game_sounds.incorrect.play();
        }
    }

    const correction_text = question.correction;
    const valid_answer = question.get_valid_answer()

    let verdict_text = valid ? "bonne réponse !" : "mauvaise réponse !";

    // ⭐ SET CARD BACKGROUND BASED ON VALIDITY
    card.style.backgroundColor = valid ? "#82e082" : "#ff8b8b";
    card.style.transition = "background-color 0.3s ease";

    card.innerHTML = `
        <h1>${verdict_text}</h1>
        <h1>${valid_answer}</h1>
        <h1>${correction_text}</h1>
    `;

    document.getElementById(id).innerHTML = "";
    document.getElementById(id).appendChild(card);



    locked = false;

}, function(id){});


//======================SCORE========================
game.add_state("score",function(id){



    const chosen_team = quizz.get_team(selected_team)
    question = quizz.get_current_question();
    if(question.is_demo==false){
        chosen_team.increment_score()
    }

    const card = document.createElement("div");
    card.className = "card";
    card.id = "card";

    card.innerHTML = `
        <h1>${render_scores_podium()}</h1>
    `;

    document.getElementById(id).innerHTML = "";
    document.getElementById(id).appendChild(card);

    locked = false;

},function(id){

})
//======================SCORE========================
game.add_state("attribution",function(id){

    const teams = quizz.get_teams()
    valid=false

    console.log(teams)
    
    const card = document.createElement("div");
    card.className = "card";
    card.id = "card";
    
    card.innerHTML = `
    <h1>le point est donné à </h1>
        ${teams.map((t, i) =>
        `<div class="team ${i === 0 ? "selected" : ""}" data-i="${i}">
                 Equipe ${t.name}
            </div>`
            ).join("")}
            `;

    document.getElementById(id).innerHTML = "";
    document.getElementById(id).appendChild(card);
    
    selected_team = 0;
    
},function(id){
    document.querySelectorAll(".team").forEach(el => el.classList.remove("selected"));
    document.querySelectorAll(".team")[selected_team].classList.add("selected");

})

game.add_state("result",function(id){

    const card = document.createElement("div");
    card.className = "card";
    card.id = "card";

    const winners = quizz.get_winners()
    if(winners.length>1){
        winner = " Egalité "+[winners].join("  ")
    }else{
        winner = "L' équipe "+winners[0]+" a gagné le quizz !"
    }

   card.innerHTML = `
       <h1>${winner}</h1>
   `;

    document.getElementById(id).innerHTML = "";
    document.getElementById(id).appendChild(card);

    locked = false;

},function(id){

})




game.add_state("outro",function(id){

})



game.connect_states("intro","menu")
game.connect_states("menu","question_title")
game.connect_states("question_title","question")
game.connect_states("question","correction")
game.connect_states("correction","question_title")
game.connect_states("attribution","score")
// TODO add conditionnal states that go to state A or B 
game.connect_states("score","question_title")
game.connect_states("result","outro")
game.connect_states("outro","intro")

game.apply_state("intro")


document.addEventListener("keydown", (e) => {
    if (locked) return
    const answers = document.querySelectorAll(".answer");
    const teams = document.querySelectorAll(".team");
    if (e.key === "ArrowDown") {
        selected_answer = (selected_answer + 1) % answers.length;
        selected_team = (selected_team + 1) % teams.length;
        console.log(selected_team)
        console.log("DOWN")
        game.update()
    }    
    
    if (e.key === "ArrowUp") {
        selected_answer = (selected_answer - 1 + answers.length) % answers.length;
        selected_team = (selected_team - 1 + teams.length) % teams.length;
        console.log("UP")
        console.log(selected_team)
        game.update()
    }
    
    if (e.key === "ArrowLeft") {
        console.log("LEFT")
        
        game.update()
    }    
    if (e.key === "ArrowRigth") {
        console.log("RIGTH")
        game.update()
    }
    if (e.key === "Enter") {
        console.log("ENTER")
        game.next_state()
    }
});

