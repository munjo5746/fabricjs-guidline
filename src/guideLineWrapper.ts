import { fabric } from "fabric";

const BOUNDARY_THRESHHOLD = 2;
const loc: {
  [id: string]: {
    left: number;
    top: number;
    right: number;
    bottom: number;
    guideLine?: fabric.Line;
  };
} = {};
let guideLine: fabric.Line | undefined = undefined;
export const attatchGuidelineHandlers = (canvas: fabric.Canvas) => {
  canvas.on("object:moving", (e) => {
    const { target } = e;
    if (!target) return;

    const { id } = (target as any) || {};

    loc[id] = {
      left: target.left!,
      top: target.top!,
      right: target.left! + target.width!,
      bottom: target.top! + target.height!
    };

    const verticalAlignedId = Object.keys(loc)
      .filter((existingId) => existingId !== id)
      .find((existingId) => {
        const existingPosition = loc[existingId];
        if (!existingPosition) return false;

        return (
          Math.abs(existingPosition!.left! - target!.left!) <
            BOUNDARY_THRESHHOLD ||
          Math.abs(existingPosition!.right! - target!.left!) <
            BOUNDARY_THRESHHOLD
        );
      });

    if (verticalAlignedId) {
      const existing = loc[verticalAlignedId];
      if (!!guideLine) return;

      // find left or right
      if (Math.abs(existing.left! - target!.left!) < BOUNDARY_THRESHHOLD) {
        // left
        console.log("left");
      } else {
        // right
        console.log("right");
      }

      const line = new fabric.Line(
        [
          existing!.left! - 3,
          existing!.top! - 10,
          target!.left! - 3,
          target!.top! + target!.height! + 10
        ],
        {
          stroke: "red",
          strokeWidth: 3,
          fill: "red",
          selectable: false
        }
      );
      guideLine = line;

      canvas.add(line);
    } else {
      if (!!guideLine) {
        canvas.remove(guideLine);
        canvas.renderAll();

        guideLine = undefined;
      }
    }
  });

  return canvas;
};
