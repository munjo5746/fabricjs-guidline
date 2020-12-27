import * as React from "react";
import { fabric } from "fabric";
import { v4 } from "uuid";

import { attatchGuidelineHandlers } from "./guideLineWrapper";
import "./styles.css";

export default function App() {
  React.useEffect(() => {
    const canvas = attatchGuidelineHandlers(new fabric.Canvas("canvas"));
    const r1 = new fabric.Rect({ left: 10, top: 10, width: 50, height: 50 });
    const r2 = new fabric.Rect({ left: 70, top: 70, width: 50, height: 50 });

    fabric.util.object.extend(r1, {
      id: v4()
    });

    fabric.util.object.extend(r2, {
      id: v4()
    });

    canvas.add(r1);
    canvas.add(r2);
  }, []);
  return (
    <div className="App">
      <canvas
        id="canvas"
        width={300}
        height={300}
        style={{ border: "1px solid gray" }}
      />
    </div>
  );
}
