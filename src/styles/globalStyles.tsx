import { Global, css, useTheme } from "@emotion/react";

export const GlobalStyles = () => {
	const theme = useTheme() as any;
	return (
		<Global
			styles={css`
				@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap");

				html {
					font-size: 15px;
				}

				body {
					margin: 0;
				}

				* {
					box-sizing: border-box;
					font-family: "Roboto", sans-serif;
					color: ${theme.colors.gray[300]};
				}

				p,
				h1,
				h2,
				h3,
				h4,
				h5,
				h6,
				ul,
				li,
				body {
					margin: 0px;
				}

				h1 {
					font-size: 2rem;
					color: ${theme.colors.primary[300]};
				}

				h2 {
					font-size: 1.7rem;
					color: ${theme.colors.primary[200]};
				}

				h2 {
					font-size: 1.5rem;
					color: ${theme.colors.primary[100]};
				}

				p {
					margin: 0px;
					line-height: 1.1;
				}

				ul {
					padding-left: 1rem;
				}

				button {
					border: none;
					height: 2rem;
					outline: none;
					cursor: pointer;
					padding: 0 0.5rem;
					border-radius: 5px;
				}

				input,
				select {
					width: 100%;
					height: 2rem;
					outline: none;
					padding: 0 0.5rem;

					border-radius: 5px;
					border: 1px ${theme.colors.gray[500]} solid;
				}

				.btn-primary {
					color: white;
					background-color: ${theme.colors.primary[500]};

					* {
						color: white;
					}

					&:hover {
						background-color: ${theme.colors.primary[300]};
					}
				}

				.btn-secondary {
					color: white;
					background-color: ${theme.colors.gray[500]};

					* {
						color: white;
					}

					&:hover {
						background-color: ${theme.colors.gray[400]};
					}
				}
			`}
		/>
	);
};
