import { useCSVReader, formatFileSize } from "react-papaparse";

import { Container } from "./styles";
import { useOrganizationContext } from "contexts/.";

export const FileReader = () => {
	const { CSVReader } = useCSVReader();
	const { setFileRows } = useOrganizationContext();

	return (
		<div>
			<CSVReader
				onUploadAccepted={(results: any) => {
					console.log({ results });
					setFileRows(results?.data ?? []);
				}}
			>
				{({
					Remove,
					getRootProps,
					acceptedFile,
					getRemoveFileProps,
				}: any) => {
					const rootProps = getRootProps();
					const removeProps = getRemoveFileProps();

					if (acceptedFile) {
						rootProps["onClick"] = () => {};
					}

					const onRemoveClick = (...args: any) => {
						setFileRows([]);
						removeProps.onClick(...args);
					};

					return (
						<>
							<Container {...rootProps} hasFile={!!acceptedFile}>
								{acceptedFile ? (
									<>
										<div className="file">
											<span>
												{formatFileSize(
													acceptedFile.size
												)}
											</span>
											<span>{acceptedFile.name}</span>
											<div
												{...removeProps}
												className="remove"
												onClick={onRemoveClick}
											>
												<Remove />
											</div>
										</div>
									</>
								) : (
									<p className="label">{`Arrastra un archivo .csv o haz click aquí para seleccionar un archivo 🔎`}</p>
								)}
							</Container>
						</>
					);
				}}
			</CSVReader>
		</div>
	);
};
