<?php
/*
Plugin Name: Keyboard Shortcuts
Description: Provides extensible keyboard shortcuts for the WordPress admin area
Version:     0.1-alpha
Author:      John Blackbourn
Author URI:  https://johnblackbourn.com/
Plugin URI:  https://lud.icro.us/wordpress-keyboard-shortcuts
Text Domain: keyboard-shortcuts
Domain Path: /languages

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

defined( 'ABSPATH' ) or exit;

/*
 * We're only implementing keyboard shortcuts in the admin area for now. We'll look
 * at front-end keyboard shortcuts (eg. for the admin toolbar) at a later date.
 */

if ( is_admin() ) {

	require_once dirname( __FILE__ ) . '/class.plugin.php';
	require_once dirname( __FILE__ ) . '/class.shortcuts.php';

	Keyboard_Shortcuts::init( __FILE__ );

}
