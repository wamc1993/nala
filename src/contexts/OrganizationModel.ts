import { FileValidation } from "models/LoadFile";
import { EmployeeData, PeriodData } from "models/Employee";
import { EmployeeTable } from "models/Database";

export interface OrganizationState {
	isFetching: boolean;
	periodList: PeriodData[];
	selectedPeriodId: number;
	employeeDataList: EmployeeData[];
	employeeList: EmployeeTable[];
	fileRows: string[][];
	lastUpsertTime: Date | null;
	fileValidation: FileValidation | null;
}

export interface OrganizationActions {
	getPeriods: () => Promise<void>;
	setFileRows: (x: string[][]) => void;
	clearFileRows: () => void;
	setSelectedPeriod: (x: number) => void;
	upsertFileData: (x: FileValidation) => Promise<void>;
	getOrganigramData: (x: number) => Promise<void>;
	uploadEmployeePhoto: (x: string, y: string, z: File) => Promise<void>;
}

export type OrganizationContextValue = OrganizationState & OrganizationActions;

//Reducer interfaces
export enum OrganizationReducerActionsTypes {
	SET_ORGANIGRAM_DATA_INIT = "SET_ORGANIGRAM_DATA_INIT",
	SET_ORGANIGRAM_DATA_SUCCESS = "SET_ORGANIGRAM_DATA_SUCCESS",
	SET_EMPLOYEE_LIST_INIT = "SET_EMPLOYEE_LIST_INIT",
	SET_EMPLOYEE_LIST_SUCCESS = "SET_EMPLOYEE_LIST_SUCCESS",
	SET_PERIOD_LIST_INIT = "SET_PERIOD_LIST_INIT",
	SET_PERIOD_LIST_SUCCESS = "SET_PERIOD_LIST_SUCCESS",
	SET_SELECTED_PERIOD = "SET_SELECTED_PERIOD",
	SET_FILE_ROWS = "SET_FILE_ROWS",
	CLEAR_FILE_ROWS = "CLEAR_FILE_ROWS",
	SET_UPSERT_INIT = "SET_UPSERT_INIT",
	SET_UPSERT_SUCCESS = "SET_UPSERT_SUCCESS",
	SET_UPLOAD_PHOTO_INIT = "SET_UPLOAD_PHOTO_INIT",
	SET_UPLOAD_PHOTO_SUCCESS = "SET_UPLOAD_PHOTO_SUCCESS",
}

export interface SetOrganigramDataInitAction {
	type: OrganizationReducerActionsTypes.SET_ORGANIGRAM_DATA_INIT;
}

export interface SetOrganigramDataSuccessAction {
	type: OrganizationReducerActionsTypes.SET_ORGANIGRAM_DATA_SUCCESS;
	payload: EmployeeData[];
}

export interface SetEmployeeListInitAction {
	type: OrganizationReducerActionsTypes.SET_EMPLOYEE_LIST_INIT;
}

export interface SetEmployeeListSuccessAction {
	type: OrganizationReducerActionsTypes.SET_EMPLOYEE_LIST_SUCCESS;
	payload: EmployeeTable[];
}

export interface SetPeriodListInitAction {
	type: OrganizationReducerActionsTypes.SET_PERIOD_LIST_INIT;
}

export interface SetPeriodListSuccessAction {
	type: OrganizationReducerActionsTypes.SET_PERIOD_LIST_SUCCESS;
	payload: PeriodData[];
}

export interface SetSelectedPeriodAction {
	type: OrganizationReducerActionsTypes.SET_SELECTED_PERIOD;
	payload: number;
}

export interface SetFileRowsAction {
	type: OrganizationReducerActionsTypes.SET_FILE_ROWS;
	payload: {
		rows: string[][];
		validation: FileValidation;
	};
}

export interface ClearFileRowsAction {
	type: OrganizationReducerActionsTypes.CLEAR_FILE_ROWS;
}

export interface SetSelectedPeriodAction {
	type: OrganizationReducerActionsTypes.SET_SELECTED_PERIOD;
	payload: number;
}

export interface SetUpsertInitAction {
	type: OrganizationReducerActionsTypes.SET_UPSERT_INIT;
}

export interface SetUpsertSuccessAction {
	type: OrganizationReducerActionsTypes.SET_UPSERT_SUCCESS;
}

export interface SetUploadPhotoInitAction {
	type: OrganizationReducerActionsTypes.SET_UPLOAD_PHOTO_INIT;
}

export interface SetUploadPhotoSuccessAction {
	type: OrganizationReducerActionsTypes.SET_UPLOAD_PHOTO_SUCCESS;
}

export type OrganizationReducerAction =
	| SetOrganigramDataInitAction
	| SetOrganigramDataSuccessAction
	| SetEmployeeListInitAction
	| SetEmployeeListSuccessAction
	| SetPeriodListInitAction
	| SetPeriodListSuccessAction
	| SetSelectedPeriodAction
	| SetFileRowsAction
	| ClearFileRowsAction
	| SetUpsertInitAction
	| SetUpsertSuccessAction
	| SetUploadPhotoInitAction
	| SetUploadPhotoSuccessAction;
