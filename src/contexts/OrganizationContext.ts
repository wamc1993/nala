import { createContext, useContext } from "react";
import { defaultContextValue } from "./defaultValues";
import { OrganizationContextValue } from "./OrganizationModel";

export const OrganizationContext =
	createContext<OrganizationContextValue>(defaultContextValue);

export const useOrganizationContext = () => useContext(OrganizationContext);
