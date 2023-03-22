import { EmployeeData } from "./Employee";
export interface EmployeeTable {
	document: string;
	name: string;
	created_at: Date;
	start_date: Date;
	end_date: Date | null;
	image_url?: string | null;
}

export interface PeriodTable {
	id: number;
	year: number;
	month: number;
}

export interface EmployeeStateTable {
	employee_document: string;
	period_id: number;
	salary: number;
	division: string;
	area: string;
	subarea: string;
	level: string;
	lead_document: string | null;
}

export interface UpsertParams {
	periods: PeriodTable[];
	employees: EmployeeTable[];
	employeeStates: EmployeeStateTable[];
}
