import { useState } from "react";
import { useOrganizationContext } from "contexts/.";
import { FileRowPreview } from "components/fileRowPreview";
import { Popup } from "components/popup";

import { Alert } from "./alert";
import { Container, Table, PopupContent } from "./styles";

export const FilePreview: React.FC = () => {
	const { fileValidation, fileRows, upsertFileData, clearFileRows } =
		useOrganizationContext();

	const [popupContent, setPopupContent] = useState<string[] | null>(null);

	if (!fileValidation) {
		return (
			<Container minHeight={300}>
				<p>No se ha cargado un archivo...</p>
			</Container>
		);
	}

	const {
		isValid = false,
		rowValidations = [],
		canBePartial = false,
		ignoreFirstRow = false,
	} = fileValidation;

	const handleOnClick = async () => {
		if (isValid || canBePartial) {
			await upsertFileData(fileValidation!);
		}
	};

	const handleReloadFile = () => {
		clearFileRows();
	};

	const handleOnShowErrorPopup = (
		rowErrors: string[],
		fieldErrors: string[][]
	) => {
		let errors: string[] = [...rowErrors];
		fieldErrors.forEach((field) => {
			errors = [...errors, ...field];
		});

		setPopupContent(errors);
	};

	return (
		<Container>
			<Alert
				isValid={isValid}
				canBePartial={canBePartial}
				onSave={handleOnClick}
				onReload={handleReloadFile}
			/>

			{fileValidation ? (
				<Table>
					<div className="header">
						<div>#</div>
						<div>
							<div>Mes</div>
							<div>Nombre</div>
							<div>ID</div>
							<div>Fecha de ingreso</div>
							<div>Salario</div>
							<div>División</div>
							<div>Área</div>
							<div>Subárea</div>
							<div>Líder ID</div>
							<div>Nivel</div>
						</div>
						<div>Estado</div>
					</div>
					{fileRows.map((row, index) => (
						<FileRowPreview
							key={index}
							values={row}
							index={index}
							validation={rowValidations?.[index]}
							isHeader={ignoreFirstRow && index === 0}
							onClickError={handleOnShowErrorPopup}
						/>
					))}
				</Table>
			) : null}
			<Popup
				isOpen={!!popupContent}
				title={"Ups!"}
				onClose={() => {
					setPopupContent(null);
				}}
			>
				<PopupContent>
					<h4>Se han identificado los siguientes errores:</h4>
					<ul>
						{popupContent?.map((item, index) => (
							<li key={index}>{item}</li>
						))}
					</ul>
					<p>Si decides cargar el archivo, se ignorará esta línea.</p>
				</PopupContent>
			</Popup>
		</Container>
	);
};
