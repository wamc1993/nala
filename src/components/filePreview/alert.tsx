import React from "react";
import {
	FaCheck,
	FaSkullCrossbones,
	FaExclamationTriangle,
} from "react-icons/fa";

import { InfoContent } from "./styles";

interface Properties {
	isValid: boolean;
	canBePartial: boolean;
	onSave: () => Promise<void>;
	onReload: () => void;
}

export const Alert: React.FC<Properties> = ({
	onSave,
	isValid,
	onReload,
	canBePartial,
}: Properties) => {
	const message = isValid
		? ["El archivo está perfecto! puedes cargarlo"]
		: canBePartial
		? [
				"El archivo presenta errores en algunas filas. Si lo deseas, puedes cargar las filas que están listas, e ignoraremos las otras filas.",
				"Para ver los errores de una línea en concreto, haz clic en el enlace <<Errado>>, al costado derecho de la fila.",
		  ]
		: [
				"El archivo presenta errores estructurales y no es posible cargar su contenido. Intenta cargado otro archivo.",
		  ];

	const Icon = isValid
		? FaCheck
		: canBePartial
		? FaExclamationTriangle
		: FaSkullCrossbones;

	return (
		<InfoContent>
			<Icon size={"3rem"} />
			<div className="recomendations">
				{message.map((m, index) => (
					<p key={index}>{m}</p>
				))}
			</div>
			{canBePartial && (
				<button className="btn-primary" onClick={onSave}>
					Cargar{" "}
				</button>
			)}
			<button className="btn-secondary" onClick={onReload}>
				Cargar otro archivo
			</button>
		</InfoContent>
	);
};
