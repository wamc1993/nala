import React, { useEffect } from "react";
import { useOrganizationContext } from "contexts/.";

type SelectEvent = React.ChangeEvent<HTMLSelectElement>;

export const PeriodSelector = () => {
	const { periodList, setSelectedPeriod, selectedPeriodId } =
		useOrganizationContext();

	const handleOnChange = (ev: SelectEvent) => {
		const {
			target: { value },
		} = ev;
		const periodId = Number(value);
		setSelectedPeriod(periodId);
	};

	useEffect(() => {
		if (periodList.length && selectedPeriodId === 0) {
			setSelectedPeriod(periodList[0].id);
		}
	}, [periodList, selectedPeriodId]);

	return (
		<div>
			<label>Periodo activo:</label>
			<select onChange={handleOnChange} value={selectedPeriodId}>
				{selectedPeriodId === 0 && (
					<option value={0}>Selecciona un periodo</option>
				)}
				{periodList.map((p) => (
					<option
						key={p.id}
						value={p.id}
					>{`${p.year} - ${p.month}`}</option>
				))}
			</select>
		</div>
	);
};
