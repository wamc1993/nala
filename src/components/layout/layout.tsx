import { FaSitemap, FaFileArchive, FaUser } from "react-icons/fa";
import { Navbar, Container, CustomLink } from "./styles";

interface Properties {
	showLoad?: boolean;
	showOrganigram?: boolean;
	showEmployees?: boolean;
	children: React.ReactNode;
}

export const Layout = ({
	children,
	showLoad = false,
	showEmployees = false,
	showOrganigram = false,
}: Properties) => {
	return (
		<Container size={1100}>
			<Navbar>
				<h1 className="title">Nala</h1>
				<div>
					{showLoad && (
						<CustomLink to="/load">
							<div>
								<p>Cargar CSV</p>
								<FaFileArchive />
							</div>
						</CustomLink>
					)}
					{showOrganigram && (
						<CustomLink to="/">
							<div>
								<p>Ver organigrama</p>
								<FaSitemap />
							</div>
						</CustomLink>
					)}
					{showEmployees && (
						<CustomLink to="/employees">
							<div>
								<p>Colaboradores</p>
								<FaUser />
							</div>
						</CustomLink>
					)}
				</div>
			</Navbar>
			{children}
		</Container>
	);
};
