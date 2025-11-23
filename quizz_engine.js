    var canvas = document.getElementById("myCanvas");
    var context = canvas.getContext("2d");
    canvas.width  = window.innerWidth*0.7;
    canvas.height = window.innerHeight*0.7;
    var elemLeft = canvas.offsetLeft + canvas.clientLeft
    var elemTop = canvas.offsetTop + canvas.clientTop
    var actors = []
    var mouse_x = 0
    var mouse_y = 0
    var click_x = 0
    var click_y = 0
    var mouse_down = false

    var current_question_index = -1
    var current_question = 0
    var selected_answer = undefined

    var stars = [];


    var game_colors = {
        background:"black",
        text:"white",
        snowflakes:"grey"
    }    

    var game_layout = {}


    var game_graphics = {
        santa:new Image()
    }

    var padding = 50
    var score = 0

    var quizz_game = new Game()

    function update_layout(){

        var min_height= 1080
        var max_height= 1080
        var min_width = 1920
        var max_width = 1920
        var calculated_width = window.innerWidth > min_width ? window.innerWidth : min_width
        var calculated_eigth = window.innerHeight > min_height ? window.innerHeight : min_height

        if(calculated_eigth>max_height ){
            calculated_eigth = max_height
        }
        if(calculated_width>max_width ){
            calculated_width = max_width
        }

        canvas.width  = calculated_width
        canvas.height = calculated_eigth
    
        var font_size = 20

        var min_quizz_height = 330
        var min_quizz_wdth = 300
        var reduction = 0.5
        
        var quizz_width=canvas.width*reduction > min_quizz_wdth  ? canvas.width*reduction : min_quizz_wdth
        var quizz_height=canvas.height*reduction > min_quizz_height  ? canvas.height*reduction : min_quizz_height
        game_layout = {
            margin_top:30,
            interline:font_size,
            font_size:font_size,
            font:"20px Courier New",
            quizz_width:quizz_width,
            quizz_height:quizz_height,
            quizz_x:(canvas.width/2)-(quizz_width/2),
            quizz_y:50
        }        
    }
    update_layout()

    canvas.addEventListener('mousedown', function(e) {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

    })

    function shuffle_array(array) {
        for (var i = array.length - 1; i >= 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array
    }

    
    canvas.addEventListener('mouseup', function(e) {
        quizz_game._current_scene.clicked()
    })

    canvas.addEventListener("mousemove", (e) => {
        mouse_x = e.offsetX;
        mouse_y = e.offsetY;
    });

    function distance_to_mouse(_x,_y){
        const dx = mouse_x - _x;
        const dy = mouse_y - _y;
        return Math.sqrt(dx*dx + dy*dy);
    }


    function mouse_in_box(_x,_y,_w,_h){
        if(mouse_x > _x && mouse_x < _x+_w){
            if(mouse_y > _y && mouse_y < _y+_h){
                return true
            }
        }
        return false
    }

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

        this.draw = function(){
            this.bottom_y = 0
            if (this.animation_tick % 8 ==0){
                this.animated_content = this.truncate_line(this.content,this.displayed_letters)
                this.displayed_letters+=1
            }
            var lines = this._split(this.animated_content)
            var offset_y = this._parent.y+this.y
            var x = this._parent.x+this.x
            var y = offset_y
            
            for(var l in lines){
                y =offset_y+(l*game_layout.interline)
                context.fillStyle =this.color;
                context.font = game_layout.font
                x+=Math.random()*2
                y+=Math.random()*2

                context.fillText(lines[l], x+this.adjust_x, y+this.adjust_y);  
            }
            this.animation_tick+=1
            //console.log(y)
            return this.bottom_y = y
        }

        this.animation_tick = 0
        this.displayed_letters = 0

        this.truncate_line = function(_line,_index){
            if (_index >= _line.length) return _line;
            return _line.slice(0, _index + 1);
        }

    }



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
            context.fillStyle = "white";
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


    // FX
    function init_stars(_symbols){
        stars = []
        for(var s = 0; s < 100 ; s++){
            var rand_x = Math.random()*canvas.width
            var rand_y = Math.random()*canvas.height
            star = new Star(rand_x,rand_y)
            star.symbol = _symbols[Math.floor(Math.random()*_symbols.length)]
            stars.push(star)
        }
    }

    function draw_stars(){
        for(var s = 0 ; s < stars.length ; s++){
            base = 1
            f_x = (Math.random()*base)-base/2
            f_y = (Math.random()*base)-base/2
            stars[s].apply_force(f_x,f_y)
            stars[s].draw()
        }
    }

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
            this._santa.draw()
        }
        this.next_scene = function(){

        }
    }




    
    function init(){
        
        // MENU
        var menu_scene = new Scene("menu")
        menu_scene.set_background_color("red")
        menu_scene.init = function(){
            init_stars("#")
            ////console.log(this._name)
            this.add_button("start","Commencer le quizz --> ",0,canvas.height-50)
            
        }    
        menu_scene.draw = function(){
            this.draw_background()
            this.draw_buttons()
            draw_stars()
        }        
        menu_scene.clicked = function(){
            if (this.current_button==undefined){
                return
            }
            if(this.current_button._name == "start"){
                ////console.log("Commencer le quizz")
                this.current_button = undefined
                this._game.set_current_scene("quizz")
            }
        }
        
        // QUIZZ
        var quizz_scene = new Scene("quizz")
        quizz_scene.set_background_color("black")
        quizz_scene.init = function(){
            ////console.log(this._name)
            this.quizz = new Quizz(quizz_scene)
            this.add_button("next_question","Question suivante >",0,canvas.height-50)
            this.quizz.load_questions(QUIZZ_DATA)
            this.quizz.start()
            init_stars(".")
        }    
        quizz_scene.draw = function(){
            this.draw_background()
            draw_stars()
            this.quizz.draw()
            if(this.quizz.state=="correction"){
                this.draw_buttons()
            }
        }
        quizz_scene.clicked = function(){
            ////console.log(this.quizz.state)
            if(this.quizz.state=="question"){
                if(this.quizz.current_question.selected_answer!=undefined){
                    this.current_button=undefined
                    if(this.quizz.current_question.selected_answer.valid==true){
                        quizz_scene.set_background_color("green")
                        this.quizz.set_header("Correct")
                        this.quizz.score+=1
                    }else{
                        quizz_scene.set_background_color("red")
                        this.quizz.set_header("Incorrect")
                    }
                    ////console.log(this.quizz.score)
                    ////console.log((this.quizz.score/this.quizz.questions.length)*100)
                    this.quizz.current_question.selected_answer=undefined
                    this.quizz.set_state("correction")
                }
                return
            }            
            if(this.quizz.state=="correction"){
                if(this.current_button!=undefined && this.current_button._name == "next_question"){
                    quizz_scene.set_background_color("black")
                    this.quizz.next()
                    this.current_button=undefined
                    this.quizz.current_question.selected_answer=undefined
                    if(this.quizz.has_ended == true){
                        this._game.score = Math.floor((this.quizz.score/this.quizz.questions.length)*100)
                        this._game.set_current_scene("score")
                    }
                }
                return 
            }
            
        }
        
        // END SCORE 
        var score_scene = new Scene("score")
        score_scene.set_background_color("black")
        score_scene.init = function(){
            init_stars("*")
            var message = "Bravo "+quizz_game.score+"% de bonnes réponses ! Merci d'avoir fait ce quizz et Joyeux Noël ! "
            this.end_message = new Text(message,{x:0,y:0}).set(game_layout.quizz_x,game_layout.quizz_y+game_layout.margin_top)
            this.end_message.set_color("yellow")
            this.add_button("restart","<< Recommencer",0,canvas.height-50)
        }   
        score_scene.draw = function(){
            this.draw_background()
            this.end_message.draw()
            this.draw_buttons()
            var colors = ["yellow","red","green"]
            var random_color = colors[Math.floor(Math.random()*colors.length)]
            this.end_message.set_color(random_color)
            draw_stars()
        }
        score_scene.clicked = function(){
            if (this.current_button==undefined){
                return
            }
            if(this.current_button._name == "restart"){
                this.current_button = undefined
                this._game.set_current_scene("quizz")
                return 
            }
        }

        quizz_game.add_scene(menu_scene)
        quizz_game.add_scene(quizz_scene)
        quizz_game.add_scene(score_scene)
        quizz_game.set_current_scene("menu")
        //next_question()

    }

    function main_loop(){
        quizz_game.draw()
    }



    game_graphics.santa.src = 'http://www.collectif-les-etincelles.fr/wp-content/uploads/2024/11/santa_2.png';
    game_graphics.santa.onload = function() {
        init()
        setInterval(main_loop)
    }



