import styled from "@emotion/styled";

interface FileProps {
	theme: any;
	hasFile: boolean;
}

export const Container = styled.div<FileProps>`
	height: 220px;
	padding: 8px;
	border-radius: 8px;

	cursor: ${(props) => (props.hasFile ? "default" : "pointer")};
	background-color: ${(props: any) => props.theme.colors.primary[900]};
	border: 1px dashed ${(props: any) => props.theme.colors.primary[400]};

	display: flex;
	align-items: center;
	justify-content: center;

	&:hover {
		border-color: ${(props: any) => props.theme.colors.primary[100]};
	}

	.label {
		font-size: 1.2rem;
	}

	.file {
		height: 100%;
		width: 250px;
		padding: 5px;
		position: relative;

		display: flex;
		gap: 0.5rem;
		align-items: center;
		flex-direction: column;
		justify-content: center;

		color: white;
		background-color: ${(props: any) => props.theme.colors.primary[800]};

		border-radius: 8px;
	}

	.remove {
		top: calc(50% - 11px);
		right: 1rem;
		cursor: pointer;
		position: absolute;
	}
`;
