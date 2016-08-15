(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["laravelLocalization"] = factory();
	else
		root["laravelLocalization"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var _locale = void 0;
	var messages = {};

	/* Utility functions: */

	/**
	 * Replace variables used in the message by appropriate values.
	 *
	 * @method applyReplacements
	 * @static
	 * @param {String} message      Input message.
	 * @param {Object} replacements Associative array: { variableName: "replacement", ... }
	 * @return {String} The input message with all replacements applied.
	 */
	var applyReplacements = function applyReplacements(message, replacements) {
	    for (var replacementName in replacements) {
	        var replacement = replacements[replacementName];

	        var regex = new RegExp(':' + replacementName, 'g');
	        message = message.replace(regex, replacement);
	    }

	    return message;
	};

	var isEmpty = function isEmpty(obj) {
	    for (var prop in obj) {
	        if (obj.hasOwnProperty(prop)) return false;
	    }

	    return true;
	};

	/* Lang: */

	/**
	 * Lang class. Works similar to the Laravel Lang object.
	 * @class Lang
	 */

	var Lang = {

	    /**
	     * Translate a message.
	     *
	     * @method get
	     * @static
	     * @param {String} messageKey       The message key (message identifier).
	     * @param {Object} [replacements]   Associative array: { variableName: "replacement", ... }
	     * @return {String} Translated message.
	     */
	    get: function get(messageKey, replacements, forceLocale) {
	        var uselocale = _locale;
	        if (forceLocale) {
	            uselocale = forceLocale;
	        }
	        if (typeof messages[uselocale][messageKey] == "undefined") {
	            /* like Lang::get(), if messageKey is the name of a lang file, return it as an array */
	            var result = {};
	            for (var prop in messages[uselocale]) {
	                if (prop.indexOf(messageKey + '.') > -1) {
	                    result[prop] = messages[uselocale][prop];
	                }
	            };
	            if (!isEmpty(result)) {
	                return result;
	            }
	            /* if there is nothing to return, return messageKey */
	            return messageKey;
	        }

	        var message = messages[uselocale][messageKey];

	        if (replacements) {
	            message = applyReplacements(message, replacements);
	        }

	        return message;
	    },

	    /**
	     * Returns whether the given message is defined or not.
	     *
	     * @method has
	     * @static
	     * @param {String} messageKey   Message key.
	     * @return {Boolean} True if the given message exists.
	     */
	    has: function has(messageKey) {
	        return typeof messages[_locale][messageKey] != "undefined";
	    },

	    /**
	     * Choose one of multiple message versions, based on
	     * pluralization rules. Only English pluralization
	     * supported for now. If `count` is one then the first
	     * version of the message is retuned, otherwise the
	     * second version.
	     *
	     * @method choice
	     * @static
	     * @param {String} messageKey       Message key.
	     * @param {Integer} count           Subject count for pluralization.
	     * @param {Object} [replacements]   Associative array: { variableName: "replacement", ... }
	     * @return {String} Translated message.
	     */
	    choice: function choice(messageKey, count, replacements) {
	        if (typeof messages[_locale][messageKey] == "undefined") {
	            return messageKey;
	        }

	        var message;
	        var messageSplitted = messages[_locale][messageKey].split('|');

	        if (count == 1) {
	            message = messageSplitted[0];
	        } else {
	            message = messageSplitted[1];
	        }

	        if (replacements) {
	            message = applyReplacements(message, replacements);
	        }

	        return message;
	    },

	    /**
	     * Sets the current locale. Normally only used once
	     * during initialization. The value comes from the backend.
	     *
	     * @method setLocale
	     * @static
	     * @param {String} localeId The locale returned by Laravel's Lang::locale().
	     * @throws {Error} An error is thrown if messages[localeId] is not defined.
	     */
	    setLocale: function setLocale(localeId) {
	        _locale = localeId;

	        if (!messages[localeId]) {
	            throw new Error('No messages defined for locale: "' + localeId + '". ' + 'Did you forget to enable it in the configuration?');
	        }
	    },

	    /**
	     * Returns the current locale.
	     *
	     * @method locale
	     * @static
	     * @return {String} The current locale.
	     */
	    locale: function locale() {
	        return _locale;
	    },

	    /**
	     * Used to initialize the message catalog. You may use this
	     * method to add further messages on runtime if necessary.
	     *
	     * @method addMessages
	     * @static
	     * @param {Object} _messages  An associative array: { messageKey: "message", ... }
	     */
	    addMessages: function addMessages(_messages) {
	        for (var key in _messages) {
	            messages[key] = _messages[key];
	        }
	    }
	};

	if (typeof window !== 'undefined') {
	    var localizationDataElement = window.document.getElementById('facades-data-localization');

	    if (localizationDataElement) {
	        var localizationData = JSON.parse(localizationDataElement.innerHTML);
	        Lang.addMessages(localizationData.messages);
	        Lang.setLocale(localizationData.locale);
	    }
	}

	exports.default = Lang;

/***/ }
/******/ ])
});
;