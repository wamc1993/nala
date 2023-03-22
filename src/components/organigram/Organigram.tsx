import { createTree } from "utils/createTree";
import { useOrganizationContext } from "contexts/.";

import { NoContent } from "./styles";

import { Chart } from "../chart";

export const Organigram = () => {
	const { employeeDataList } = useOrganizationContext();

	if (!employeeDataList?.length) {
		return (
			<NoContent>
				No existen registros en el sistema, intenta cargando un CSV 😇.
			</NoContent>
		);
	}

	const data = createTree(employeeDataList);

	return <Chart data={data} />;
};
