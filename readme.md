# Keyboard Shortcuts #

**Contributors:** johnbillion  
**Tags:** keyboard, shortcuts, accessibility, productivity, hotkeys  
**Requires at least:** 3.6  
**Tested up to:** 3.7  
**Stable tag:** 0.1  
**License:** GPL v2 or later  

Keyboard shortcuts for WordPress

## Status ##

This plugin is currently a proof of concept more than anything else. The plugin is (hopefully) built so that other plugins can easily add their own shortcuts.

The plugin uses [Mousetrap](https://github.com/ccampbell/mousetrap/) for the actual keyboard shortcut functionality, but this may change due to licensing incompatibility. The plugin abstracts this away though, so changing the library at a later date won't be too much of an issue.

## Current Shortcuts ##

The "meta" key is <kbd>&#x2318;</kbd> on a Mac and <kbd>Ctrl</kbd> on Windows and Linux. See the [Mousetrap](https://github.com/ccampbell/mousetrap/) docs for more info.

### Navigational Shortcuts ###

 * <kbd>+</kbd> <kbd>P</kbd> - Add new Post.
 * <kbd>+</kbd> <kbd>A</kbd> - Add new Page.
 * <kbd>+</kbd> <kbd>M</kbd> - Add new Media.
 * <kbd>+</kbd> <kbd>U</kbd> - Add new User.

### Contextual Shortcuts ###

 * <kbd>+</kbd> <kbd>+</kbd> (That's the plus key twice) - Add New. Works on:
    * Posts
    * Media
    * Terms
    * Users
    * Network sites
 * <kbd>&#x2318; S</kbd> / <kbd>Ctrl S</kbd> - Save. Works on:
    * Posts
    * Media
    * Comments
    * Terms
    * Users

### List Table Shortcuts ###

None yet. See [issue #7](https://github.com/johnbillion/wordpress-keyboard-shortcuts/issues/7).

### Misc Shortcuts ###

 * <kbd>&#x2318; H</kbd> / <kbd>Ctrl H</kbd> - Toggles WordPress' built-in Help panel.

## Issues ##

Please see the [GitHub issues page](https://github.com/johnbillion/wordpress-keyboard-shortcuts/issues) for brainstorming and issues.
