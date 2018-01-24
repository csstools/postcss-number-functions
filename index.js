import postcss from 'postcss';
import parser from 'postcss-values-parser';
import getSupportedNumber from './lib/get-supported-number';

export default postcss.plugin('postcss-number-functions', () => {
	return root => {
		root.walkDecls(decl => {
			const originalValue = decl.value;

			const ast = parser(decl.value.replace(/(^|\s)\(/, '$1_(')).parse({ loose: true });

			ast.walk(node => {
				if (isSupportedFunction(node)) {
					const number = getSupportedNumber(node);

					if (isNumber(number) && number !== node) {
						node.replaceWith(number);
					}
				}
			});

			const modifiedValue = ast.toString();

			if (originalValue !== modifiedValue) {
				decl.value = modifiedValue;
			}
		});
	};
});

/* Validators
/* ========================================================================== */

function isSupportedFunction(node) {
	return Object(node).type === 'func' && /(abs|ceil|floor|max|min|percentage|random|round)/i.test(node.value);
}

function isNumber(node) {
	return Object(node).type === 'number';
}
