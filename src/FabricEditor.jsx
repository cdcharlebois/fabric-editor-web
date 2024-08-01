import { createElement, useEffect, useRef } from "react";
import { fabric } from "fabric";

import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
// import { HelloWorldSample } from "./components/HelloWorldSample";
import "./ui/FabricEditor.css";

/*
    See the documentation here: https://www.npmjs.com/package/fabricjs-react 
    and here: http://fabricjs.com/docs/

*/

export function FabricEditor({ attrJson, datasource, objectJSON, objectType }) {
    const { editor, onReady } = useFabricJSEditor();
    const setListener = useRef(false);
    useEffect(() => {
        if (editor && setListener.current === false && datasource.status === "available") {
            editor.canvas.on('object:modified', (event) => {
                // todo update the mendix object
                const { mxid } = event.target.data;
                const item = datasource.items.find(item => item.id === mxid)
                // cannot edit directly in widget, need to call nanoflow to do this.
                console.warn(`attempting to update item with id: ${item.id}. new JSON value should be: `);
                console.warn(JSON.stringify(event.target.toJSON()));
            });
            setListener.current = true;
        }

    }, [editor])
    useEffect(() => {
        if (datasource.status === "available") {
            datasource.items.forEach((item, i) => {
                let canvasObj;
                switch (objectType.get(item).value) {
                    case "circle":
                        canvasObj = new fabric.Circle(JSON.parse(objectJSON.get(item).value))
                        canvasObj.data = {
                            mxid: item.id
                        }
                        break;
                    default:
                        canvasObj = new fabric.Circle({
                            radius: 20,
                            fill: "blue",
                            left: 100 + 100 * i,
                            top: 100 + 100 * i
                        })
                }
                editor.canvas.add(canvasObj);
            })
        }
    }, [datasource])
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
