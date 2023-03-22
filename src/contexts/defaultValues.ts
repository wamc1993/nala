import { FileValidation } from "models/LoadFile";
import {
	OrganizationActions,
	OrganizationContextValue,
	OrganizationState,
} from "./OrganizationModel";

export const defaultState: OrganizationState = {
	isFetching: false,
	periodList: [],
	selectedPeriodId: 0,
	fileRows: [],
	employeeDataList: [],
	lastUpsertTime: null,
	fileValidation: null,
	employeeList: [],
};

export const defaultActions: OrganizationActions = {
	getPeriods: () => Promise.resolve(),
	setFileRows: (x: string[][]) => {},
	clearFileRows: () => {},
	setSelectedPeriod: (x: number) => {},
	upsertFileData: (x: FileValidation) => Promise.resolve(),
	getOrganigramData: (x: number) => Promise.resolve(),
	uploadEmployeePhoto: (x: string, y: string, z: File) => Promise.resolve(),
};

export const defaultContextValue: OrganizationContextValue = {
	...defaultState,
	...defaultActions,
};
