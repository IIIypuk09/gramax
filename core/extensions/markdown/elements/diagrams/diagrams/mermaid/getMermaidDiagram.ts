import t from "@ext/localization/locale/translate";

const getMermaidDiagram = async (diagramContent: string) => {
	const mermaid = await import("mermaid");
	if (!diagramContent) throw new Error(t("diagram.error.cannot-get-data"));

	const diagramId = `mermaidGraph-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
	const diagramRenderContainer = document.createElement("div");
	document.body.appendChild(diagramRenderContainer);

	try {
		const { svg } = await mermaid.default.render(diagramId, diagramContent, diagramRenderContainer);
		return svg;
	} catch (error) {
		console.error("Mermaid diagram render error: ", error);

		if (
			error.message.includes("error loading dynamically imported module") ||
			error.message.includes("Failed to fetch dynamically imported module")
		)
			throw new Error(t("diagram.error.no-internet"));

		throw new Error(t("diagram.error.invalid-syntax"), { cause: error.message });
	} finally {
		diagramRenderContainer.remove();
	}
};

export default getMermaidDiagram;
