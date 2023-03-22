import { Layout } from "components/layout";
import { Organigram } from "components/organigram";
import { PeriodSelector } from "components/periodSelector";

export const OrganigramPage: React.FC = () => {
	return (
		<Layout showLoad showEmployees>
			<h1>Organigrama</h1>
			<PeriodSelector />
			<Organigram />
		</Layout>
	);
};
