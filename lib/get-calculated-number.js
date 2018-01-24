import getConvertedNumber from './get-converted-number';
import getSupportedNumber from './get-supported-number';
import parser from 'postcss-values-parser';

/* Return a Calculated Number
/* ========================================================================== */

export default function getCalculatedNumber(node) {
	return node.nodes.slice(1, -1).reduce((accumulator, child) => {
		if (accumulator === undefined) {
			// initialize the accumulator
			return getSupportedNumber(child);
		} else if (isOperator(child)) {
			// prepare the accumulator if the child is an operator
			accumulator.operator = child.value;

			return accumulator;
		} else if (accumulator.operator) {
			// get the converted value of the child relative to the accumulator
			const value    = Number(getConvertedNumber(child, accumulator.unit).value);
			const operator = accumulator.operator;

			delete accumulator.operator;

			if (operator === '+') {
				// add the value to the accumulator
				return Object.assign(parser.number({ unit: '', value: 0 }), accumulator, { value: String(Number(accumulator.value) + value) });
			} else if (operator === '-') {
				// subtract the value from the accumulator
				return Object.assign(parser.number({ unit: '', value: 0 }), accumulator, { value: String(Number(accumulator.value) - value) });
			} else if (operator === '*') {
				// multiply the accumulator with the value
				return Object.assign(parser.number({ unit: '', value: 0 }), accumulator, { value: String(Number(accumulator.value) * value) });
			} else if (operator === '/') {
				// divide the accumulator with the value
				return Object.assign(parser.number({ unit: '', value: 0 }), accumulator, { value: String(Number(accumulator.value) / value) });
			} else if (operator === '%') {
				// modulus the accumulator with the value
				return Object.assign(parser.number({ unit: '', value: 0 }), accumulator, { value: String(Number(accumulator.value) % value) });
			} else {
				throw `Unsupported operator ${operator}`;
			}
		} else {
			throw `Unsupported field ${child}`;
		}
	}, undefined);
}

/* Validators
/* ========================================================================== */

function isOperator(node) {
	return Object(node).type === 'operator';
}
