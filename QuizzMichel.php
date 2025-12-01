<?php

/*
Plugin Name: QuizzMichel
Description: Intègre le quiz via un shortcode [quizzmichel]
Version: 1.0
Author: Alexandre Cormier
*/

define('WP_DEBUG', true);
define('WP_DEBUG_LOG', true);

if (!defined('ABSPATH')) exit;

// --------------------------------------------------
//  ENQUEUE SCRIPTS + STYLES
// --------------------------------------------------
function quizzmichel_enqueue_assets() {

    $base = plugin_dir_url(__FILE__);


    // CSS
    wp_enqueue_style('quizzmichel_main',     $base . 'assets/quizz.css');
    wp_enqueue_style('quizzmichel_3dec',     $base . 'quizz/3dec/style.css');

    // JS
    wp_enqueue_script('quizzmichel_data',    $base . 'quizz/3dec/data.js', array(), null, true);
    wp_enqueue_script('quizzmichel_model',   $base . 'src/model.js', array(), null, true);
    wp_enqueue_script('quizzmichel_control', $base . 'src/control.js', array(), null, true);
    wp_enqueue_script('quizzmichel_view',    $base . 'src/view.js', array(), null, true);
}
add_action('wp_enqueue_scripts', 'quizzmichel_enqueue_assets');


// --------------------------------------------------
//  SHORTCODE
// --------------------------------------------------
function quizzmichel_shortcode() {

    ob_start(); ?>
    QUIZZ !
    <div id="slides" class="slide-container">
        <div id="intro" class="slide"></div>
        <div id="menu" class="slide"></div>
        <div id="question_title" class="slide"></div>
        <div id="question" class="slide"></div>
        <div id="correction" class="slide"></div>
        <div id="score" class="slide"></div>
        <div id="result" class="slide"></div>
        <div id="outro" class="slide"></div>
    </div>
    
    QUIZZ !
    <?php
    return ob_get_clean();
}

add_shortcode('quizzmichel', 'quizzmichel_shortcode');
