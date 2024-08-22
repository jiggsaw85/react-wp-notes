<?php
/**
 * Plugin Name: ReactWPPosts
 * Description: A plugin to create and fetch WordPress posts via REST API from a React application.
 * Version: 1.1
 * Author: Rados Nikolic
 */

use ReactWPPosts\Controllers\ReactWPPostsController;
use ReactWPPosts\Services\PostService;
use ReactWPPosts\Services\ReactWPCORSService;

if (!defined('ABSPATH')) {
    exit;
}

spl_autoload_register(function ($class) {
    $prefix = 'ReactWPPosts\\';
    $base_dir = __DIR__ . '/Includes/';

    $len = strlen($prefix);
    if (strncmp($prefix, $class, $len) !== 0) {
        return;
    }

    $relative_class = substr($class, $len);
    $file = $base_dir . str_replace('\\', '/', $relative_class) . '.php';

    if (file_exists($file)) {
        require $file;
    }
});

function run_react_wp_posts() {
    $corsService = new ReactWPCORSService();
    $corsService->register();

    $postService = new PostService();

    $postController = new ReactWPPostsController($postService);

    add_action('rest_api_init', function() use ($postController) {
        register_rest_route('react-wp/v1', '/create-post', [
            'methods' => 'POST',
            'callback' => [$postController, 'create_post'],
            'permission_callback' => '__return_true',
        ]);

        register_rest_route('react-wp/v1', '/get-posts', [
            'methods' => 'GET',
            'callback' => [$postController, 'get_posts'],
            'permission_callback' => '__return_true',
        ]);

        register_rest_route('react-wp/v1', '/move-posts', [
            'methods' => 'POST',
            'callback' => [$postController, 'move_posts'],
            'permission_callback' => '__return_true',
        ]);

        register_rest_route('react-wp/v1', '/delete-posts', [
            'methods' => 'DELETE',
            'callback' => [$postController, 'delete_posts'],
            'permission_callback' => '__return_true',
        ]);

        register_rest_route('react-wp/v1', '/edit-post', array(
            'methods' => 'PUT',
            'callback' => [$postController, 'edit_posts'],
            'permission_callback' => '__return_true',
        ));
    });
}

run_react_wp_posts();
