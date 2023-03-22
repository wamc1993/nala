export enum RowValidationState {
	SUCCESS = 1,
	FAILED = 2,
	IGNORE = 3,
}

export enum Fields {
	month = 0,
	name = 1,
	document = 2,
	startDate = 3,
	salary = 4,
	division = 5,
	area = 6,
	subarea = 7,
	leader = 8,
	level = 9,
}

export interface ValidationRuleResult {
	errors: string[];
	formattedValue?: any;
}

export type ValidationRule = (
	value: string,
	row: string[]
) => ValidationRuleResult;

export type ValidationRuleDict = {
	[x in Fields]: ValidationRule;
};

export interface RowValidation {
	fixedValues: any[];
	fieldErrors: string[][];
	generalErrors: string[];
	state: RowValidationState;
}

export interface FileValidation {
	isValid: boolean;
	canBePartial: boolean;
	ignoreFirstRow: boolean;
	rowValidations: RowValidation[];
	fileErrors: string[];
}
