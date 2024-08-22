<?php

class ReactWPPosts {

    public function run() {
        $this->register_hooks();
    }

    private function register_hooks() {
        add_action('rest_api_init', [$this, 'register_rest_routes']);
        add_action('rest_api_init', [$this, 'add_cors_headers'], 15);
    }

    public function register_rest_routes() {
        $postController = new ReactWPPostsController();

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
    }

    public function add_cors_headers() {
        $cors = new ReactWPCORS();
        $cors->add_headers();
    }
}
