/*
*
*
*       Complete the handler logic below
*
*
*/

function ConvertHandler() {
	this.convertUnitDef = {
		"gal": "l",
		"l": "gal",
		"lbs": "kg",
		"kg": "lbs",
		"mi": "km",
		"km": "mi"
	};
	this.unitSpellOut = {
		"gal": "gallons",
		"l": "litters",
		"lbs": "pounds",
		"kg": "kilograms",
		"mi": "miles",
		"km": "kilometers"
	};

	this.getInput = function (input, bNum = true) {
		var num = undefined;
		var unit = undefined;
		var inputN = /^(\d+(\.\d+)?(\/\d+(\.\d+)?)?)?$/g;
		var inputU = /(l|gal|kg|lbs|mi|km|L|GAL|KG|LBS|MI|KM)$/g;
		var tmpUnit = input.match(/[a-z]+/ig)[0];
		if (tmpUnit && inputU.test(tmpUnit)) {
			unit = tmpUnit;
		}
		var tmpNum = tmpUnit ? input.slice(0, input.indexOf(tmpUnit)) : input;
		if (!tmpNum) {
			tmpNum = "1";
		}
		if (inputN.test(tmpNum)) {
			if (tmpNum.indexOf("/") != -1) {
				var a = parseFloat(tmpNum.slice(0, tmpNum.indexOf("/")));
				var b = parseFloat(tmpNum.slice(tmpNum.indexOf("/") + 1));
				if (b === 0) {
					num = undefined;
				} else {
					num = a / b;
				}
			} else {
				num = parseFloat(tmpNum);
			}

		}
		if (bNum) {
			return num;
		} else {
			return unit;
		}
	}

	this.getNum = function (input) {
		return this.getInput(input, true);
	};

	this.getUnit = function (input) {
		return this.getInput(input, false);
	};

	this.getReturnUnit = function (initUnit) {
		return this.convertUnitDef[initUnit.toLowerCase()];
	};

	this.spellOutUnit = function (unit) {
		return this.unitSpellOut[unit.toLowerCase()];
	};

	this.convert = function (initNum, initUnit) {
		const galToL = 3.78541;
		const lbsToKg = 0.453592;
		const miToKm = 1.60934;
		var unitConvertRate = {
			"gal": 3.78541,
			"l": 1 / 3.78541,
			"lbs": 0.453592,
			"kg": 1 / 0.453592,
			"mi": 1.60934,
			"km": 1 / 1.60934
		}
		return Math.round(initNum * unitConvertRate[initUnit.toLowerCase()] * 10000) / 10000;
	};

	this.getString = function (initNum, initUnit, returnNum, returnUnit) {
		return Math.round(initNum * 1000) / 1000 + " " + this.spellOutUnit(initUnit) + " converts to " + returnNum + " " + this.spellOutUnit(returnUnit);
	};

}

module.exports = ConvertHandler;
