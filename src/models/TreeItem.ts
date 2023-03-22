export interface TreeItem {
	name: string;
	parent?: string;
	children: TreeItem[];
	info: any;
}
