import { useReducer, useEffect } from "react";
import {
	uploadImage,
	getPeriodList,
	upsertEntities,
	getEmployeesList,
	getOrganigramDataByPeriod,
} from "services/employeeService";

import {
	OrganizationState,
	OrganizationContextValue,
	OrganizationReducerAction as Action,
	OrganizationReducerActionsTypes as Types,
} from "./OrganizationModel";
import { defaultState } from "./defaultValues";
import { FileValidation } from "models/LoadFile";
import { validateFile } from "utils/validateFileRow";
import { createUpsertItems } from "utils/createUpsert";

const reducer = (
	state: OrganizationState,
	action: Action
): OrganizationState => {
	const { type } = action;

	if (type === Types.SET_PERIOD_LIST_SUCCESS) {
		return {
			...state,
			isFetching: false,
			periodList: action.payload,
		};
	}

	if (type === Types.SET_ORGANIGRAM_DATA_SUCCESS) {
		return {
			...state,
			isFetching: false,
			employeeDataList: action.payload,
		};
	}

	if (type === Types.SET_EMPLOYEE_LIST_SUCCESS) {
		return {
			...state,
			isFetching: false,
			employeeList: action.payload,
		};
	}

	if (type === Types.SET_SELECTED_PERIOD) {
		return {
			...state,
			selectedPeriodId: action.payload,
		};
	}

	if (type === Types.SET_FILE_ROWS) {
		return {
			...state,
			fileRows: action.payload.rows,
			fileValidation: action.payload.validation,
		};
	}

	if (type === Types.CLEAR_FILE_ROWS) {
		return {
			...state,
			fileRows: [],
			fileValidation: null,
		};
	}

	if (type === Types.SET_UPSERT_SUCCESS) {
		return {
			...state,
			fileRows: [],
			fileValidation: null,
			lastUpsertTime: new Date(),
		};
	}

	if (type === Types.SET_UPLOAD_PHOTO_SUCCESS) {
		return {
			...state,
			lastUpsertTime: new Date(),
		};
	}

	const INIT_TYPES = [
		Types.SET_PERIOD_LIST_INIT,
		Types.SET_UPLOAD_PHOTO_INIT,
		Types.SET_ORGANIGRAM_DATA_INIT,
	];

	if (INIT_TYPES.includes(type)) {
		return {
			...state,
			isFetching: true,
		};
	}

	return state;
};

export const useOrganizationContext = (): OrganizationContextValue => {
	const [state, dispatch] = useReducer(reducer, defaultState);
	const { selectedPeriodId, lastUpsertTime } = state;

	const setSelectedPeriod = (id: number) => {
		dispatch({
			type: Types.SET_SELECTED_PERIOD,
			payload: id,
		});
	};

	const getOrganigramData = async (periodId: number): Promise<void> => {
		dispatch({
			type: Types.SET_ORGANIGRAM_DATA_INIT,
		});

		const data = await getOrganigramDataByPeriod(periodId);

		dispatch({
			type: Types.SET_ORGANIGRAM_DATA_SUCCESS,
			payload: data,
		});
	};

	const getPeriods = async (): Promise<void> => {
		dispatch({
			type: Types.SET_PERIOD_LIST_INIT,
		});

		const data = await getPeriodList();

		dispatch({
			type: Types.SET_PERIOD_LIST_SUCCESS,
			payload: data,
		});
	};

	const getEmployees = async (): Promise<void> => {
		dispatch({
			type: Types.SET_EMPLOYEE_LIST_INIT,
		});

		const data = await getEmployeesList();

		dispatch({
			type: Types.SET_EMPLOYEE_LIST_SUCCESS,
			payload: data,
		});
	};

	const setFileRows = (rows: string[][]): void => {
		const validation = validateFile(rows);
		dispatch({
			type: Types.SET_FILE_ROWS,
			payload: {
				rows,
				validation,
			},
		});
	};

	const clearFileRows = (): void => {
		dispatch({
			type: Types.CLEAR_FILE_ROWS,
		});
	};

	const upsertFileData = async (
		fileValidation: FileValidation
	): Promise<void> => {
		dispatch({
			type: Types.SET_UPSERT_INIT,
		});
		const entities = createUpsertItems(fileValidation.rowValidations);
		await upsertEntities(entities);

		dispatch({
			type: Types.SET_UPSERT_SUCCESS,
		});
	};

	const uploadEmployeePhoto = async (
		document: string,
		extension: string,
		photo: File
	): Promise<void> => {
		dispatch({
			type: Types.SET_UPLOAD_PHOTO_INIT,
		});

		await uploadImage(document, extension, photo);

		dispatch({
			type: Types.SET_UPLOAD_PHOTO_SUCCESS,
		});
	};

	useEffect(() => {
		getPeriods();
		getEmployees();
	}, [lastUpsertTime]);

	useEffect(() => {
		if (selectedPeriodId) {
			const fetch = async () => {
				await getOrganigramData(selectedPeriodId);
			};
			fetch();
		} else {
			dispatch({
				type: Types.SET_ORGANIGRAM_DATA_SUCCESS,
				payload: [],
			});
		}
	}, [selectedPeriodId]);

	return {
		...state,
		getPeriods,
		setFileRows,
		clearFileRows,
		upsertFileData,
		setSelectedPeriod,
		getOrganigramData,
		uploadEmployeePhoto,
	};
};
