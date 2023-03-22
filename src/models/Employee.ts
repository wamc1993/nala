export interface EmployeeData {
	periodId: number;
	month: string;
	name: string;
	document: string;
	startDate: Date;
	salary: number;
	salaryIncrement: number;
	division: string;
	area: string;
	subarea: string;
	level: string;
	imageUrl: string | null;
	leadDocument?: string;
}

export interface PeriodData {
	id: number;
	year: number;
	month: number;
}
