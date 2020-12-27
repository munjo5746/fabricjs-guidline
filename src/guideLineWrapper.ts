import { fabric } from "fabric";

const BOUNDARY_THRESHHOLD = 2;
const LINE_WIDTH = 3;
const LINE_COLOR = "red";
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

      // find left or right and draw line with correct points
      let points: number[] = [];
      if (Math.abs(existing.left! - target!.left!) < BOUNDARY_THRESHHOLD) {
        // left
        const left = existing.left;
        const leftTop = Math.min(existing.top, target.top!);
        const leftBottom = Math.max(
          existing.bottom,
          target.top! + target.height!
        );
        points = [left, leftTop, left, leftBottom];
      } else {
        // right
        console.log("right");
      }

      const line = new fabric.Line(points, {
        stroke: LINE_COLOR,
        strokeWidth: LINE_WIDTH,
        fill: LINE_COLOR,
        selectable: false
      });
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
