<?php

namespace ReactWPPosts\Interfaces;

use WP_REST_Request;

interface PostServiceInterface {
    public function create(WP_REST_Request $request);
    public function getPosts(WP_REST_Request $request);
    public function editPost(WP_REST_Request $request);
    public function deletePost(WP_REST_Request $request);
    public function movePosts(WP_REST_Request $request);
}