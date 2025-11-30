function Quizz(){
    this.teams = new TeamsManager()
    this.questions = new QuestionManager()
    this.load= function(quizz_data){
        this.questions.load(quizz_data.questions)
        this.teams.load(quizz_data.teams)
        this.questions.set_limit(quizz_data.question_limit)
        if(quizz_data.shuffle_answers){
            this.questions.shuffle_answers()
        }
    }
    this.restart = function(){
        this.questions.restart()
        this.teams.restart()
    }
    this.add_team = function(name){
        this.teams.add(name)
    }
    
    this.next_team = function(){
        return this.teams.next()
    }        
    this.increment_score  = function(){
        return this.teams.increment_score ()
    }    
    this.get_current_team= function(){
        return this.teams.get_current()
    }
    this.get_current_scores=function(){
        return this.teams.get_current_scores()
    }   
    this.get_previous_scores =function(){
        return this.teams.get_previous_scores ()
    }
    this.load_questions = function(list){
        this.questions.load(list)
    }
    this.next_question = function(){
        return this.questions.next()
    }    
    this.get_current_question = function(){
        return this.questions.get_current()
    }    
    this.get_current_question_number = function(){
        return this.questions.current_index+1
    }    
    this.get_question_total = function(){
        return this.questions.limit
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
    this.get_winner_team = function(){
        this.teams.get_winner()
    }

    
}
window.Quizz = Quizz
