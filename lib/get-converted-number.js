import getSupportedNumber from './get-supported-number';
import parser from 'postcss-values-parser';

/* Return a Converted Number
/* ========================================================================== */

export default function getConvertedNumber(node, unit) {
	const supported = getSupportedNumber(node);

	if (Object(supported).unit in conversions && unit in conversions[supported.unit]) {
		return Object.assign(parser.number({ unit: '', value: 0 }), supported, { value: String(Number(supported.value) * conversions[supported.unit][unit]) });
	} else if (Object(supported).unit === unit) {
		return Object.assign(parser.number({ unit: '', value: 0 }), supported);
	} else {
		throw `Unsupported unit ${supported}`;

		return node;
	}
}

/* Conversions
/* ========================================================================== */

const conversions = {
	// length
	px: {
		px:  1,
		m:   96 / 2.54 * 10,
		cm:  96 / 2.54,
		mm:  96 / 2.54 / 10,
		ft:  96 * 12,
		in:  96,
		pt:  96 / 72,
		pc:  16,
		rem: 16
	},
	m: {
		px:  2.54 / 9600,
		m:   1,
		cm:  0.01,
		mm:  0.001,
		ft:  2.54 / 100 * 12,
		in:  2.54 / 100,
		pt:  2.54 / 7200,
		pc:  2.54 / 600,
		rem: 2.54 / 9600 * 16
	},
	cm: {
		px:  2.54 / 96,
		m:   100,
		cm:  1,
		mm:  0.1,
		ft:  2.54 * 12,
		in:  2.54,
		pt:  2.54 / 72,
		pc:  2.54 / 6,
		rem: 2.54 / 96 * 16
	},
	mm: {
		px:  2.54 * 10 / 96,
		m:   1000,
		cm:  10,
		mm:  1,
		ft:  2.54 * 10 * 12,
		in:  2.54 * 10,
		pt:  2.54 * 10 / 72,
		pc:  2.54 * 10 / 6,
		rem: 2.54 * 10 / 96 * 16
	},
	ft: {
		px:  1 / 96 / 12,
		m:   1 / 2.54 * 100 / 12,
		cm:  1 / 2.54 / 12,
		mm:  1 / 2.54 / 10 / 12,
		ft:  1,
		in:  1 / 12,
		pt:  1 / 72 / 12,
		pc:  1 / 6 / 12,
		rem: 1 / 96 / 12 * 16
	},
	in: {
		px:  1 / 96,
		m:   1 / 2.54 * 100,
		cm:  1 / 2.54,
		mm:  1 / 2.54 / 10,
		ft:  12,
		in:  1,
		pt:  1 / 72,
		pc:  1 / 6,
		rem: 1 / 96 * 16
	},
	pt: {
		px:  0.75,
		m:   72 / 2.54 * 100,
		cm:  72 / 2.54,
		mm:  72 / 2.54 / 10,
		ft:  72 * 12,
		in:  72,
		pt:  1,
		pc:  12,
		rem: 0.75 * 16
	},
	pc: {
		px:  6 / 96,
		m:   6 / 2.54 * 100,
		cm:  6 / 2.54,
		mm:  6 / 2.54 / 10,
		ft:  6 * 12,
		in:  6,
		pt:  6 / 72,
		pc:  1,
		rem: 6 / 96 * 16
	},
	rem: {
		px:  1 / 16,
		m:   96 / 2.54 * 10,
		cm:  96 / 2.54,
		mm:  96 / 2.54 / 10,
		ft:  96 * 12,
		in:  96 * 16,
		pt:  96 / 72,
		pc:  16,
		rem: 1
	},
	// angle
	deg: {
		deg:  1,
		grad: 0.9,
		rad:  180 / Math.PI,
		turn: 360
	},
	grad: {
		deg:  400 / 360,
		grad: 1,
		rad:  200 / Math.PI,
		turn: 400
	},
	rad: {
		deg:  Math.PI / 180,
		grad: Math.PI / 200,
		rad:  1,
		turn: Math.PI * 2
	},
	turn: {
		deg:  1 / 360,
		grad: 1 / 400,
		rad:  0.5 / Math.PI,
		turn: 1
	},
	// time
	s: {
		s:  1,
		ms: 1 / 1000
	},
	ms: {
		s:  1000,
		ms: 1
	},
	// frequency
	Hz: {
		Hz:  1,
		kHz: 1000,
		mHz: 100000
	},
	kHz: {
		Hz:  1 / 1000,
		kHz: 1,
		mHz: 100
	},
	mHz: {
		Hz:  1 / 1000 / 1000,
		kHz: 1 / 1000,
		mHz: 1
	},
	// resolution
	dpi: {
		dpi:  1,
		dpcm: 1 / 2.54,
		dppx: 1 / 96
	},
	dpcm: {
		dpi:  2.54,
		dpcm: 1,
		dppx: 2.54 / 96
	},
	dppx: {
		dpi:  96,
		dpcm: 96 / 2.54,
		dppx: 1
	}
};
