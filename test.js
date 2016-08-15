import assert from 'assert';
import Lang from './src/index';

it('should translate messages', () => {
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

it('should translate messages with parameters', () => {
    Lang.addMessages({
		'en': {
			'message with parameter: :parameter': 'translation with parameter: :parameter'
		}
    });
	
	Lang.setLocale('en');

    assert.equal(Lang.get('message with parameter: :parameter', { parameter: 'value' }), 'translation with parameter: value');
});