
function SlideManager(){
    this.slide_table = []
    this.current_slide = undefined
    this.register = function(slide_name,element_id){
        this.slide_table[slide_name] =element_id
    }
    this.show = function(slide_name){
        //  animation code should be there 
        for (const key in this.slide_table) {
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
        this.current_slide = slide_name
    }
    this.next_slide = function(){
        
    }
    
}
window.SlideManager = SlideManager

function AnimatedSlideManager(){
    this.slide_table = [];
    this.current_slide = undefined;

    this.register = function (slide_name, element_id) {
        this.slide_table[slide_name] = element_id;

        const el = document.getElementById(element_id);
        if (!el) return;

        el.style.opacity = "0";
        el.style.display = "none";
        el.style.pointerEvents = "none";
        el.style.transition = "all 0.5s ease";
        el.style.transform = "translate(0,0) scale(1)";
    };

    this.show = function (slide_name, transition = "fade") {
        for (const key in this.slide_table) {
            const el = document.getElementById(this.slide_table[key]);
            if (!el) continue;

            el.style.transition = "opacity 0.5s ease, transform 0.5s ease";

            // ---------------------------------------------
            // OUTGOING SLIDES
            // ---------------------------------------------
            if (key !== slide_name) {

                if (key === this.current_slide) {
                    // Smooth fade-out
                    el.style.opacity = "0";
                    el.style.transform = "translate(0,0) scale(1)";
                    el.style.pointerEvents = "none";

                    // Only hide AFTER fade-out finishes
                    setTimeout(() => {
                        if (el.style.opacity === "0") {
                            el.style.display = "none";
                        }
                    }, 500);

                } else {
                    // Keep them visible but transparent (for smooth switch later)
                    el.style.opacity = "0";
                    el.style.transform = "translate(0,0) scale(1)";
                    // Hide later AFTER animation completes
                    setTimeout(() => {
                        if (el.style.opacity === "0" && key !== this.current_slide) {
                            el.style.display = "none";
                        }
                    }, 500);
                }

                continue;
            }

            // ---------------------------------------------
            // INCOMING SLIDE
            // ---------------------------------------------
            // Make slide visible BEFORE animation starts
            el.style.display = "flex";
            el.style.pointerEvents = "none";

            // Setup initial state based on transition type
            switch (transition) {
                case "slide-left":
                    el.style.transform = "translate(-40px,0)";
                    break;

                case "slide-right":
                    el.style.transform = "translate(40px,0)";
                    break;

                case "slide-up":
                    el.style.transform = "translate(0,40px)";
                    break;

                case "zoom":
                    el.style.transform = "scale(0.8)";
                    break;

                default:
                    el.style.transform = "translate(0,0) scale(1)";
                    break;
            }

            el.style.opacity = "0";

            // Trigger smooth transition *after* browser applies initial style
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    el.style.opacity = "1";
                    el.style.transform = "translate(0,0) scale(1)";
                    el.style.pointerEvents = "auto";
                });
            });
        }

        this.current_slide = slide_name;
    };
    
}
window.AnimatedSlideManager = AnimatedSlideManager
