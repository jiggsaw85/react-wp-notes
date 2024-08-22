<?php

namespace ReactWPPosts\Controllers;

use ReactWPPosts\Interfaces\PostServiceInterface;
use WP_REST_Request;

class ReactWPPostsController {

    private PostServiceInterface $postService;

    public function __construct(PostServiceInterface $postService) {
        $this->postService = $postService;
    }

    /**
     * @param WP_REST_Request $request
     * @return mixed
     */
    public function create_post(WP_REST_Request $request) {
        return $this->postService->create($request);
    }

    /**
     * @param WP_REST_Request $request
     * @return mixed
     */
    public function get_posts(WP_REST_Request $request) {
        return $this->postService->getPosts($request);
    }

    /**
     * @param WP_REST_Request $request
     * @return mixed
     */
    public function edit_posts(WP_REST_Request $request) {
        return $this->postService->editPost($request);
    }

    /**
     * @param WP_REST_Request $request
     * @return mixed
     */
    public function delete_posts(WP_REST_Request $request) {
        return $this->postService->deletePost($request);
    }

    /**
     * @param WP_REST_Request $request
     * @return mixed
     */
    public function move_posts(WP_REST_Request $request) {
        return $this->postService->movePosts($request);
    }
}