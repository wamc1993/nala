import { useRef } from "react";
import { useResizeObserver } from "./useResizeObserver";

const svgInitialStyle = {
	overflow: "visible",
	width: "100%",
	height: "100%",
};

const containerStyle: any = {
	display: "inline-flex",
	flexDirection: "column",
	alignItems: "stretch",
	justifyContent: "center",
	height: "100%",
	width: "100%",
	padding: "0",
	margin: "0",
};

export const useD3ResizableCanvas = ({
	borderColor = null,
	backgroundColor = null,
}: any) => {
	const d3SvgRef: any = useRef();
	const d3ContainerRef: any = useRef();
	const { dimension } = useResizeObserver(d3ContainerRef);

	const defineCssSvg = () => {
		let svgStyle: any = { ...svgInitialStyle };

		if (borderColor) {
			svgStyle = {
				...svgStyle,
				border: `2px solid ${borderColor}`,
			};
		}

		if (backgroundColor) {
			svgStyle = {
				...svgStyle,
				backgroundColor,
			};
		}

		return svgStyle;
	};

	const canvas = (
		<div
			className="svg-container"
			style={containerStyle}
			ref={d3ContainerRef}
		>
			<svg style={defineCssSvg()} ref={d3SvgRef}></svg>
		</div>
	);

	return {
		canvas,
		dimension,
		referencia: d3SvgRef,
	};
};
