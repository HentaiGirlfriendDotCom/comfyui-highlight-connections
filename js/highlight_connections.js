import { app } from "../scripts/app.js";

function highlightConnections(nodeId) {
    const graph = app.graph;
    const nodes = graph._nodes;
    const links = graph.links;

    // Get the selected node and its group
    const selectedNode = graph.getNodeById(nodeId);
    if (!selectedNode) return;
    const groupId = selectedNode.group;

    // Reset all nodes and links in the group
    nodes.forEach(node => {
        if (node.group === groupId) {
            node.bgcolor = null;
            node.color = null;
        }
    });
    links.forEach(link => {
        const originNode = graph.getNodeById(link.origin_id);
        const targetNode = graph.getNodeById(link.target_id);
        if (originNode.group === groupId && targetNode.group === groupId) {
            link.color = null;
        }
    });

    // Highlight the selected node's connections and grey out others in the group
    nodes.forEach(node => {
        if (node.group === groupId && node.id !== nodeId) {
            node.bgcolor = "#555555";  // Dark grey for non-selected nodes in the group
        }
    });

    links.forEach(link => {
        const originNode = graph.getNodeById(link.origin_id);
        const targetNode = graph.getNodeById(link.target_id);
        if (originNode.group === groupId && targetNode.group === groupId) {
            if (link.origin_id === nodeId || link.target_id === nodeId) {
                link.color = "#FF0000";  // Bright red for connections to/from selected node
            } else {
                link.color = "#888888";  // Grey for other connections in the group
            }
        }
    });

    graph.setDirtyCanvas(true, true);
}

app.registerExtension({
    name: "Highlight.Connections",
    async setup(app) {
        LiteGraph.registerNodeType(
            "HighlightConnections",
            {
                title: "Highlight Connections",
                collapsable: true,
                
                widgets: [
                    { name: "highlight", type: "button", callback: function() {
                        highlightConnections(this.id);
                    }}
                ],

                onAdded: function() {
                    this.addWidget("button", "Highlight", null, function() {
                        highlightConnections(this.node.id);
                    });
                },

                onRemoved: function() {
                    // Reset all nodes and links in the group when this node is removed
                    const graph = app.graph;
                    const groupId = this.group;
                    graph._nodes.forEach(node => {
                        if (node.group === groupId) {
                            node.bgcolor = null;
                            node.color = null;
                        }
                    });
                    graph.links.forEach(link => {
                        const originNode = graph.getNodeById(link.origin_id);
                        const targetNode = graph.getNodeById(link.target_id);
                        if (originNode.group === groupId && targetNode.group === groupId) {
                            link.color = null;
                        }
                    });
                    graph.setDirtyCanvas(true, true);
                }
            }
        );
    }
});
