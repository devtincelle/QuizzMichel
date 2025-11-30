

function GameState(_name,_render_func,_udpate_func){
    this.name =_name
    this._render =_render_func
    this._udpate =_udpate_func
    this.render = function(){
        this._render(this.name)
    }        
    this.udpate = function(){
        this._udpate(this.name)
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
        var state = new GameState(state_name,_render_function,_update_function)
        this.state_table[state_name]=state
        this.slides.register(state_name,state_name)
    }    
    this.show_state= function(name){

        // Check if the current state exists in the state table
        if (this.state_table[name] === undefined) {
            return this;
        }
        
        var state = this.state_table[name];

        // show the state div 
        this.slides.show(name)

        // Check if the render function exists before calling it
        if (typeof state.render === "function") {
            state.render();
        }

        // this become the current game state ! 
        this.current_state = name
        return this;
    }    
    this.update = function() {
        // Check if the current state exists in the state table
        if (this.state_table[this.current_state] === undefined) {
            return this;
        }

        var state = this.state_table[this.current_state];

        // Check if the update function exists before calling it
        if (typeof state.update === "function") {
            state.update();
        }

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
        this.show_state(connection.next())

    }
    
}
window.Game = Game


function QuestionManager(){
    this.current_index = 0
    this.questions = []
    this.load = function(_list){
        this.questions = _list
    }   
    this.restart = function(){
        this.current_index = 0
        return this.current_index
    }
    this.next = function(){
        if(this.current_index<this.questions.length-1){
            this.current_index+=1
            return this.questions[this.current_index]
        }
        this.current_index = 0
        return this.questions[this.current_index]
    }
    this.is_last = function(){
        console.log("last_question")
        return this.current_index==this.questions.length-1
    }    
    this.is_middle = function(){
        return this.current_index==(Math.round(this.questions.length-1)/2)
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
    this.current_index = 0
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
        this.current_index = 0
        this.reset_scores()
        const scores = this.get_current_scores()
        if(scores == undefined){
            return this
        }
        this._score_history.push(scores)
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

    this.get_winner = function(){
        var high_score = 0
        var winner = undefined
        for(t=0;t<this.teams.length;t++){
            if (this.teams[t].score>high_score){
                high_score=this.teams[t].score
                winner = this.teams[t]
            }
        }
        return winner
    }
    
}
window.TeamsManager = TeamsManager

