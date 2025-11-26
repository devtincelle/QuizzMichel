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

