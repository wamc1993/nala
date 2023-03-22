import { useState, useEffect } from "react";

export const useResizeObserver = (ref: any) => {
	const [dimension, setDimension] = useState<any>(null);
	useEffect(() => {
		const observeTarget = ref.current;
		if (observeTarget) {
			const resizeObserver = new ResizeObserver((entries) => {
				entries.forEach((entry) => setDimension(entry.contentRect));
			});

			resizeObserver.observe(observeTarget);

			return () => {
				resizeObserver.unobserve(observeTarget);
			};
		}
	}, [ref]);
	return {
		dimension,
	};
};

