import { ThemeProvider } from "@emotion/react";

import { theme } from "./theme";
import { GlobalStyles } from "./globalStyles";

export const StylesProvider = ({ children }: any) => {
	return (
		<ThemeProvider theme={theme}>
			{children}
			<GlobalStyles />
		</ThemeProvider>
	);
};
