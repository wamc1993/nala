import {
	PeriodTable,
	UpsertParams,
	EmployeeTable,
	EmployeeStateTable,
} from "models/Database";
import { RowValidation, Fields, RowValidationState } from "models/LoadFile";

export const createUpsertItems = (
	validations: RowValidation[]
): UpsertParams => {
	let periodIds: number[] = [];
	const employees: EmployeeTable[] = [];
	const employeeStates: EmployeeStateTable[] = [];

	for (const validation of validations) {
		if (!validation) {
			continue;
		}
		const { fixedValues } = validation;

		if (
			validation.state === RowValidationState.FAILED ||
			validation.state === RowValidationState.IGNORE
		) {
			continue;
		}

		const period = fixedValues[Fields.month] as number;
		if (!periodIds.includes(period)) {
			periodIds.push(period);
		}

		const employee = createEmployeeEntity(fixedValues);
		const state = createEmployeeStateEntity(fixedValues);
		employees.push(employee);
		employeeStates.push(state);
	}

	const periods = createPeriodEntities(periodIds);

	return {
		periods,
		employeeStates,
		employees: removeDuplicatedEmployees(employees),
	};
};

const createEmployeeStateEntity = (fixedValues: any[]): EmployeeStateTable => {
	return {
		area: fixedValues[Fields.area as number] as string,
		lead_document: fixedValues[Fields.leader as number],
		level: fixedValues[Fields.level as number] as string,
		salary: fixedValues[Fields.salary as number] as number,
		subarea: fixedValues[Fields.subarea as number] as string,
		period_id: fixedValues[Fields.month as number] as number,
		division: fixedValues[Fields.division as number] as string,
		employee_document: fixedValues[Fields.document as number] as string,
	};
};

const removeDuplicatedEmployees = (
	employees: EmployeeTable[]
): EmployeeTable[] => {
	const acc: EmployeeTable[] = [];
	return employees.reduce((acc, emp) => {
		const exist = acc.some((item) => item.document === emp.document);
		if (!exist) {
			acc.push(emp);
		}
		return acc;
	}, acc);
};

const createEmployeeEntity = (fixedValues: any[]): EmployeeTable => {
	return {
		end_date: null,
		created_at: new Date(),
		name: fixedValues[Fields.name as number],
		document: fixedValues[Fields.document as number],
		start_date: fixedValues[Fields.startDate as number],
	};
};

const createPeriodEntities = (periods: number[]): PeriodTable[] => {
	let results: PeriodTable[] = [];

	periods.forEach((p) => {
		const base = Math.floor(p / 12);
		const year = 2000 + base;
		const month = p - base;

		results.push({
			id: p,
			month,
			year,
		});
	});

	return results;
};
