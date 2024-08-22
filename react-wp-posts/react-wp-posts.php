<?php
/**
 * Plugin Name: React WP Posts
 * Description: A plugin to create and fetch WordPress posts via REST API from a React application.
 * Version: 1.1
 * Author: Rados Nikolic
 */

if (!defined('ABSPATH')) {
    exit;
}

require_once plugin_dir_path(__FILE__) . 'includes/class-reactwp-posts.php';
require_once plugin_dir_path(__FILE__) . 'includes/class-reactwp-posts-controller.php';
require_once plugin_dir_path(__FILE__) . 'includes/class-reactwp-cors.php';

function run_react_wp_posts() {
    $plugin = new ReactWPPosts();
    $plugin->run();
}
run_react_wp_posts();
