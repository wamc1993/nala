import styled from "@emotion/styled";

export const Container = styled.div<{ minHeight?: number }>`
	gap: 1rem;
	display: flex;
	flex-direction: column;
	justify-content: center;

	${(props) => {
		if (props?.minHeight !== undefined) {
			return `height: ${props.minHeight}px`;
		}
		return "";
	}}
`;

export const InfoContent = styled.div`
	gap: 15px;
	padding: 10px;

	width: 100%;
	display: flex;
	align-items: center;

	border-radius: 8px;
	border: 1px dashed ${(props: any) => props.theme.colors.primary[500]};

	.recomendations {
		flex-grow: 1;
		flex-shrink: 1;
		flex-basis: 0;
	}
`;

export const Table = styled.div`
	width: 100%;
	.header {
		display: flex;
		text-align: center;
		font-weight: 700;
		padding: 5px 0;

		div:first-of-type {
			flex-grow: 0;
			flex-shrink: 0;
			flex-basis: 50px;
		}

		div:last-of-type {
			flex-grow: 0;
			flex-shrink: 0;
			flex-basis: 90px;
		}

		& > div:nth-of-type(2) {
			display: inline-flex;
			flex-grow: 1;
			flex-shrink: 1;
			flex-basis: 0px;

			div {
				flex-grow: 1;
				flex-shrink: 1;
				flex-basis: 0;
			}
		}
	}
`;

export const PopupContent = styled.div`
	gap: 10px;
	display: flex;
	flex-direction: column;
`;
