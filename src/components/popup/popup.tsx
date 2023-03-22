import ReactDOM from "react-dom";
import { Background, Container } from "./styles";

interface Properties {
	isOpen: boolean;
	title: string;
	width?: string;
	height?: string;
	children: React.ReactNode;
	onClose: () => void;
}

export const Popup: React.FC<Properties> = ({
	children,
	title,
	isOpen,
	width = "30vw",
	height = "auto",
	onClose,
}: Properties) => {
	if (!isOpen) {
		return null;
	}
	return ReactDOM.createPortal(
		<Background>
			<Container w={width} h={height}>
				<div className="popup-header">
					<h2>{title}</h2>
					<button onClick={onClose}>x</button>
				</div>
				{children}
			</Container>
		</Background>,
		document.body
	);
};
