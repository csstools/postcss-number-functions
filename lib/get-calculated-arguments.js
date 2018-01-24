import getCalculatedNumber from './get-calculated-number';

/* Return Calculated Arguments
/* ========================================================================== */

export default function getCalculatedArguments(node) {
	let arg    = [];
	const args = [];

	let followsComma = false;

	node.nodes.slice(1, -1).forEach(child => {
		if (isComma(child)) {
			if (arg.length) {
				args.push(arg);
			}

			arg = [];
		} else {
			arg.push(child);
		}
	});

	if (arg.length) {
		args.push(arg);
	}

	return args.map(arg => getCalculatedNumber({
		nodes: [null, ...arg, null]
	}));
}

/* Validators
/* ========================================================================== */

function isComma(node) {
	return Object(node).type === 'comma';
}
