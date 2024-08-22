<?php

class ReactWPPostsController {

    public function create_post(WP_REST_Request $request) {
        $params = $request->get_json_params();

        $category_name = sanitize_text_field($params['category']);
        $title = sanitize_text_field($params['title']);
        $description = sanitize_textarea_field($params['description']);

        $category = get_term_by('name', $category_name, 'category');
        if (!$category) {
            $category = wp_insert_term($category_name, 'category');
            if (is_wp_error($category)) {
                return new WP_REST_Response('Error creating category: ' . $category->get_error_message(), 500);
            }
            $category_id = $category['term_id'];
        } else {
            $category_id = $category->term_id;
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

    public function get_posts(WP_REST_Request $request) {
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

    public function move_posts(WP_REST_Request $request) {
        $params = $request->get_json_params();

        $post_ids = array_map('intval', $params['ids']);
        $target_category_name = sanitize_text_field($params['target']);

        $target_category = get_term_by('name', $target_category_name, 'category');
        if (!$target_category) {
            $target_category = wp_insert_term($target_category_name, 'category');
            if (is_wp_error($target_category)) {
                return new WP_REST_Response('Error creating category: ' . $target_category->get_error_message(), 500);
            }
            $target_category_id = $target_category['term_id'];
        } else {
            $target_category_id = $target_category->term_id;
        }

        foreach ($post_ids as $post_id) {
            $result = wp_set_post_categories($post_id, [$target_category_id]);
            if (is_wp_error($result)) {
                return new WP_REST_Response('Error moving post ID ' . $post_id . ': ' . $result->get_error_message(), 500);
            }
        }

        return new WP_REST_Response('Posts moved successfully', 200);
    }

    public function delete_posts(WP_REST_Request $request) {
        $params = $request->get_json_params();

        $post_ids = array_map('intval', $params['ids']);
        $errors = [];

        foreach ($post_ids as $post_id) {
            $result = wp_delete_post($post_id, true);
            if (!$result) {
                $errors[] = "Failed to delete post ID $post_id.";
            }
        }

        if (!empty($errors)) {
            return new WP_REST_Response(['message' => 'Some posts could not be deleted.', 'errors' => $errors], 500);
        }

        return new WP_REST_Response('Posts deleted successfully', 200);
    }
}
