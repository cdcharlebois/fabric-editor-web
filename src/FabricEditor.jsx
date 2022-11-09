import { createElement } from "react";
import { fabric } from "fabric";

import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
// import { HelloWorldSample } from "./components/HelloWorldSample";
import "./ui/FabricEditor.css";

/*
    See the documentation here: https://www.npmjs.com/package/fabricjs-react 
    and here: http://fabricjs.com/docs/

*/

export function FabricEditor({ attrJson }) {
    const {editor, onReady} = useFabricJSEditor();
    const onAddCircle = () => {
        // editor.addCircle();
        // same as
        editor.canvas.add(
            new fabric.Circle({
                radius: 20,
                fill: "green",
                left: 100,
                top: 100
            })
        )
    }
    const onExportJSON = () => {
        attrJson.setValue(JSON.stringify(editor.canvas.toJSON()));
    }
    const onImportJSON = () => {
        editor.canvas.loadFromJSON(attrJson.value);
    }
    return (
        <div>
            <button onClick={onAddCircle}>Add Circle</button>
            <button onClick={onExportJSON}>Export JSON</button>
            <button onClick={onImportJSON}>Import JSON</button>
            <div className="fabric-canvas-container">
                <FabricJSCanvas className="fabric-canvas" onReady={onReady} />
            </div>
        </div>
    )
}
