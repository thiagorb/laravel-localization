# laravel-localization

Adaptation of the Laravel JS localization module implemented by [andywer](https://github.com/andywer/laravel-js-localization) to be used as a module.

The advantage of using this module is that you can combine it with this [babel plugin](https://github.com/thiagorb/babel-plugin-laravel-facades). The plugin will detect usages of this module in the JavaScript and build a JSON file containing the localization keys, which can be used later to generate the data to be sent to the browser.

## Installation
```
npm install laravel-localization
```
## Usage
```
import Lang from 'laravel-localization';

Lang.addMessages({
	'en': {
        'message key': 'translated message'
	}
});

Lang.setLocale('en');

console.log(Lang.get('message key')); // translated message
```
