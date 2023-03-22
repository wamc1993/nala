import styled from "@emotion/styled";

export const Container = styled.div`
	gap: 5px;
	display: flex;
	flex-direction: column;
	justify-content: center;

	input {
		display: none;
	}

	.header {
		font-weight: 700;
		text-align: center;
	}
`;

export const NoContent = styled.div`
	width: 100%;
	padding: 10px 0;
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const Row = styled.div`
	width: 100%;
	padding: 10px 0;
	display: flex;
	align-items: center;
	border-bottom: 1px solid ${(props: any) => props.theme.colors.primary[400]};

	& > div {
		flex-grow: 1;
		flex-shrink: 1;
		flex-basis: 0;
	}

	& > .photo {
		flex-grow: 1.5;
		flex-shrink: 1.5;
		flex-basis: 0;

		display: inline-flex;
		justify-content: center;

		img {
			width: 50%;
		}
	}

	& .actions {
		width: 100%;
		display: inline-flex;
		justify-content: center;

		svg {
			padding-left: 2px;
		}
	}
`;
