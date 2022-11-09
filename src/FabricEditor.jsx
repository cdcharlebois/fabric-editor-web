import { createElement } from "react";

import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
// import { HelloWorldSample } from "./components/HelloWorldSample";
import "./ui/FabricEditor.css";

export function FabricEditor({ sampleText }) {
    const {editor, onReady} = useFabricJSEditor();
    const onAddCircle = () => {
        editor.addCircle();
    }
    return (
        <div>
            <button onClick={onAddCircle}>Add Circle</button>
            <div className="fabric-canvas-container">
                <FabricJSCanvas className="fabric-canvas" onReady={onReady} />
            </div>
        </div>
    )
}
