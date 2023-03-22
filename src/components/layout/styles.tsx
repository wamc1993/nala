import styled from "@emotion/styled";
import { Link } from "react-router-dom";

export const Container = styled.div<{ size: number }>`
	gap: 8px;
	display: flex;
	flex-direction: column;

	padding: ${(props) => `0 max(calc(50% - ${props.size / 2}px), 15px) 1rem`};
`;

export const Navbar = styled.div`
	height: 70px;
	padding: 15px 0 0;
	position: sticky;

	display: flex;
	align-items: center;
	justify-content: space-between;

	border-bottom: 1px solid ${(props: any) => props.theme.colors.primary[300]};

	& > div {
		display: inline-flex;
	}

	.title {
		font-weight: 700;
		font-size: 3rem;
		color: ${(props: any) => props.theme.colors.gray[100]};
	}
`;

export const CustomLink = styled(Link)`
	padding: 0 10px;
	text-align: center;
	text-decoration: none;

	div {
		gap: 5px;
		display: flex;
		align-items: center;
		* {
			color: ${(props: any) => props.theme.colors.primary[300]};
		}
	}
`;
