
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

        }, 100);
    }
    
}
window.Game = Game
