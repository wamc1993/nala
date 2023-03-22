const formatter = new Intl.NumberFormat(undefined, {
	style: "currency",
	currency: "COP",
	minimumFractionDigits: 0,
});

export const formatCurrency = (value: number): string => {
	return formatter.format(value);
};
