import React from "react";
import { Value, ValuesContainer } from "./styles";

interface Properties {
	values: string[];
	fieldErrors: string[][];
	rowErrors?: string[];
}

export const CellValues: React.FC<Properties> = ({
	values,
	fieldErrors,
	rowErrors = [],
}: Properties) => {
	const createContent = () => {
		let errors = [...rowErrors];
		const ui: React.ReactNode[] = [];

		for (let i = 0; i < values.length; i++) {
			const value = values[i];
			const isEmpty = value?.trim()?.length === 0;
			const isFailed = !!fieldErrors?.[i]?.length;

			ui.push(
				<Value isFailed={isFailed} isEmpty={isEmpty} key={i}>
					<p>{value ? value : "--vacío--"}</p>
				</Value>
			);

			if (fieldErrors?.[i]?.length) {
				errors = [...errors, ...fieldErrors[i]];
			}
		}

		return ui;
	};

	return <ValuesContainer>{createContent()}</ValuesContainer>;
};
