function Quizz(){
    this.teams = new TeamsManager()
    this.questions = new QuestionManager()

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
        return this.questions.questions.length
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
    this.shuffle_answers  = function(){
        this.questions.shuffle_answers()
    }
    
}
window.Quizz = Quizz
