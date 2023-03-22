import styled from "@emotion/styled";

export const Container = styled.div<{ isFailed: boolean }>`
	width: 100%;

	display: flex;
	align-items: center;
	border-bottom: 1px solid ${(props: any) => props.theme.colors.primary[400]};

	${(props: any) =>
		props.isFailed
			? `background-color: ${props.theme.colors.danger[900]};`
			: ""};

	& > .index {
		flex-grow: 0;
		flex-shrink: 0;
		flex-basis: 50px;

		p {
			font-weight: 700;
			padding: 0 0.5rem;
			text-align: center;
			color: ${(props: any) => props.theme.colors.primary[200]};
		}
	}

	& > .values {
		flex-grow: 1;
		flex-shrink: 1;
		flex-basis: 0;
	}

	& > .state {
		flex-grow: 0;
		flex-shrink: 0;
		flex-basis: 90px;

		p {
			text-align: center;
			color: ${(props: any) => props.theme.colors.primary[200]};
			text-decoration: ${(props) =>
				props.isFailed ? "underline" : "none"};
			cursor: ${(props) => (props.isFailed ? "pointer" : "default")};
		}
	}
`;

export const ValuesContainer = styled.div`
	width: 100%;
	padding: 3px 0;
	flex-direction: row;
	display: inline-flex;
	align-items: center;

	div:nth-of-type(1) {
		width: 100%;
		flex-direction: row;
		display: inline-flex;
		align-items: center;
	}
`;

export const Value = styled.div<{ isFailed: boolean; isEmpty: boolean }>`
	display: inline-flex;
	flex-direction: column;
	flex-basis: 10%;
	flex-grow: 0;
	flex-shrink: 0;

	p {
		color: ${(props: any) =>
			props.isFailed
				? props.theme.colors.danger[400]
				: props.isEmpty
				? props.theme.colors.gray[500]
				: props.theme.colors.gray[300]};

		font-style: ${(props: any) => (props.isEmpty ? "italic" : "normal")};
	}
`;
