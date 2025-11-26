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

    var game_sounds = {
        correct:new Audio('assets/audio/correct.mp3'),
        incorrect:new Audio('assets/audio/incorrect.mp3')
    }


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
            font:"22px Arial",
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


    // FX
    function init_stars(_symbols,_population){
        stars = []
        for(var s = 0; s < _population ; s++){
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

    
    function init(){
        
        var slides = new SlideManager()
        slides.register("splashscreen")
        slides.register("game")
        slides.register("score")
        slides.register("intro")


        // MENU
        var menu_scene = new Scene("menu")
        menu_scene.set_background_color("red")
        menu_scene.init = function(){

            init_stars("#",CONFIG.number_of_stars)
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
            this.quizz.load_questions(QUESTIONS)
            this.quizz.start()
            init_stars(".",CONFIG.number_of_stars)
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
                        this.quizz.set_header("Bonne réponse !")
                        game_sounds.correct.play()
                        this.quizz.score+=1
                    }else{
                        quizz_scene.set_background_color("red")
                        game_sounds.incorrect.play()
                        this.quizz.set_header("Mauvaise réponse ... ")
                    }
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
            init_stars("#",CONFIG.number_of_stars)
            var message = "Bravo "+quizz_game.score+"% de bonnes réponses ! Merci d'avoir participé à 'Crêpe and Quizz' ! "
            this.end_message = new Text(message,{x:0,y:0}).set(game_layout.quizz_x,game_layout.quizz_y+50)
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

        slides.show("splashscreen")

    }

    function main_loop(){
        quizz_game.draw()
    }



    game_graphics.santa.src = 'assets/graphics/flying.png';
    
    game_graphics.santa.onload = function() {
        init()
        setInterval(main_loop)
    }



