<?php

namespace ReactWPPosts\Services;

use ReactWPPosts\Interfaces\PostServiceInterface;
use WP_REST_Request;
use WP_REST_Response;

class PostService implements PostServiceInterface {

    /**
     * @param WP_REST_Request $request
     * @return WP_REST_Response
     */
    public function create(WP_REST_Request $request): WP_REST_Response {
        $params = $request->get_json_params();

        $category_name = sanitize_text_field($params['category']);
        $title = sanitize_text_field($params['title']);
        $description = sanitize_textarea_field($params['description']);

        $category_id = $this->getOrCreateCategory($category_name);
        if (is_wp_error($category_id)) {
            return new WP_REST_Response('Error creating category: ' . $category_id->get_error_message(), 500);
        }

        $post_id = wp_insert_post([
            'post_title'   => $title,
            'post_content' => $description,
            'post_status'  => 'publish',
            'post_author'  => get_current_user_id(),
            'post_category' => [$category_id],
        ]);

        if (is_wp_error($post_id)) {
            return new WP_REST_Response('Error creating post', 500);
        }

        return new WP_REST_Response('Post created successfully', 200);
    }

    /**
     * @param WP_REST_Request $request
     * @return WP_REST_Response
     */
    public function getPosts(WP_REST_Request $request): WP_REST_Response {
        $category_name = sanitize_text_field($request->get_param('category'));

        $args = [
            'post_type' => 'post',
            'post_status' => 'publish',
            'numberposts' => -1,
        ];

        if ($category_name !== 'all') {
            $category = get_term_by('name', $category_name, 'category');
            if ($category) {
                $args['category'] = $category->term_id;
            } else {
                return new WP_REST_Response('Category not found', 404);
            }
        }

        $posts = get_posts($args);
        $data = [];

        foreach ($posts as $post) {
            $data[] = [
                'id' => $post->ID,
                'title' => $post->post_title,
                'content' => $post->post_content,
                'category' => get_the_category($post->ID)[0]->name,
            ];
        }

        return new WP_REST_Response($data, 200);
    }

    /**
     * @param WP_REST_Request $request
     * @return WP_REST_Response
     */
    public function editPost(WP_REST_Request $request): WP_REST_Response {
        $params = $request->get_json_params();
        $post_id = $params['id'];
        $title = sanitize_text_field($params['title']);
        $description = sanitize_textarea_field($params['description']);

        $updated_post = array(
            'ID'           => $post_id,
            'post_title'   => $title,
            'post_content' => $description,
        );

        $result = wp_update_post($updated_post);

        if (is_wp_error($result)) {
            return new WP_REST_Response('Error updating post', 500);
        }

        return new WP_REST_Response('Post updated successfully', 200);
    }

    /**
     * @param WP_REST_Request $request
     * @return WP_REST_Response
     */
    public function deletePost(WP_REST_Request $request): WP_REST_Response {
        $params = $request->get_json_params();
        $post_ids = $params['ids'] ?? [];

        if (empty($post_ids) || !is_array($post_ids)) {
            return new WP_REST_Response('No post IDs provided or invalid format', 400);
        }

        $errors = [];

        foreach ($post_ids as $post_id) {
            $result = wp_delete_post($post_id);

            if (!$result) {
                $errors[] = "Error deleting post with ID: $post_id";
            }
        }

        if (!empty($errors)) {
            return new WP_REST_Response(['message' => 'Some posts could not be deleted', 'errors' => $errors], 500);
        }

        return new WP_REST_Response('Posts deleted successfully', 200);
    }

    /**
     * @param WP_REST_Request $request
     * @return WP_REST_Response
     */
    public function movePosts(WP_REST_Request $request): WP_REST_Response {
        $params = $request->get_json_params();
        $post_ids = $params['ids'] ?? [];

        $target_category = sanitize_text_field($params['target']);

        if (empty($post_ids) || !is_array($post_ids)) {
            return new WP_REST_Response('No post IDs provided or invalid format', 400);
        }

        $category_id = $this->getOrCreateCategory($target_category);
        if (is_wp_error($category_id)) {
            return new WP_REST_Response('Error creating or retrieving target category: ' . $category_id->get_error_message(), 500);
        }

        $errors = [];

        foreach ($post_ids as $post_id) {
            $result = wp_set_post_categories($post_id, [$category_id]);

            if (is_wp_error($result)) {
                $errors[] = "Error moving post with ID: $post_id";
            }
        }

        if (!empty($errors)) {
            return new WP_REST_Response(['message' => 'Some posts could not be moved', 'errors' => $errors], 500);
        }

        return new WP_REST_Response('Posts moved successfully', 200);
    }

    /**
     * @param string $category_name
     * @return array|int|int[]|mixed|\WP_Error
     */
    private function getOrCreateCategory(string $category_name) {
        $category = get_term_by('name', $category_name, 'category');

        if (!$category) {
            $category = wp_insert_term($category_name, 'category');
            if (is_wp_error($category)) {
                return $category;
            }
            return $category['term_id'];
        }

        return $category->term_id;
    }
}
