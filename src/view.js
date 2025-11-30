
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



function animate_value(from, to, duration, callback) {
    const start = performance.now();

    function step(now) {
        const progress = Math.min((now - start) / duration, 1);
        const value = from + (to - from) * progress;
        callback(value);
        if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
}

function render_scores_podium() {
    let previous_scores = quizz.get_previous_scores();
    const scores = quizz.get_current_scores();
    const teams = Object.keys(scores);
    const max_score = Math.max(...Object.values(scores), 1);

 let html = `
    <div id="podium" style="
        display: flex;
        gap: 30px;
        justify-content: center;
        align-items: flex-end;
        height: 260px;
        margin-top: 20px;
    ">
    `;

    teams.forEach(team => {
        const previous = previous_scores[team] ?? 0;

        html += `
            <div style="display:flex; flex-direction:column; align-items:center;">

                <div id="score-text-${team}" style="
                    font-size:22px;
                    font-weight:bold;
                    margin-bottom:6px;
                ">
                    ${previous}
                </div>

                <div id="bar-${team}" style="
                    width: 60px;
                    height: ${(previous/max_score)*200}px;
                    background: linear-gradient(180deg, #4aa3ff 0%, #1e7ae0 100%);
                    border-radius: 6px 6px 0 0;
                    transition: height 0.5s linear;
                "></div>

                <div style="margin-top:8px;font-size:20px;font-weight:bold;">
                    ${team}
                </div>
            </div>
        `;
    });

    html += `</div>`;

    // After HTML is placed in the DOM, animate the bars
    setTimeout(() => {
        teams.forEach(team => {
            const old_val = previous_scores[team] ?? 0;
            const new_val = scores[team];

            const bar = document.getElementById(`bar-${team}`);
            const scoreText = document.getElementById(`score-text-${team}`);

            // Animate bar and score
            animate_value(old_val, new_val, 700, v => {
                // bar height
                const maxPx = 200;
                const h = (v / max_score) * maxPx;
                bar.style.height = h + "px";

                // score number count-up
                scoreText.textContent = Math.floor(v);
            });
        });

        // Save new scores for next animation
        previous_scores = { ...scores };
    }, 400);

    return html;

}

function render_scores_table() {
    let previous_scores = quizz.get_previous_scores();
    const scores = quizz.get_current_scores();

    // Create table
    let html = `
    <table id="score-table" style="
        border-collapse: collapse;
        font-size: 22px;
        margin: 10px 0;
    ">
    `;

    // First row: team names
    html += `<tr>`;
    for (const team in scores) {
        html += `
            <th style="
                border: 2px solid #444;
                padding: 10px 14px;
                background: #f0f0f0;
                text-align: center;
            ">${team}</th>
        `;
    }
    html += `</tr>`;

    // Second row: scores (animated)
    html += `<tr>`;
    for (const team in scores) {
        const old_val = previous_scores[team] ?? scores[team];
        const new_val = scores[team];

        // unique ID for each score cell
        html += `
            <td id="score-${team}" style="
                border: 2px solid #444;
                padding: 14px 18px;
                text-align: center;
                font-weight: bold;
            ">${old_val}</td>
        `;
    }
    html += `</tr></table>`;

    // Return HTML → animation happens after insertion
    setTimeout(() => {
        for (const team in scores) {
            const old_val = previous_scores[team] ?? scores[team];
            const new_val = scores[team];

            if (new_val > old_val) {
                const el = document.getElementById(`score-${team}`);
                animate_value(old_val, new_val, 400, v => {
                    el.textContent = v;
                });
            }
        }

        // store current scores for future comparisons
        previous_scores = { ...scores };
    }, 10);

    return html;
}

function addCenteredImage(slideId, imageSrc, width = "600px") {
    const slide = document.getElementById(slideId);
    if (!slide) return console.error("Slide not found:", slideId);

    // Create wrapper (ensures perfect centering)
    const wrapper = document.createElement("div");
    wrapper.className = "image-center-wrapper";

    // Create image
    const img = document.createElement("img");
    img.src = imageSrc;
    img.style.width = width;
    img.style.maxWidth = "90%";
    img.style.height = "auto";

    // Append
    wrapper.appendChild(img);
    slide.innerHTML = "";  // clear slide
    slide.appendChild(wrapper);
}