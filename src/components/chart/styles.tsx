import styled from "@emotion/styled";
import { Global, css, useTheme } from "@emotion/react";

export const Container = styled.div`
	width: 100%;
	height: 70vh;

	.node {
		rx: 5px;
		fill: #fff;
		stroke: ${(props: any) => props.theme.colors.primary[400]};
	}

	.arrow-head path {
		fill: ${(props: any) => props.theme.colors.primary[400]};
		stroke: none;
	}

	.link {
		fill: none;
		stroke: ${(props: any) => props.theme.colors.primary[400]};
	}

	.node-title,
	.node-text {
		text-anchor: middle;
		font-size: 1rem;
	}

	.node-image {
		object-fit: cover;
	}

	.mark {
		circle {
			fill: ${(props: any) => props.theme.colors.primary[400]};
			stroke: ${(props: any) => props.theme.colors.primary[500]};
			stroke-width: 1;
		}

		text {
			text-anchor: middle;
			dominant-baseline: middle;
			pointer-events: none;
		}
	}
`;

export const GlobalStyles = () => {
	const theme = useTheme() as any;

	return (
		<Global
			styles={css`
				.d3-tooltip {
					width: 300px;
					padding: 1rem;

					gap: 5px;
					display: flex;
					flex-direction: column;

					background-color: white;
					border-radius: 8px;
					border: 1px solid ${theme.colors.primary[400]};

					& > div {
						gap: 5px;
						display: flex;
						flex-direction: row;
					}
				}
			`}
		/>
	);
};
