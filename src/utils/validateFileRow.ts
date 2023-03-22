import {
	Fields,
	RowValidation,
	FileValidation,
	RowValidationState,
	ValidationRuleDict,
} from "models/LoadFile";

const rules: ValidationRuleDict = {
	[Fields.month]: (value: string, row: string[]) => {
		const regex = /^([012]?[0-9])-(\d{4})$/;
		if (!regex.test(value)) {
			return {
				errors: [`El campo mes no tiene el formato día-mes`],
			};
		}

		const groups = value.match(regex);
		const [_, month, year] = groups ?? [];

		const intMonth = Number(month);
		const intYear = Number(year);

		if (intMonth > 12 || intMonth < 1) {
			return {
				errors: [
					`El campo mes hace referencia a un mes inválido (debe ser entre 1 y 12)`,
				],
			};
		}

		if (intYear > 2100 || intYear < 2000) {
			return {
				errors: [
					`El campo mes hace referencia a un año no permitido (debe ser entre 2000 y 2100)`,
				],
			};
		}

		return {
			errors: [],
			formattedValue: intYear - 2020 + intMonth,
		};
	},
	[Fields.name]: (value: string, row: string[]) => {
		if (value.trim().length === 0) {
			return {
				errors: [`El campo nombre está vacío`],
			};
		}

		return {
			errors: [],
			formattedValue: value.trim(),
		};
	},
	[Fields.document]: (value: string, row: string[]) => {
		if (value.trim().length === 0) {
			return {
				errors: [`El campo documento está vacío`],
			};
		}

		return {
			errors: [],
			formattedValue: value.trim(),
		};
	},
	[Fields.startDate]: (value: string, row: string[]) => {
		const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
		if (!regex.test(value.trim())) {
			return {
				errors: [
					`El campo fecha de ingreso no tiene el formato DD/MM/AAAA`,
				],
			};
		}

		const groups = value.trim().match(regex);
		const [_, day, month, year] = groups ?? [];

		const intDay = Number(day);
		const intYear = Number(year);
		const intMonth = Number(month);

		if (intMonth > 12 || intMonth < 1) {
			return {
				errors: [
					`El campo fecha de ingreso hace referencia a un mes inválido (debe ser entre 1 y 12)`,
				],
			};
		}

		if (intYear > 2023 || intYear < 2000) {
			return {
				errors: [
					`El campo fecha de ingreso hace referencia a un año inválido (debe ser entre 2000 y 2023)`,
				],
			};
		}

		if (intDay < 1) {
			return {
				errors: [
					`El campo fecha hace referencia a un día inválido (debe ser mayor a 1)`,
				],
			};
		}

		if (intYear % 4 === 0 && intMonth === 2 && intDay > 29) {
			return {
				errors: [
					`El campo fecha hace referencia a un día inválido (debe ser menor o igual a 29 para febreros bisiestos)`,
				],
			};
		}

		if (intYear % 4 !== 0 && intMonth === 2 && intDay > 28) {
			return {
				errors: [
					`El campo fecha hace referencia a un día inválido (debe ser menor o igual a 28)`,
				],
			};
		}

		if ([1, 3, 5, 7, 8, 10, 12].includes(intMonth) && intDay > 31) {
			return {
				errors: [
					`El campo fecha hace referencia a un día inválido (debe ser menor o igual a 31)`,
				],
			};
		}

		if ([4, 6, 9, 11].includes(intMonth) && intDay > 30) {
			return {
				errors: [
					`El campo fecha hace referencia a un día inválido (debe ser menor o igual a 30)`,
				],
			};
		}

		return {
			errors: [],
			formattedValue: new Date(intYear, intMonth - 1, intDay),
		};
	},
	[Fields.salary]: (value: string, row: string[]) => {
		const regex = /^[0-9]+$/;
		if (!regex.test(value.trim())) {
			return {
				errors: [`El campo salario tiene valores no numéricos`],
			};
		}

		return {
			errors: [],
			formattedValue: Number(value.trim()),
		};
	},
	[Fields.area]: (value: string, row: string[]) => {
		if (value.trim().length === 0) {
			return {
				errors: [`El campo área está vacío`],
			};
		}

		return {
			errors: [],
			formattedValue: value.trim(),
		};
	},
	[Fields.subarea]: (value: string, row: string[]) => {
		if (value.trim().length === 0) {
			return {
				errors: [`El campo subárea está vacío`],
			};
		}

		return {
			errors: [],
			formattedValue: value.trim(),
		};
	},
	[Fields.division]: (value: string, row: string[]) => {
		if (value.trim().length === 0) {
			return {
				errors: [`El campo división está vacío`],
			};
		}

		return {
			errors: [],
			formattedValue: value.trim(),
		};
	},
	[Fields.leader]: (value: string, row: string[]) => {
		if (value.trim().length === 0) {
			return {
				errors: [],
				formattedValue: null,
			};
		}

		return {
			errors: [],
			formattedValue: value.trim(),
		};
	},
	[Fields.level]: (value: string, row: string[]) => {
		if (value.trim().length === 0) {
			return {
				errors: [`El campo nivel jeráquico está vacío`],
			};
		}

		return {
			errors: [],
			formattedValue: value.trim(),
		};
	},
};

const validateRow = (row: string[], index: number): RowValidation => {
	const fixedValues: any[] = [];
	const fieldErrors: string[][] = [];
	const generalErrors: string[] = [];
	let state = RowValidationState.SUCCESS;

	if (!row || !row.length || row.length < 2) {
		return {
			state: RowValidationState.IGNORE,
			fieldErrors,
			fixedValues,
			generalErrors,
		};
	}

	if (row.length !== 10) {
		state = RowValidationState.FAILED;
		generalErrors.push(
			`La fila ${index + 1} no tiene exactamente 10 campos`
		);

		return {
			state,
			fieldErrors,
			fixedValues,
			generalErrors,
		};
	}

	const fields = Object.values(Fields).filter((f: any) => !isNaN(f));
	for (const field of fields) {
		const value = row[field as number];
		const rule = rules[field as Fields];
		const result = rule(value, row);

		if (result.errors.length) {
			state = RowValidationState.FAILED;
		}

		fieldErrors[field as number] = result.errors;
		fixedValues[field as number] = result?.formattedValue ?? null;
	}

	return {
		state,
		fixedValues,
		fieldErrors,
		generalErrors,
	};
};

export const validateFile = (content: string[][]): FileValidation => {
	if (!content?.length) {
		return {
			isValid: false,
			canBePartial: false,
			ignoreFirstRow: false,
			rowValidations: [],
			fileErrors: [`El archivo está vacío`],
		};
	}

	const ignoreFirstRow = content[0][0].toLowerCase() === "mes";
	if (content.length === 1 && ignoreFirstRow) {
		return {
			isValid: false,
			canBePartial: false,
			ignoreFirstRow: false,
			rowValidations: [],
			fileErrors: [
				`El archivo está vacío (sólo tiene la fila de encabezado)`,
			],
		};
	}

	let isValid = true;
	let canBePartial = false;
	const rowValidations: RowValidation[] = [];
	for (let i = ignoreFirstRow ? 1 : 0; i < content.length; i++) {
		const row = content[i];
		const validation = validateRow(row, i);

		rowValidations[i] = validation;
		if (validation.state === RowValidationState.FAILED) {
			isValid = false;
		} else if (validation.state === RowValidationState.SUCCESS) {
			canBePartial = true;
		}
	}

	return {
		isValid,
		canBePartial,
		ignoreFirstRow,
		rowValidations,
		fileErrors: [],
	};
};
