import { OrganizationContext } from "./OrganizationContext";
import { useOrganizationContext } from "./useOrganizationContext";

interface Properties {
	children: React.ReactNode;
}

export const OrganizationProvider: React.FC<Properties> = ({
	children,
}: Properties) => {
	const value = useOrganizationContext();
	return (
		<OrganizationContext.Provider value={value}>
			{children}
		</OrganizationContext.Provider>
	);
};
