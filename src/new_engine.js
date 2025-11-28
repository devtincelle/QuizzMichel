
function SlideManager(){
    this.slide_table = []
    this.current_slide = undefined
    this.register = function(slide_name,element_id){
        this.slide_table[slide_name] =element_id
    }
    this.show = function(slide_name){
        for (const key in this.slide_table) {
            console.log(key)
            var el = document.getElementById(this.slide_table[key]);
            if(el==null){
                continue
            }
            if(key!=slide_name){
                el.style.display = "none";
            }else{
                el.style.display = "block";
            }
        }
    }
    this.next_slide = function(){
        
    }
    
}
window.SlideManager = SlideManager


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
    this.slides = new SlideManager()
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
        if(this.state_table[name]==undefined){
            return this
        }
        var state = this.state_table[name]
        this.slides.show(name)
        this.current_state = name
        state.render()
    }    
    this.update= function(){
        if(this.state_table[this.current_state]==undefined){
            return this
        }
        var state = this.state_table[this.current_state]

        state.udpate()
    }
    this.connect_states = function(state_A,state_B){
        const connection = new GameStateConnection(state_A,state_B)
        this.state_connections[state_A] = connection
    }
    this.next_state=function(){
        const connection = this.state_connections[this.current_state]
        if(connection==undefined){
            return this
        }
        const card = document.getElementById(this.current_state);
        card.style.animation = "fadeOut 0.5s backwards";

        setTimeout(() => {
            const next_state = connection.next()
            const card = document.getElementById(next_state);
            card.style.animation = "fadeIn 1s backwards";
            this.show_state(connection.next())

        }, this.transition_time);
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
            this.current_index++
            return this.this.questions[this.current_index]
        }
        this.restart()
        return this.questions[this.current_index]
    }
    this.is_last = function(){
        return this.current_index==this.questions.length-1
    }    
    this.is_middle = function(){
        return this.current_index==(Math.round(this.questions.length-1)/2)
    }
    this.get_current = function(){
        return this.questions[this.current_index]
    }

    this.shuffle_answers = function(){
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
    this.inscrement_score = function(){
        this.score+=1
    }
    this.reset = function(){
        this.score = 0
    }
}

function TeamsManager(){
    this.curren_index = 0
    this.teams = []
    this.reset = function(){
        this.teams = []
    }
    this.add = function(name){
        this.teams.push(new Team(name))
    }
    this.reset_scores = function(){
        for(t=0;t<this.teams.length;t++){
            this.teams[t].reset()
        }
    }
    this.restart = function(){
        this.current_index = 0
        return this.current_index
    }
    this.next = function(){
        if(this.current_index<this.teams.length-1){
            this.current_index++
            return this.teams[this.current_index]
        }
        this.restart()
        return this.teams[this.current_index]
    }
    this.increment_score= function(){
        this.teams[this.curren_index].score+=1
    }
    this.get_scores=function(){
        var scores = []
        for(t=0;t<this.teams.length;t++){
            scores[this.teams[t].name]=this.teams[t].score
        }
        return scores
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

function Quizz(){
    this.teams = new TeamsManager()
    this.questions = new QuestionManager()
    this.add_team = function(name){
        this.teams.add(name)
    }
    
    this.next_team = function(){
        return this.teams.next()
    }
    this.load_questions = function(list){
        this.questions.load(list)
    }
    this.next_question = function(){
        return this.questions.next()
    }
    this.is_last_question = function(){
        return this.questions.is_last()
    }    
    this.mid_question = function(){
        return this.questions.is_middle()
    }
    this.increment_current_team_score = function(){
        this.teams.inscrement_score()
    }
    
}
window.Quizz = Quizz
