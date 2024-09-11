class HighlightConnections:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {}}  # No inputs required
    
    RETURN_TYPES = ()  # No outputs
    FUNCTION = "highlight"
    CATEGORY = "utils"

    def highlight(self):
        # This function doesn't need to do anything,
        # as the highlighting is handled by the JavaScript
        return ()

    @classmethod
    def IS_CHANGED(s):
        # This node doesn't process data, so it never changes
        return False

    @classmethod
    def VALIDATE_INPUTS(s):
        return True

# Register the node
NODE_CLASS_MAPPINGS = {
    "HighlightConnections": HighlightConnections
}

NODE_DISPLAY_NAME_MAPPINGS = {
    "HighlightConnections": "Highlight Connections"
}
