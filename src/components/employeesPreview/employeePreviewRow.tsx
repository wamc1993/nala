import { FaPhotoVideo } from "react-icons/fa";

import { EmployeeTable } from "models/Database";
import { Row } from "./styles";

interface Properties {
	employee: EmployeeTable;
	handleOnSelectFile: (e: EmployeeTable) => void;
}

export const EmployeePreviewRow: React.FC<Properties> = ({
	employee,
	handleOnSelectFile,
}: Properties) => {
	const { document, name, start_date, image_url } = employee;

	const photo = image_url?.length ? <img src={image_url} /> : <p>Sin foto</p>;

	return (
		<Row>
			<div>{document}</div>
			<div>{name}</div>
			<div>{start_date.toString()}</div>
			<div className="photo">{photo}</div>
			<div className="actions">
				<button
					type="button"
					className="btn-primary"
					onClick={() => handleOnSelectFile(employee)}
				>
					{image_url?.length ? "Cambiar foto" : "Cargar foto"}
					<FaPhotoVideo />
				</button>
			</div>
		</Row>
	);
};
