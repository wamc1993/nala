import { supabase } from "config/superbase";
import { EmployeeData, PeriodData } from "models/Employee";
import { UpsertParams, EmployeeTable } from "models/Database";

const bucketImages = import.meta.env.VITE_STORAGE_IMG_BUCKET;

export const getOrganigramDataByPeriod = async (
	period: number
): Promise<EmployeeData[]> => {
	const p1 = supabase
		.from("EmployeeState")
		.select(
			"*, Employee!EmployeeState_employee_document_fkey(*), Period(*)"
		)
		.eq("period_id", period)
		.order("employee_document", { ascending: true });

	const p2 = await supabase
		.from("EmployeeState")
		.select("*")
		.eq("period_id", period - 1)
		.order("employee_document", { ascending: true });

	const [{ data, error }, { data: previousData }] = await Promise.all([
		p1,
		p2,
	]);

	const results: EmployeeData[] =
		data?.map((item: any) => {
			const month = `${item.Period.month}-${item.Period.year}`;
			const previous =
				previousData?.find(
					(x) => x.employee_document === item.employee_document
				) ?? null;

			const salaryIncrement = previous
				? item.salary - previous.salary
				: 0;

			return {
				month,
				id: item.id,
				area: item.area,
				level: item.level,
				salary: item.salary,
				salaryIncrement,
				subarea: item.subarea,
				division: item.division,
				periodId: item.period_id,
				employeeId: item.Employee.id,
				name: item.Employee.name,
				imageUrl: item.Employee.image_url,
				leadDocument: item.lead_document,
				document: item.Employee.document,
				startDate: item.Employee.start_date,
			};
		}) ?? [];
	return results ?? [];
};

export const getEmployeesList = async (): Promise<EmployeeTable[]> => {
	const { data } = await supabase
		.from("Employee")
		.select("*")
		.order("document", { ascending: true });

	const results: EmployeeTable[] =
		data?.map((item: any) => item as EmployeeTable) ?? [];

	return results;
};

export const getPeriodList = async (): Promise<PeriodData[]> => {
	const { data } = await supabase
		.from("Period")
		.select("*")
		.order("id", { ascending: true });

	const results: PeriodData[] =
		data?.map((item: any) => ({
			id: item.id,
			year: item.year,
			month: item.month,
		})) ?? [];

	return results;
};

export const upsertEntities = async ({
	periods,
	employees,
	employeeStates,
}: UpsertParams): Promise<void> => {
	const { error: b } = await supabase.from("Period").upsert(periods);

	const { error: d } = await supabase.from("Employee").upsert(employees);

	const { data: currentEmployees } = await supabase
		.from("Employee")
		.select("document");

	const currentDocuments =
		currentEmployees?.map((employee) => employee.document as string) ?? [];

	employeeStates.forEach((state) => {
		if (
			!state.lead_document ||
			!currentDocuments.includes(state.lead_document)
		) {
			state.lead_document = null;
		}
	});

	const { error } = await supabase
		.from("EmployeeState")
		.upsert(employeeStates);
};

export const uploadImage = async (
	document: string,
	extension: string,
	file: File
) => {
	if (document.length) {
		const { error: photoError } = await supabase.storage
			.from(bucketImages)
			.upload(`${document}.${extension}`, file, {
				cacheControl: "3600",
				upsert: true,
			});

		const url = import.meta.env.VITE_STORAGE_IMG_URL;

		const { error } = await supabase
			.from("Employee")
			.update({ image_url: `${url}${document}.${extension}` })
			.eq("document", document);
	}
};
