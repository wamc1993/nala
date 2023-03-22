import * as d3 from "d3";
import * as d3tip from "d3-v6-tip";

import { useEffect } from "react";

import { TreeItem } from "models/TreeItem";
import { useD3ResizableCanvas } from "hooks/.";

import { Container, GlobalStyles } from "./styles";
import { getTooltip } from "./tooltip";
import { EmployeeData } from "../../models/Employee";

interface Properties {
	data: TreeItem;
}

const defaultImg =
	"https://estaticos-cdn.elperiodico.com/clip/a027b5ee-cb46-4abe-9fb2-bd0483f14144_alta-libre-aspect-ratio_default_0.jpg";

const elbow = (d: any, margin: any, nodeSize: any) => {
	const dx = margin.x;
	const dy = margin.y;

	const x0 = d.source.x + dx;
	const x1 = d.target.x + dx;
	const y0 = d.source.y + dy;
	const y1 = d.target.y + dy - nodeSize.height / 2;

	const yMiddle = d.source.y + (d.target.y - d.source.y) * 0.85;

	return `M ${x0} ${y0} V${yMiddle} H${x1} V${y1}`;
};

export const Chart: React.FC<Properties> = ({ data }: Properties) => {
	const { canvas, dimension, referencia } = useD3ResizableCanvas({
		backgroundColor: "none",
		borderColor: "none",
	});

	useEffect(() => {
		if (referencia.current && dimension) {
			const svg = d3.select(referencia.current);
			const { width: ancho, height: largo } = dimension;

			const nodeSize = { width: 260, height: 70, imgWidth: 60 };
			const margin = {
				x: 10,
				y: 30 + nodeSize.height / 2,
			};

			if (!data) {
				svg.html("");
			} else {
				//Tooltip creado con la librería d3-tip
				if (svg.selectAll(".main-container").empty()) {
					svg.append("g").attr("class", "main-container");
					svg.append("g").attr("class", "tooltip-container");

					//Círculo de referencia para el tooltip
					//d3-tip suele pintar su popup guiándose por las posiciones x,y, ancho y largo del objecto objetivo
					//si el objetivo es una línea del largo de toda la gráfica, el tooltip no coincidirá con el cursor
					//Por ello, renderizaremos un círculo en la posición del cursor
					svg.select(".main-container")
						.append("circle")
						.attr("class", "tooltip-reference")
						.attr("cx", 0)
						.attr("cy", 0)
						.attr("fill", "transparent")
						.attr("r", 5);
				}

				const mainContainer = svg.select(".main-container");
				const tooltipContainer = svg.select(".tooltip-container");
				const tipReference = mainContainer.select(".tooltip-reference");

				const tip = d3tip
					.tip()
					.attr("class", "d3-tip")
					.html((event: any, d: any) => {
						const text = getTooltip(d.data.info as EmployeeData);
						return text;
					});

				tooltipContainer.call(tip);

				const root: any = d3.hierarchy(data);
				const treeLayout = d3
					.tree()
					.size([ancho - margin.x * 2, largo - margin.y * 2]);

				treeLayout(root);

				svg.append("defs")
					.append("marker")
					.attr("id", "arrowhead")
					.attr("class", "arrow-head")
					.attr("viewBox", "-0 -5 10 10")
					.attr("refX", 9)
					.attr("refY", 0)
					.attr("orient", "auto")
					.attr("markerWidth", 13)
					.attr("markerHeight", 13)
					.attr("xoverflow", "visible")
					.append("svg:path")
					.attr("d", "M 0,-5 L 10 ,0 L 0,5");

				mainContainer
					.selectAll(".link")
					.data(root.links())
					.join("path")
					.attr("class", "link")
					.attr("d", (d: any, i: any) => elbow(d, margin, nodeSize))
					.attr("opacity", 1)
					.attr("marker-end", "url(#arrowhead)");

				mainContainer
					.selectAll(".node")
					.data(root.descendants(), (entry: any) => entry.data.name)
					.join((enter: any) =>
						enter.append("rect").attr("opacity", 0)
					)
					.attr("class", "node")
					.attr(
						"x",
						(node: any) => node.x + margin.x - nodeSize.width / 2
					)
					.attr(
						"y",
						(node: any) => node.y + margin.y - nodeSize.height / 2
					)
					.attr("width", (node: any) => nodeSize.width)
					.attr("height", (node: any) => nodeSize.height)
					.attr("r", 10)
					.on("mouseover", (event: any, d: any) => {
						const [x, y] = d3.pointer(event);
						tipReference.attr("cx", x).attr("cy", y - 12);
						tip.show(event, d, tipReference.node());
					})
					.on("mouseout", tip.hide)
					.transition()
					.duration(200)
					.attr("opacity", 1);

				const withIncrement = root
					.descendants()
					.filter((node: any) => node.data.info?.salaryIncrement > 0);

				mainContainer
					.selectAll(".mark")
					.data(withIncrement, (entry: any) => entry.data.name)
					.join(
						(enter: any) => enter.append("g"),
						(update: any) => update.html(""),
						(exit: any) => exit.remove()
					)
					.attr("class", "mark")
					.attr("transform", (node: any) => {
						const x = node.x + margin.x + nodeSize.width / 2;
						const y = node.y + margin.y - nodeSize.height / 2;
						return `translate(${x},${y})`;
					})
					.call((m) => {
						m.append("circle")
							.attr("cx", 0)
							.attr("cy", 0)
							.attr("r", 15)
							.transition()
							.duration(200)
							.attr("opacity", 1);

						m.append("text").text("💰");

						return m;
					});

				mainContainer
					.selectAll(".info")
					.data(root.descendants(), (entry: any) => entry.data.name)
					.join(
						(enter: any) => enter.append("g"),
						(update: any) => update.html(""),
						(exit: any) => exit.remove()
					)
					.attr("class", "info")
					.attr("pointer-events", "none")
					.attr("transform", (d: any) => {
						const x = d.x + margin.x - nodeSize.width / 2;
						const y = d.y + margin.y - nodeSize.height / 2;
						return `translate(${x},${y})`;
					})
					.call((g) => {
						const textX =
							nodeSize.imgWidth +
							(nodeSize.width - nodeSize.imgWidth) / 2;

						g.append("text")
							.append("tspan")
							.attr("class", "node-title")
							.attr("y", "1.4rem")
							.attr("x", textX)
							.text((d: any) => d.data.info.name);

						g.append("text")
							.append("tspan")
							.attr("class", "node-title")
							.attr("y", "2.6rem")
							.attr("x", textX)
							.text((d: any) => `ID ${d.data.info.document}`);

						g.append("text")
							.append("tspan")
							.attr("class", "node-title")
							.attr("y", "3.8rem")
							.attr("x", textX)
							.text(
								(d: any) =>
									`${d.data.info.area} / ${d.data.info.subarea}`
							);

						g.append("image")
							.attr("class", "node-image")
							.attr("x", 5)
							.attr("y", 7)
							.attr("width", nodeSize.imgWidth - 5)
							.attr("height", nodeSize.imgWidth - 5)
							.attr("pointer-events", "none")
							.attr(
								"xlink:href",
								(d: any) => d.data.info?.imageUrl ?? defaultImg
							);
					});
			}
		}
	}, [referencia, dimension, data]);

	return (
		<Container>
			{canvas}
			<GlobalStyles />
		</Container>
	);
};
