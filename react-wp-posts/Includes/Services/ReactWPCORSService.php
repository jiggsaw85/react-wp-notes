<?php

namespace ReactWPPosts\Services;

class ReactWPCORSService {

    public function register() {
        add_action('rest_api_init', [$this, 'add_headers']);
    }

    public function add_headers() {
        remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
        add_filter('rest_pre_serve_request', function($value) {
            header("Access-Control-Allow-Origin: *");
            header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
            header("Access-Control-Allow-Headers: Content-Type, Authorization");
            return $value;
        });
    }
}
