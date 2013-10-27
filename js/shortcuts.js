
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

// Shortcut event binder
keyboard_shortcuts.on( 'add', function( shortcut ) {

	if ( shortcut.get('global') )
		Mousetrap.bindGlobal( shortcut.get('combo'), shortcut.get('callback'), shortcut.get('action') );
	else
		Mousetrap.bind( shortcut.get('combo'), shortcut.get('callback'), shortcut.get('action') );

} );

(function($){

	if ( window.console )
		console.log( kbs ); // @TODO remove

	// Controllers for the default shortcuts. This is almost generic enough to be a general dispatcher. Just need to abstract it from the event.
	window.interaction_dispatcher = {

		save_item : function( event ) {

			if ( ! kbs.dom.save_item )
				return;
			if ( ! $( kbs.dom.save_item ).length )
				return;

			// @TODO is this safe? For some reason it's needed when saving a post
			window.onbeforeunload = null;

			$( kbs.dom.save_item ).submit();
			event.preventDefault();

		},

		help : function( event ) {

			// @TODO it would be awesome to record the current focus position before toggling the Help screen so
			// we can return to it when the Help screen is toggled off. #accessibility

			event.preventDefault();
			$('#contextual-help-link').click();

		},

		add_new_item : function( event ) {

			if ( kbs.links.add_new_item ) {
				window.location = kbs.links.add_new_item;
			} else {
				// @TODO this needs work:
				$('#wp-admin-bar-new-content').addClass('hover').find('a').eq(1).focus();
			}

		},

		// We could do with a generic URL dispatcher method. Would need to get passed some sort of identifier for the shortcut though.

		add_new_post : function( event ) {
			window.location = kbs.links.add_new_post;
		},

		add_new_page : function( event ) {
			window.location = kbs.links.add_new_page;
		},

		add_new_media : function( event ) {
			window.location = kbs.links.add_new_media;
		},

		add_new_user : function( event ) {
			window.location = kbs.links.add_new_user;
		}

	};

	// Save item (contextual)
	keyboard_shortcuts.add({
		description : kbs.descriptions.save_item,
		combo       : 'meta+s',
		callback    : interaction_dispatcher.save_item,
		global      : true
	});

	// Toggle the Help screen
	keyboard_shortcuts.add({
		description : kbs.descriptions.help,
		combo       : 'meta+h',
		callback    : interaction_dispatcher.help
	});

	// Add new (contextual)
	keyboard_shortcuts.add({
		description : kbs.descriptions.add_new_item,
		combo       : '+ +',
		callback    : interaction_dispatcher.add_new_item
	});

	// Add new Post
	keyboard_shortcuts.add({
		description : kbs.descriptions.add_new_post,
		combo       : '+ p',
		callback    : interaction_dispatcher.add_new_post
	});

	// Add new Page
	keyboard_shortcuts.add({
		description : kbs.descriptions.add_new_page,
		combo       : '+ a',
		callback    : interaction_dispatcher.add_new_page
	});

	// Add new Media
	keyboard_shortcuts.add({
		description : kbs.descriptions.add_new_media,
		combo       : '+ m',
		callback    : interaction_dispatcher.add_new_media
	});

	// Add new user
	keyboard_shortcuts.add({
		description : kbs.descriptions.add_new_user,
		combo       : '+ u',
		callback    : interaction_dispatcher.add_new_user
	});

}(jQuery));
