

function GameState(_name,_render_func,_update_func){
    this.type = "render"
    this.name =_name
    this._render =_render_func
    this._update =_update_func
    this.render = function(){
        this._render(this.name)
    }        
    this.update = function(){
        this._update(this.name)
    }    
}
window.GameState = GameState
function GameConditionnalState(_name,_decide_func,_state_true,_state_false){
    this.type = "condition"
    this.name =_name
    this._decide=_decide_func
    this.state_true =_state_true
    this.state_false =_state_false
    this.decide = function(){
        if(this._decide()){
            return this._state_true
        }
        return this._state_false
    }          
}
window.GameState = GameState


function GameStateConnection(_state_A,_state_B){
      this._state_A = _state_A
      this._state_B = _state_B
      this._condtion = true
      this.next = function(){
        if(this._condtion){
            return this._state_B
        }
      }
}
window.GameStateConnection = GameStateConnection

function Game(){
    this.transition_time = 100
    this.slides = new AnimatedSlideManager()
    this.function_table = []
    this.state_table = []
    this.current_state = null
    this.state_connections = []
    this.add_state = function(state_name,_render_function,_update_function){
        console.log(state_name)
        console.log(_render_function)
        console.log(_update_function)
        var state = new GameState(state_name,_render_function,_update_function)
        this.state_table[state_name]=state
        this.slides.register(state_name,state_name)
    }    
    this._apply_render_state= function(state){
        // show the state div 
        this.slides.show(state.name)

        // Check if the render function exists before calling it
        if (typeof state.render === "function") {
            state.render();
        }
        
        // this become the current game state ! 
        console.log("CURRENT STATE "+state.name)
        return this;
    }    
    this._apply_conditionnal_state= function(state){

        // Check if the render function exists before calling it
        if (typeof state.decide === "function") {
            var next_state = state.decide();
            this.apply_state(next_state)
        }
        
    }
    this.apply_state= function(name){

        // Check if the current state exists in the state table
        if (this.state_table[name] === undefined) {
            console.log("state "+name+" not found")
            return this;
        }
        
        var state = this.state_table[name];
        this.current_state = state.name

        if(state.type=="render"){
            return this._apply_render_state(state)
        }        
        if(state.type=="condition"){
            this.current_state = name
            return this._apply_conditionnal_state(state)
        }

        return this;
    }    
    this.update = function() {
        // Check if the current state exists in the state table
        if (this.state_table[this.current_state] === undefined) {
            console.log("state not found")
            return this;
        }

        var state = this.state_table[this.current_state];

        console.log(state)

        if(state.update===undefined){
            console.log("update function is undefined")
            return this
        }
        
        // Check if the update function exists before calling it
        if (typeof state.update !== "function") {
            console.log("no update function found")
            return this
        }
        state.update();

        return this;
    };
    this.connect_states = function(state_A,state_B){
        const connection = new GameStateConnection(state_A,state_B)
        this.state_connections[state_A] = connection
    }
    this.next_state=function(){
        const connection = this.state_connections[this.current_state]
        if(connection==undefined){
            return this
        }
        const next_state = connection.next()
        this.apply_state(connection.next())

    }
    
}
window.Game = Game


function Question(data){
    this.text = data.text
    this.answers = data.answers
    this.correction = data.correction
    this.get_valid_answer = function(){
        for(var a in this.answers){
            if(this.answers[a].valid){
                return this.answers[a].text
            }
        }
    }
}

function QuestionManager(){
    this.current_index = -1
    this.limit =undefined
    this.questions = []
    this.load = function(_list){
        for(var q in _list){
            this.questions.push(new Question(_list[q]))
        }
        this.limit = this.questions.length
        return this
    }   
    this.set_limit = function(_int){
        if(_int>this.questions.length){
            return
        }
        this.limit = _int
    }
    this.restart = function(){
        this.current_index = -1
        return this.current_index
    }
    this.next = function(){
        if(this.current_index<this.limit-1){
            this.current_index+=1
            return this.questions[this.current_index]
        }
        this.current_index = 0
        return this.questions[this.current_index]
    }
    this.is_last = function(){
        console.log("last_question")
        return this.current_index==this.limit-1
    }    
    this.is_middle = function(){
        return this.current_index === Math.floor((this.limit - 1) / 2);
    }
    this.get_current = function(){
        return this.questions[this.current_index]
    }

    this.shuffle_answers  = function(){
        this.questions.forEach(q => shuffleArray(q.answers));
    }

    function shuffleArray(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const tmp = arr[i];
            arr[i] = arr[j];
            arr[j] = tmp;
        }
    }

    

}
window.QuestionManager = QuestionManager

function Team(name){
    this.name = name
    this.score = 0
    this.increment_score = function(){
        this.score+=1
    }
    this.reset = function(){
        this.score = 0
    }
}

function TeamsManager(){
    this.current_index = -1
    this.teams = []
    this._score_history = []
    this.reset = function(){
        this.teams = []
    }
    this.load = function(team_name_list){
        for(var t in team_name_list){
            this.teams.push(new Team(team_name_list[t]))
        }
        return this
    }    
    this.add = function(name){
        this.teams.push(new Team(name))
        return this
    }
    this.reset_scores = function(){
        for(var t=0;t<this.teams.length;t++){
            this.teams[t].reset()
        }
    }
    this.restart = function(){
        this.current_index = -1
        this.reset_scores()
        return this
    }
    this.next = function(){
        console.log("NEXT")
        console.log(this.current_index)

        if(this.current_index<this.teams.length-1){
            this.current_index+=1
            return this.teams[this.current_index]
        }
        //loop
        this.current_index = 0
        return this.teams[this.current_index]
    }
    this.get_current = function(){
        return this.teams[this.current_index]
    }
    this.increment_score= function(){
        
        this.teams[this.current_index].score+=1
        const scores = this.get_current_scores()
        this._score_history.push(scores)
    }
    this.get_current_scores=function(){
        var scores = {}
        for(t=0;t<this.teams.length;t++){
            scores[this.teams[t].name]=this.teams[t].score
        }
        return scores
    }    
    this.get_previous_scores=function(){
        return this._score_history[this._score_history.length-1]
    }

    this.get_winners = function(){
        let high_score = -Infinity;
        let winners = [];

        for(t=0;t<this.teams.length;t++){
            const cur_team = this.teams[t]
            console.log(cur_team.score)
            if (cur_team.score > high_score){
                high_score=cur_team.score
                winners = [cur_team.name]
                continue
            }            
            if (high_score != 0 && cur_team.score == high_score){
                winners.push(cur_team.name)
            }
        }

        return winners
    }
    
}
window.TeamsManager = TeamsManager

