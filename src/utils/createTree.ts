import { TreeItem } from "models/TreeItem";
import { EmployeeData } from "models/Employee";

export const createTree = (array: EmployeeData[]): TreeItem => {
	const hashTable: { [x: string]: TreeItem } = {};

	array.forEach((item) => {
		hashTable[item.document] = {
			children: [],
			info: { ...item },
			name: item.document,
			parent: item.leadDocument ?? undefined,
		};
	});

	const dataTree: TreeItem[] = [];
	array.forEach((item) => {
		const { leadDocument, document } = item;
		if (leadDocument) {
			const child = hashTable[document];
			hashTable[leadDocument]?.children.push(child);
		} else {
			dataTree.push(hashTable[document]);
		}
	});

	return dataTree?.[0] ?? null;
};
