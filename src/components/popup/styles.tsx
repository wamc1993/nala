import styled from "@emotion/styled";

export const Background = styled.div`
	top: 0;
	left: 0;
	position: absolute;

	display: flex;
	align-items: center;
	justify-content: center;

	width: 100vw;
	height: 100vh;
	background-color: rgba(0, 0, 0, 0.2);
`;

export const Container = styled.div<{ w: string; h: string }>`
	padding: 20px;
	border-radius: 5px;
	background-color: white;
	width: ${(props) => props.w};
	height: ${(props) => props.h};

	.popup-header {
		margin-bottom: 10px;
		padding-bottom: 10px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1px solid black;
	}
`;
