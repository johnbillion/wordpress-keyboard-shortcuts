
// Shortcut model
var KeyboardShortcut = Backbone.Model.extend({
	defaults : {
		action : 'keypress',
		global : false
	}
});

// Shortcut collection
var KeyboardShortcutList = Backbone.Collection.extend({
	model : KeyboardShortcut
});

// Instantiate
window.keyboard_shortcuts = new KeyboardShortcutList();

var get_shortcut_callback = function( shortcut ) {

	return function( event, combo ) {
		event.preventDefault();
		shortcut.get( 'callback' ).call();
	};

};

// Shortcut event binder
keyboard_shortcuts.on( 'add', function( shortcut ) {

	if ( shortcut.get('global') )
		Mousetrap.bindGlobal( shortcut.get('combo'), get_shortcut_callback( shortcut ), shortcut.get('action') );
	else
		Mousetrap.bind( shortcut.get('combo'), get_shortcut_callback( shortcut ), shortcut.get('action') );

} );

(function($){

	// Interface Actions. These aren't coupled to keyboard shortcuts and can be invoked independently.
	ia = _.extend(ia,{

		save_item : function() {

			if ( ! this.dom.save_item )
				return;
			if ( ! $( this.dom.save_item ).length )
				return;

			// @TODO is this safe? For some reason it's needed when saving a post
			window.onbeforeunload = null;

			$( this.dom.save_item ).submit();

		},

		help : function() {

			// @TODO it would be awesome to record the current focus position before toggling the Help screen so
			// we can return to it when the Help screen is toggled off. #accessibility

			$('#contextual-help-link').click();

		},

		add_new_item : function() {

			if ( this.links.add_new_item ) {
				window.location = this.links.add_new_item;
			} else {
				// @TODO this needs work:
				$('#wp-admin-bar-new-content').addClass('hover').find('a').eq(1).focus();
			}

		},

		add_new_post : function() {
			window.location = this.links.add_new_post;
		},

		add_new_page : function() {
			window.location = this.links.add_new_page;
		},

		add_new_media : function() {
			window.location = this.links.add_new_media;
		},

		add_new_user : function() {
			window.location = this.links.add_new_user;
		}

	});

	// Default keyboard shortcuts. Here's where we link the keyboard shortcuts to our interface actions.

	// Save item (contextual)
	keyboard_shortcuts.add({
		combo       : 'meta+s',
		description : ia.descriptions.save_item,
		callback    : _.bind(ia.save_item,ia),
		global      : true
	});

	// Toggle the Help screen
	keyboard_shortcuts.add({
		combo       : 'meta+h',
		description : ia.descriptions.help,
		callback    : _.bind(ia.help,ia)
	});

	// Add new (contextual)
	keyboard_shortcuts.add({
		combo       : '+ +',
		description : ia.descriptions.add_new_item,
		callback    : _.bind(ia.add_new_item,ia)
	});

	// Add new Post
	keyboard_shortcuts.add({
		combo       : '+ p',
		description : ia.descriptions.add_new_post,
		callback    : _.bind(ia.add_new_post,ia)
	});

	// Add new Page
	keyboard_shortcuts.add({
		combo       : '+ a',
		description : ia.descriptions.add_new_page,
		callback    : _.bind(ia.add_new_page,ia)
	});

	// Add new Media
	keyboard_shortcuts.add({
		combo       : '+ m',
		description : ia.descriptions.add_new_media,
		callback    : _.bind(ia.add_new_media,ia)
	});

	// Add new user
	keyboard_shortcuts.add({
		combo       : '+ u',
		description : ia.descriptions.add_new_user,
		callback    : _.bind(ia.add_new_user,ia)
	});

}(jQuery));
