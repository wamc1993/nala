import { useRef } from "react";

import { EmployeeTable } from "models/Database";
import { useOrganizationContext } from "contexts/.";

import { Container, Row, NoContent } from "./styles";
import { EmployeePreviewRow } from "./employeePreviewRow";

export const EmployeesPreview: React.FC = () => {
	const inputRef = useRef<any>();
	const selectedEmployeeRef = useRef<EmployeeTable | undefined>();
	const { employeeList, uploadEmployeePhoto } = useOrganizationContext();

	const handleOnSelectFile = (employee: EmployeeTable) => {
		selectedEmployeeRef.current = employee;
		inputRef.current.click();
	};

	const handleOnChangeFile = (ev: React.ChangeEvent<HTMLInputElement>) => {
		const {
			target: { files },
		} = ev;

		if (files?.length && files[0]) {
			const document = selectedEmployeeRef.current?.document ?? "";
			const extension = files[0].type.split("/")?.[1] ?? "png";
			uploadEmployeePhoto(document, extension, files[0]);
		}
	};

	return (
		<Container>
			<input type="file" ref={inputRef} onChange={handleOnChangeFile} />
			<Row className="header">
				<div>Documento</div>
				<div>Nombre</div>
				<div>Fecha de ingreso</div>
				<div className="photo">Foto</div>
				<div className="actions">Acciones</div>
			</Row>
			{employeeList.length ? (
				employeeList.map((employee) => (
					<EmployeePreviewRow
						employee={employee}
						key={employee.document}
						handleOnSelectFile={handleOnSelectFile}
					/>
				))
			) : (
				<NoContent>
					No se han cargado colaboradores aún. Intenta cargando un CSV
					😇.
				</NoContent>
			)}
		</Container>
	);
};
