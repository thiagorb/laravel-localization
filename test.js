import assert from 'assert';

const MODULE_PATH = './src/index';

suite('laravel-localization', () => {
	let Lang;
	
	setup(() => {
		Lang = require(MODULE_PATH).default;
	});
		
	teardown(() => {
		delete require.cache[require.resolve(MODULE_PATH)];
	});

	test('should translate messages', () => {
	    Lang.addMessages({
			'en': {
		        'message key': 'translated message',
		        'different one': 'another translation'
			}
	    });
	
		Lang.setLocale('en');

	    assert.equal(Lang.get('message key'), 'translated message');
	    assert.equal(Lang.get('different one'), 'another translation');
	});

	test('should translate messages with parameters', () => {
	    Lang.addMessages({
			'en': {
				'message with parameter: :parameter': 'translation with parameter: :parameter'
			}
	    });
	
		Lang.setLocale('en');

	    assert.equal(Lang.get('message with parameter: :parameter', { parameter: 'value' }), 'translation with parameter: value');
	});
});