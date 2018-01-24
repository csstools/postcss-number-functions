import getCalculatedArguments from './get-calculated-arguments';
import getCalculatedNumber from './get-calculated-number';
import parser from 'postcss-values-parser';

/* Return a Supported Number
/* ========================================================================== */

export default function getSupportedNumber(node) {
	if (isNumber(node)) {
		return node;
	} else if (isAbsFunction(node)) {
		return getMathNumber(node, value => Math.abs(value));
	} else if (isCeilFunction(node)) {
		return getMathNumber(node, value => Math.ceil(value));
	} else if (isFloorFunction(node)) {
		return getMathNumber(node, value => Math.floor(value));
	} else if (isMaxFunction(node)) {
		return getMinMaxNumber(node, (numberA, numberB) => numberB.value > numberA.value);
	} else if (isMinFunction(node)) {
		return getMinMaxNumber(node, (numberA, numberB) => numberA.value > numberB.value);
	} else if (isPercentageFunction(node)) {
		return getPercentageNumber(node);
	} else if (isRandomFunction(node)) {
		return getRandomNumber(node);
	} else if (isRoundFunction(node)) {
		return getMathNumber(node, value => Math.round(value));
	} else {
		throw `Unsupported value ${node.type === 'func' ? node.value : node.type}`;

		return node;
	}
}

/* Return a Mathamatically Altered Number
/* ========================================================================== */

function getMathNumber(node, fn) {
	const args = getCalculatedArguments(node);

	if (args.length === 1) {
		const arg = args[0];

		if (isNumber(arg)) {
			return Object.assign(parser.number({ unit: '', value: 0 }), arg, { value: fn(arg.value) });
		} else {
			throw `${arg} is not a number for ${node.value}()`;

			return node;
		}
	} else {
		throw `wrong number of arguments (${args.length} for 1) for ${node.value}()`;

		return node;
	}
}

/* Return a Minimum or Maximum Number
/* ========================================================================== */

function getMinMaxNumber(node, fn) {
	const args = getCalculatedArguments(node);
	const hasArgs = args.length;

	if (hasArgs) {
		const isAllNumbers = args.every(value => isNumber(value));

		if (isAllNumbers) {
			return args.slice(0).sort(fn)[0];
		} else {
			throw `non-number for ${node.value}()`;

			return node;
		}
	} else {
		return node;
	}
}

/* Return a Number Percentage
/* ========================================================================== */

function getPercentageNumber(node) {
	const number = getMathNumber(node, value => value * 100);

	return Object.assign(parser.number({ unit: '', value: 0 }), number, { value: number.value, unit: '%' });
}

/* Return a Random Number
/* ========================================================================== */

function getRandomNumber(node) {
	const args = getCalculatedArguments(node);
	const hasArgs = args.length;
	const isAllNumbers = args.every(value => isNumber(value));

	if (isAllNumbers) {
		if (args.length === 0) {
			return { type: 'number', value: Math.random() };
		} else if (args.length === 1) {
			const max = args[0];

			return Object.assign(parser.number({ unit: '', value: 0 }), max, { value: Math.random(max.value) });
		}
		if (args.length === 2) {
			const min = args[0].value <= args[1] ? args[0] : args[1];
			const max = min === args[0] ? args[1] : args[0];

			return Object.assign(parser.number({ unit: '', value: 0 }), args[1], { value: Math.random() * (Number(max.value) - Number(min.value)) + Number(min.value) });
		} else {
			throw `wrong number of arguments (${args.length} for 0..1) for ${node.value}()`;

			return node;
		}
	} else {
		throw `"${node}" is not a number for ${node.value}()`;

		return node;
	}
}

/* Validators
/* ========================================================================== */

function isNumber(node) {
	return Object(node).type === 'number';
}

function isFunction(node) {
	return Object(node).type === 'func';
}

function isAbsFunction(node) {
	return isFunction(node) && /^abs$/i.test(node.value);
}

function isCeilFunction(node) {
	return isFunction(node) && /^ceil$/i.test(node.value);
}

function isFloorFunction(node) {
	return isFunction(node) && /^floor$/i.test(node.value);
}

function isMaxFunction(node) {
	return isFunction(node) && /^max$/i.test(node.value);
}

function isMinFunction(node) {
	return isFunction(node) && /^min$/i.test(node.value);
}

function isPercentageFunction(node) {
	return isFunction(node) && /^percentage$/i.test(node.value);
}

function isRandomFunction(node) {
	return isFunction(node) && /^random$/i.test(node.value);
}

function isRoundFunction(node) {
	return isFunction(node) && /^round$/i.test(node.value);
}

function isGroupingFunction(node) {
	return isFunction(node) && /^_$/i.test(node.value);
}
