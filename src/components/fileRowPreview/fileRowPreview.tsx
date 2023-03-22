import { RowValidation, RowValidationState } from "models/LoadFile";
import { CellValues } from "./cellValues";

import { Container } from "./styles";

interface Properties {
	values: string[];
	index: number;
	isHeader: boolean;
	validation?: RowValidation;
	onClickError?: (rowErrors: string[], fieldErrors: string[][]) => void;
}

const convertRowState = (value: RowValidationState) => {
	if (value === RowValidationState.FAILED) {
		return "Errado";
	}
	if (value === RowValidationState.IGNORE) {
		return "Ignorar";
	}
	return "Listo";
};

export const FileRowPreview: React.FC<Properties> = ({
	index,
	values,
	isHeader,
	validation,
	onClickError = (x: string[], y: string[][]) => {},
}: Properties) => {
	if (isHeader) {
		return null;
	}

	if (validation === undefined) {
		return (
			<div>
				<p>Indefinido :/</p>
			</div>
		);
	}

	const { fieldErrors, generalErrors, state } = validation;

	const handleOnClickSeeErrors = () => {
		if (state === RowValidationState.FAILED) {
			onClickError(generalErrors, fieldErrors);
		}
	};

	return (
		<Container isFailed={state === RowValidationState.FAILED}>
			<div className="index">
				<p>{index + 1}</p>
			</div>
			<div className="values">
				<CellValues
					values={values}
					fieldErrors={fieldErrors}
					rowErrors={generalErrors}
				/>
			</div>
			<div className="state">
				<p onClick={handleOnClickSeeErrors}>{convertRowState(state)}</p>
			</div>
		</Container>
	);
};
