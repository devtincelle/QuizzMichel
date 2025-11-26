
    function Scene(_name){
        this._name = _name
        this._background_color = "black"
        this.buttons = []
        this.current_button = undefined
        this._game = undefined
        this.draw = function(){

        }        
        this.init = function(){
            
        }
        this.draw_buttons = function(){
            for(var b in this.buttons){
                this.buttons[b].draw()
            }
        }
        this.init_scene = function(){
            this.buttons = []
        }        
        this.set_background_color = function(_bgc){
            this._background_color = _bgc
        }
        this.draw_background = function(){
            context.fillStyle = this._background_color;
            context.fillRect(0, 0, canvas.width, canvas.height);
        }
        this.add_button = function(_name,_text,_x,_y){
            var button = new Button(_name,_text,this).set(_x,_y)
            this.buttons.push(button)
        }
        this.clicked=function(){
            ////console.log("clicked")
            ////console.log(this.current_button)
        }
    }
    window.Scene = Scene

    function Button(_name,_text,_scene){
        this.x = 0
        this.y = 0
        this.hover_color = "blue"
        this.idle_color = game_colors.background
        this.width = canvas.width
        this.height = 60
        this._name = _name
        this._text = _text
        this._scene = _scene

        this.set = function(_x,_y){
            this.x = _x
            this.y = _y
            return this
        }

        this.draw = function(){
            var color = this.idle_color
            //detect mouse hover
            if( mouse_in_box(this.x,this.y, this.width, this.height)==true){
                color = this.hover_color
                this._scene.current_button = this
            }else{

            }
            context.fillStyle = color;
            context.fillRect(this.x,this.y, this.width, this.height);
            context.fillStyle = game_colors.text;
            context.font = game_layout.font;                           
            context.fillText(this._text,this.x+10,this.y+30);                               
        }
        
    }
    window.Button = Button

    function Text(_content,_parent){
        
        this._parent = _parent
        this.x = 0
        this.y = 0
        this.adjust_x = 5
        this.adjust_y = 20
        this.content = _content
        this.animated_content =""
        this.color = game_colors.text
        this.bottom_y = 0
        this.wrap_limit = game_layout.quizz_width/18
        this.set = function(_x,_y){
            this.x = _x
            this.y = _y
            return this
        }
        this.set_content = function(_c){
            this.content = _c
        }
        this.set_color = function(_c){
            this.color = _c
        }

        this.get_number_of_lines = function(){
            return this._split(this.animated_content).length
        }        

        this.get_height = function(){
            return this.get_number_of_lines()*game_layout.interline
        }        
        this.get_width = function(){
            return game_layout.quizz_width
        }

        this._split = function(_content){
            var lines = []
            var current_line = ""
            var current_char = ""
            var limit =this.wrap_limit
            var count = 0
            for (var l = 0 ; l<_content.length;l++){
                current_char = _content[l]
                current_line+=current_char
                if(count>=limit && current_char==" "){
                    lines.push(current_line)
                    count=0
                    current_line = ""
                    continue
                }                
                if(count>=limit+10 && current_char!=" "){
                    lines.push(current_line+"-")
                    count=0
                    current_line = ""
                    continue
                }
                if(l==_content.length-1){
                    lines.push(current_line)
                }
                count+=1

            }
            return lines
        }

        this.draw = function () {
            this.bottom_y = 0;

            if (this.animation_tick % 8 == 0) {
                this.animated_content = this.truncate_line(this.content, this.displayed_letters);
                this.displayed_letters += 1;
            }

            var lines = this._split(this.animated_content);
            var offset_y = this._parent.y + this.y;
            var x = this._parent.x + this.x;
            var y = offset_y;

            for (var l in lines) {
                y = offset_y + (l * game_layout.interline);

                context.fillStyle = this.color;
                context.font = game_layout.font;

                // Safe jitter that does not break accents
                const jitterX = 0;
                const jitterY = 0;

                context.fillText(
                    lines[l],
                    x + this.adjust_x + jitterX,
                    y + this.adjust_y + jitterY
                );
            }

            this.animation_tick += 1;

            return (this.bottom_y = y);
        }

        this.animation_tick = 0
        this.displayed_letters = 0

        this.truncate_line = function(_line,_index){
            if (_index >= _line.length) return _line;
            return _line.slice(0, _index + 1);
        }

    }
    window.Text = Text



    function Quizz(_scene){

        this._scene = _scene
        this.questions_list = []
        this.questions = []
        this.score = 0
        this.current_question = undefined
        this.question_index = 0
        this.has_ended = false
        this.state = "question"
        this.header = undefined
        this.width = game_layout.quizz_width
        this.height = game_layout.quizz_height
        this.x = game_layout.quizz_x
        this.y= game_layout.quizz_y
        this.max_questions = 10
        
        this.load_questions = function(_data){
            for (var q in _data.questions){
                this.questions_list.push(new Question(this).load(_data.questions[q]).set(0,game_layout.margin_top))
            }
            this.questions_list = shuffle_array(this.questions_list)
            for (let i = 0; i < Math.min(this.questions_list.length, this.max_questions); i++){
                this.questions.push(this.questions_list[i]);
            }

            this.header = new Text("?",this).set(0,game_layout.margin_top)
            this.update_question_number()

        }

        this.set_header = function(_content){
            var display_index = this.question_index+1
            this.header.set_content("Question "+display_index+"/"+this.questions.length+"  "+_content)
        }
        
        this.draw = function(){
            if(this.current_question==undefined){
                return this
            }
            this.header.draw()
            this.current_question.set(this.x,this.y+100)
            this.current_question.draw(this.state)
            return this  
        }

        this.start = function(){
            this.has_ended = false
            this.current_question = this.questions[this.question_index]
        }        

        this.set_state = function(_s){
            this.state = _s
        }

        this.update_question_number = function(){
            var display_index = this.question_index+1
            this.set_header("")
        }

        this.next = function(){
            this.question_index+=1
            this.update_question_number()
            if(this.question_index<this.questions.length){
                ////console.log(this.question_index)
                this.current_question = this.questions[this.question_index]
                this.set_state("question")
            }else{
                this.has_ended = true
                ////console.log("END OF QUIZZ")
                this.set_state("end")
            }
        }
        
        

    }
    window.Quizz = Quizz


    function Question (_quizz){

        this.text = ""
        this.correction = ""
        this.answers = []
        this.x = 0
        this.y = 0
        this.width = 0
        this.height = 0
        this._quizz = _quizz
        this.selected_answer = undefined
        
        this.load = function(_data){
            this.text = new Text(_data.text,this)
            this.correction = new Text(_data.correction,this)
            for(var i = 0 ; i < _data.answers.length;i++){
                this.answers.push(new Answer(this).load(_data.answers[i]))
            }
            this.answers = shuffle_array(this.answers)
            return this
        }
        
        this.set = function(_x,_y){
            this.x = _x
            this.y = _y
            return this
        }

        this.draw = function(_part){
            if(_part =="question"){
                context.strokeStyle  = "blue";
                context.strokeRect(this.x-10,this.y-10, this.text.get_width()+game_layout.margin_top, game_layout.quizz_height);
                this.text.draw()
                var next_y = this.y+this.text.get_height()+game_layout.margin_top
                this.draw_answers(this.x,next_y)
            }
            if(_part =="correction"){
                context.strokeStyle  = "white";
                context.strokeRect(this.x-10,this.y-10, this.text.get_width()+game_layout.margin_top, game_layout.quizz_height);
                this.correction.draw()
            }
            return this    
        }
        
        this.draw_answers = function(_x,_y){
            //console.log(_y)
            var gap = 30
            var next_y = _y
            for(var a = 0 ; a < this.answers.length ; a++){
                this.answers[a].set(_x,next_y)  
                this.answers[a].draw()    
                next_y += this.answers[a].get_height() 
            }
            return this
        }

        this.select = function(_answer){
            this.selected_answer = _answer
        }
    }
    window.Question = Question

    function Answer(_question){
        this.x = 0
        this.y = 0
        this.hover_color = "yellow"
        this.idle_color = "white"
        this.text = new Text("",this)
        this.valid = false
        this.width = 400
        this.height = 30
        this._question = _question

        this.get_height = function(){
            var nb_lines = this.text.get_number_of_lines()
            return this.height*nb_lines
        }

        this.load = function(_data){
            this.text.set_content(_data.text)
            this.valid = _data.valid            
            return this
        }

        this.set = function(_x,_y){
            this.x = _x
            this.y = _y
            return this
        }

        this.draw = function(){
            var color = this.idle_color
            var nb_lines = this.text.get_number_of_lines()
            var hitW = this.text.get_width();
            if (mouse_in_box(this.x, this.y, hitW, this.height * nb_lines)){
                this._question.select(this);
                context.fillStyle = "blue";
                context.fillRect(this.x, this.y, hitW, this.height * nb_lines);
            }
            this.text.set_color(color)
            this.text.draw()
            return this                              
        }
        
    }    
    window.Answer = Answer






    function Star (_x,_y){
        this.x = _x
        this.y = _y
        this.vx = 0
        this.vy = 0
        this.friction_x = 0.8
        this.friction_y = 0.8
        this.width = 3
        this.height = 15
        this.top = 10
        this.left = 10
        this.symbol = "*"
        this.set = function(_x,_y){
            this.x = _x
            this.y = _y
        }
        this.apply_force = function(_x,_y){
            this.vx+=_x
            this.vy+=_y
            this.update_position()
        }        
        this.update_position = function(){
            this.vx*=this.friction_x        
            this.vy*=this.friction_y       
            this.x+=this.vx*0.5
            this.y+=this.vy*0.5
        }
        this.draw = function(){
            colors = ["black","yellow","blue","green","red","black"]
            random_color = colors[Math.round(Math.random()*colors.length)]
            context.fillStyle = random_color;
            context.font = game_layout.font;                           
            context.fillText(this.symbol,this.x,this.y);  
            /*


            context.fillStyle = "white";
            context.beginPath();
            context.arc(this.x, this.y, this.width , 0, 2 * Math.PI);
            context.fill();
            */
            //context.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    window.Star = Star



    function Santa(_game){
        this.x = -500
        this.y = -100
        this.ready = false
        this.image = undefined
        this.init = function(){


        }
        this.update_position = function(){
            this.x+=0.6
            this.y+=(Math.random()*4)-2
            if(this.x>canvas.width+500){
                this.x=-500
                this.y = Math.random()*canvas.height
            }
        }
        this.draw = function(){
            this.update_position()
            context.drawImage(game_graphics.santa, this.x, this.y);
        }

    }
    window.Santa = Santa

    function Game(){
        this._ready = false
        this._current_scene = undefined
        this._scene_table = {}
        this._santa = new Santa()
        this.add_scene = function(_scene){
            _scene._game = this
            this._scene_table[_scene._name] = _scene
        }
        this.set_current_scene = function(_name){
            this._current_scene = this._scene_table[_name]
            this._current_scene.init()
        }
        this.draw = function(){
            this._current_scene.draw()
            //this._santa.draw()
        }
        this.next_scene = function(){

        }
    }
    window.Game = Game
    
    function SlideManager(){
        this.slide_table = []
        this.current_slide = undefined
        this.register = function(slide_name,element_id){
            this.slide_table[slide_name] =element_id
        }
        this.show = function(slide_name){
            for (const key in this.slide_table) {
                var el = document.getElementById(this.slide_table[key]);
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

