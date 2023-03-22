import { formatCurrency } from "utils/format";
import { EmployeeData } from "models/Employee";

const template = `
<div>
    <strong>Nombre:</strong>
    <span'>DATA.name</span>
</div>
<div>
    <strong>ID:</strong>
    <span'>DATA.document</span>
</div>
<div>
    <strong>División:</strong>
    <span'>DATA.division</span>
</div>
<div>
    <strong>Área/subárea:</strong>
    <span'>DATA.area/DATA.subarea</span>
</div>
<div>
    <strong>Salario:</strong>
    <span'>$DATA.salary</span>
</div>
`;

const incrementSalaryTemplate = `
<div>
    <strong>Aumento:</strong>
    <span'>$DATA.increment 💰</span>
</div>
`;

const baseProperties = [
	"name",
	"document",
	"division",
	"area",
	"subarea",
	"division",
	"salary",
];

export const getTooltip = (data: EmployeeData): string => {
	const baseprops = baseProperties.reduce((acc, props) => {
		let value: any = data?.[props as keyof EmployeeData] ?? "";

		if (props === "salary") {
			value = formatCurrency(value);
		}
		return acc.replace(`DATA.${props}`, value);
	}, template);

	let incrementProp = "";
	if (data.salaryIncrement > 0) {
		const value = formatCurrency(data.salaryIncrement);
		incrementProp = incrementSalaryTemplate.replace(
			"DATA.increment",
			value
		);
	}

	return `<div class="d3-tooltip">${baseprops}${incrementProp}</div>`;
};
