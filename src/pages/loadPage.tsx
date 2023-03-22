import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Layout } from "components/layout";
import { FileReader } from "components/fileReader";
import { FilePreview } from "components/filePreview";
import { useOrganizationContext } from "contexts/.";
import { useEffect } from "react";

export const LoadPage: React.FC = () => {
	const { fileValidation, lastUpsertTime } = useOrganizationContext();

	useEffect(() => {
		if (lastUpsertTime) {
			toast("Perfecto! archivo cargado correctamente");
		}
	}, [lastUpsertTime]);

	return (
		<Layout showOrganigram showEmployees>
			<h1>Cargar svg</h1>
			{fileValidation ? <FilePreview /> : <FileReader />}
			<ToastContainer />
		</Layout>
	);
};
