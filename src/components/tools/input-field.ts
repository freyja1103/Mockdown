import { DrawingTool, GridPos, PreviewCell, ToolResult } from './types';

const MIN_WIDTH = 4;
const DEFAULT_WIDTH = 13;

function buildInputPreview(row: number, col: number, width: number): PreviewCell[] {
  const w = Math.max(width, 4); // minimum "[__]"
  const cells: PreviewCell[] = [];
  cells.push({ row, col, char: '[' });
  cells.push({ row, col: col + w - 1, char: ']' });
  for (let c = col + 1; c < col + w - 1; c++) {
    cells.push({ row, col: c, char: '_' });
  }
  return cells;
}

export const inputFieldTool: DrawingTool = {
  id: 'input',
  label: 'Input',
  icon: 'TextCursorInput',

  onClick(pos: GridPos): ToolResult {
    return {
      kind: 'create',
      node: {
        type: 'input',
        name: 'Input',
        bounds: { x: pos.col, y: pos.row, width: DEFAULT_WIDTH, height: 1 },
        placeholder: '',
      },
    };
  },

  onDragStart(): PreviewCell[] | null { return []; },

  onDrag(start: GridPos, current: GridPos): PreviewCell[] | null {
    const minR = Math.min(start.row, current.row);
    const minC = Math.min(start.col, current.col);
    const maxC = Math.max(start.col, current.col);
    if (start.row === current.row && start.col === current.col) {
      return buildInputPreview(minR, minC, DEFAULT_WIDTH);
    }
    const w = Math.max(maxC - minC + 1, MIN_WIDTH);
    return buildInputPreview(minR, minC, w);
  },

  onDragEnd(start: GridPos, end: GridPos): ToolResult {
    const minR = Math.min(start.row, end.row);
    const minC = Math.min(start.col, end.col);
    const maxC = Math.max(start.col, end.col);
    const w = Math.max(maxC - minC + 1, MIN_WIDTH);

    return {
      kind: 'create',
      node: {
        type: 'input',
        name: 'Input',
        bounds: { x: minC, y: minR, width: w, height: 1 },
        placeholder: '',
      },
    };
  },
};
