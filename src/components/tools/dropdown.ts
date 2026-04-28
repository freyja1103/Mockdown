import { DrawingTool, GridPos, PreviewCell, ToolResult } from './types';

const DEFAULT_LABEL = 'Option';
const MIN_WIDTH = 8;

function buildDropdownPreview(row: number, col: number, width: number, label: string): PreviewCell[] {
  const w = Math.max(width, 8); // minimum "[▾ Op ]"
  const inner = w - 4; // "[▾ " + "]"
  const padded = label.slice(0, inner).padEnd(inner, ' ');
  const str = `[▾ ${padded}]`;
  const cells: PreviewCell[] = [];
  for (let i = 0; i < str.length; i++) {
    cells.push({ row, col: col + i, char: str[i] });
  }
  return cells;
}

export const dropdownTool: DrawingTool = {
  id: 'dropdown',
  label: 'Dropdown',
  icon: 'ChevronDown',
  needsTextInput: true,

  onClick(pos: GridPos): ToolResult {
    const padded = DEFAULT_LABEL.padEnd(10, ' ');
    const str = `[▾ ${padded}]`;
    return {
      kind: 'create',
      node: {
        type: 'dropdown',
        name: 'Dropdown',
        bounds: { x: pos.col, y: pos.row, width: str.length, height: 1 },
        label: DEFAULT_LABEL,
      },
    };
  },

  onDragStart(): PreviewCell[] | null { return []; },

  onDrag(start: GridPos, current: GridPos): PreviewCell[] | null {
    const minR = Math.min(start.row, current.row);
    const minC = Math.min(start.col, current.col);
    const maxC = Math.max(start.col, current.col);
    if (start.row === current.row && start.col === current.col) {
      const padded = DEFAULT_LABEL.padEnd(10, ' ');
      return buildDropdownPreview(minR, minC, `[▾ ${padded}]`.length, DEFAULT_LABEL);
    }
    const w = Math.max(maxC - minC + 1, MIN_WIDTH);
    return buildDropdownPreview(minR, minC, w, DEFAULT_LABEL);
  },

  onDragEnd(start: GridPos, end: GridPos): ToolResult {
    const minR = Math.min(start.row, end.row);
    const minC = Math.min(start.col, end.col);
    const maxC = Math.max(start.col, end.col);
    const w = Math.max(maxC - minC + 1, MIN_WIDTH);

    return {
      kind: 'create',
      node: {
        type: 'dropdown',
        name: 'Dropdown',
        bounds: { x: minC, y: minR, width: w, height: 1 },
        label: DEFAULT_LABEL,
      },
    };
  },

  onTextInput(pos: GridPos, text: string): ToolResult {
    const label = text || DEFAULT_LABEL;
    const padded = label.padEnd(10, ' ');
    const str = `[▾ ${padded}]`;
    return {
      kind: 'create',
      node: {
        type: 'dropdown',
        name: 'Dropdown',
        bounds: { x: pos.col, y: pos.row, width: str.length, height: 1 },
        label,
      },
    };
  },
};
