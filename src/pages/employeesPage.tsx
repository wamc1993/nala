import { Layout } from "components/layout";
import { EmployeesPreview } from "components/employeesPreview";

export const EmployeesPage: React.FC = () => {
	return (
		<Layout showLoad showOrganigram>
			<h1>Colaboradores</h1>
			<EmployeesPreview />
		</Layout>
	);
};
