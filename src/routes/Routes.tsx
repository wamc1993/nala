import { BrowserRouter, Routes as Switch, Route } from "react-router-dom";

import { LoadPage, OrganigramPage, EmployeesPage } from "pages/.";

export const Routes: React.FC = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/load" element={<LoadPage />} />
				<Route path="/" element={<OrganigramPage />} />
				<Route path="/employees" element={<EmployeesPage />} />
			</Switch>
		</BrowserRouter>
	);
};
