<?php
/*

Copyright © 2013 John Blackbourn

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

*/

class Keyboard_Shortcuts extends Keyboard_Shortcuts_Plugin {

	protected function __construct( $file ) {

		# Actions:
		add_action( 'admin_enqueue_scripts', array( $this, 'action_scripts' ) );
		add_action( 'admin_enqueue_styles',  array( $this, 'action_styles' ) );

		# Parent setup:
		parent::__construct( $file );

	}

	public function action_scripts() {

		wp_register_script(
			'mousetrap',
			$this->plugin_url( 'js/mousetrap.min.js' ),
			null,
			'1.4.5'
		);

		wp_register_script(
			'mousetrap-global-bind',
			$this->plugin_url( 'js/mousetrap-global-bind.min.js' ),
			array( 'mousetrap' ),
			'1.4.5'
		);

		wp_enqueue_script(
			'keyboard-shortcuts',
			$this->plugin_url( 'js/shortcuts.js' ),
			array( 'backbone', 'mousetrap', 'mousetrap-global-bind' ),
			$this->plugin_ver( 'js/shortcuts.js' )
		);

		wp_localize_script(
			'keyboard-shortcuts',
			'ia',
			self::get_ia_strings()
		);

	}

	public static function get_ia_strings() {

		$screen = get_current_screen();
		$links = array(
			'add_new_post'   => admin_url( 'post-new.php' ),
			'add_new_page'   => add_query_arg( 'post_type', 'page', admin_url( 'post-new.php' ) ),
			'add_new_media'  => admin_url( 'media-new.php' ),
			'add_new_user'   => admin_url( 'user-new.php' ),
			'go_to_posts'    => admin_url( 'edit.php' ),
			'go_to_pages'    => add_query_arg( 'post_type', 'page', admin_url( 'edit.php' ) ),
			'go_to_media'    => admin_url( 'upload.php' ),
			'go_to_users'    => admin_url( 'users.php' ),
			'go_to_comments' => admin_url( 'edit-comments.php' ),
		);
		$descriptions = array(
			'save_item'      => __( 'Save Item', 'keyboard-shortcuts' ),
			'add_new_item'   => __( 'Add New', 'keyboard-shortcuts' ),
			'preview_item'   => __( 'Preview', 'keyboard-shortcuts' ),
			'help'           => __( 'Help', 'keyboard-shortcuts' ),
			'add_new_post'   => get_post_type_object( 'post' )->labels->add_new_item,
			'add_new_page'   => get_post_type_object( 'page' )->labels->add_new_item,
			'add_new_media'  => __( 'Add New Media', 'keyboard-shortcuts' ),
			'add_new_user'   => __( 'Add New User', 'keyboard-shortcuts' ),
			'go_to_posts'    => get_post_type_object( 'post' )->labels->menu_name,
			'go_to_pages'    => get_post_type_object( 'page' )->labels->menu_name,
			'go_to_media'    => __( 'Media', 'keyboard-shortcuts' ),
			'go_to_users'    => __( 'Users', 'keyboard-shortcuts' ),
			'go_to_comments' => __( 'Comments', 'keyboard-shortcuts' ),
		);
		$dom = array(
			'save_item' => '.wrap form', # @TODO This particular selector isn't working currently. Find out why. Browser security issue?
		);

		switch ( $screen->base ) {

			case 'post':
			case 'edit':
				if ( 'post' == $screen->post_type )
					$links['add_new_item'] = admin_url( 'post-new.php' );
				else
					$links['add_new_item'] = add_query_arg( 'post_type', $screen->post_type, admin_url( 'post-new.php' ) );
				$dom['save_item'] = '#post';
				break;

			case 'edit-tags':
				$links['add_new_item'] = add_query_arg( 'taxonomy', $screen->taxonomy, admin_url( 'edit-tags.php' ) );
				$dom['save_item'] = '#edittag';
				break;

			case 'upload':
				$links['add_new_item'] = admin_url( 'media-new.php' );
				$dom['save_item'] = '#post';
				break;

			case 'comment':
				$dom['save_item'] = '#post';
				break;

			case 'users':
			case 'user-edit':
				$links['add_new_item'] = admin_url( 'user-new.php' );
				$dom['save_item'] = '#your-profile';
				break;

			case 'users-network':
			case 'user-edit-network':
				$links['add_new_item'] = network_admin_url( 'user-new.php' );
				$dom['save_item'] = '#your-profile';
				break;

			case 'sites-network':
			case 'site-info-network':
				$links['add_new_item'] = network_admin_url( 'site-new.php' );
				break;

			case 'plugins':
				// @TODO
				break;

			case 'themes':
				// @TODO
				break;

		}

		return compact( 'links', 'descriptions', 'dom' );

	}

	public function styles() {

		wp_enqueue_style(
			'keyboard-shortcuts',
			$this->plugin_url( 'css/shortcuts.css' ),
			null,
			$this->plugin_ver( 'css/shortcuts.css' )
		);

	}

	/**
	 * Singleton instantiator.
	 *
	 * @param string $file The plugin file (usually __FILE__) (optional)
	 * @return Keyboard_Shortcuts
	 */
	public static function init( $file = null ) {

		static $instance = null;

		if ( !$instance )
			$instance = new Keyboard_Shortcuts( $file );

		return $instance;

	}

}
