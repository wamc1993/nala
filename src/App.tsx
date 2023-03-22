import { Routes } from "routes/Routes";
import { StylesProvider } from "styles/.";
import { OrganizationProvider } from "contexts/.";

function App() {
	return (
		<OrganizationProvider>
			<StylesProvider>
				<Routes />
			</StylesProvider>
		</OrganizationProvider>
	);
}

export default App;
