/**
 * Ensure there are spaces after argument separators in call expressions.
 *
 * Type: `Boolean`
 *
 * Value: `true`
 *
 * #### Example
 *
 * ```js
 * "requireSpaceBetweenArguments": true
 * ```
 *
 * ##### Valid
 *
 * ```js
 * a(b, c);
 * ```
 *
 * ##### Invalid
 *
 * ```js
 * a(b,c);
 * ```
 */

var assert = require('assert');

module.exports = function() {};

module.exports.prototype = {

    configure: function(requireSpaceBetweenArguments) {
        assert(
            typeof requireSpaceBetweenArguments === 'boolean',
            this.getOptionName() + ' option requires boolean value'
        );
        assert(
            requireSpaceBetweenArguments === true,
            this.getOptionName() + ' option requires true value or should be removed'
        );
    },

    getOptionName: function() {
        return 'requireSpaceBetweenArguments';
    },

    check: function(file, errors) {
        file.iterateNodesByType(['CallExpression'], function(node) {
            node.arguments.forEach(function(param, i) {
                var punctuatorToken = file.getPrevToken(file.getFirstNodeToken(param));
                if (punctuatorToken.value === ',') {
                    errors.assert.whitespaceBetween({
                        token: punctuatorToken,
                        nextToken: file.getNextToken(punctuatorToken),
                        spaces: 1
                    });
                }
            });
        });
    }
};
