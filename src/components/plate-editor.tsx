'use client'

import { withProps } from '@udecode/cn'
import { createPlateEditor, Plate, ParagraphPlugin, PlateLeaf } from '@udecode/plate-common/react'
import { LinkPlugin } from '@udecode/plate-link/react'
import { ImagePlugin, MediaEmbedPlugin } from '@udecode/plate-media/react'
import { TogglePlugin } from '@udecode/plate-toggle/react'
import {
  TablePlugin,
  TableRowPlugin,
  TableCellPlugin,
  TableCellHeaderPlugin,
} from '@udecode/plate-table/react'
import { TodoListPlugin } from '@udecode/plate-list/react'
import {
  BoldPlugin,
  ItalicPlugin,
  UnderlinePlugin,
  StrikethroughPlugin,
  SubscriptPlugin,
  SuperscriptPlugin,
} from '@udecode/plate-basic-marks/react'
import { KbdPlugin } from '@udecode/plate-kbd/react'
import { IndentListPlugin } from '@udecode/plate-indent-list/react'
import { AutoformatPlugin } from '@udecode/plate-autoformat/react'
import { BlockSelectionPlugin } from '@udecode/plate-selection/react'
import { DndPlugin } from '@udecode/plate-dnd'
import { ExitBreakPlugin, SoftBreakPlugin } from '@udecode/plate-break/react'
import { NodeIdPlugin } from '@udecode/plate-node-id'
import { ResetNodePlugin } from '@udecode/plate-reset-node/react'
import { DeletePlugin } from '@udecode/plate-select'
import { TabbablePlugin } from '@udecode/plate-tabbable/react'
import { TrailingBlockPlugin } from '@udecode/plate-trailing-block'
// import { SlashPlugin } from '@udecode/plate-slash-command'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { ImageElement } from '@/components/plate-ui/image-element'
import { LinkElement } from '@/components/plate-ui/link-element'
import { LinkFloatingToolbar } from '@/components/plate-ui/link-floating-toolbar'
import { ToggleElement } from '@/components/plate-ui/toggle-element'
import { MediaEmbedElement } from '@/components/plate-ui/media-embed-element'
import { ParagraphElement } from '@/components/plate-ui/paragraph-element'
import { TableElement } from '@/components/plate-ui/table-element'
import { TableRowElement } from '@/components/plate-ui/table-row-element'
import { TableCellElement, TableCellHeaderElement } from '@/components/plate-ui/table-cell-element'
import { TodoListElement } from '@/components/plate-ui/todo-list-element'
import { KbdLeaf } from '@/components/plate-ui/kbd-leaf'
import { Editor } from '@/components/plate-ui/editor'
import { FixedToolbar } from '@/components/plate-ui/fixed-toolbar'
import { FixedToolbarButtons } from '@/components/plate-ui/fixed-toolbar-buttons'
import { FloatingToolbar } from '@/components/plate-ui/floating-toolbar'
import { FloatingToolbarButtons } from '@/components/plate-ui/floating-toolbar-buttons'
import { withPlaceholders } from '@/components/plate-ui/placeholder'
import { withDraggables } from '@/components/plate-ui/with-draggables'
import { TooltipProvider } from '@/components/plate-ui/tooltip'

const editor = createPlateEditor({
  plugins: [
    LinkPlugin.configure({
      render: { afterEditable: () => <LinkFloatingToolbar /> },
    }),
    ImagePlugin,
    // TogglePlugin,
    ParagraphPlugin,
    MediaEmbedPlugin,
    // TablePlugin,
    // TodoListPlugin,
    BoldPlugin,
    ItalicPlugin,
    UnderlinePlugin,
    // StrikethroughPlugin,
    // SubscriptPlugin,
    // SuperscriptPlugin,
    // KbdPlugin,
    IndentListPlugin.configure({
      inject: { targetPlugins: ['p', 'h1', 'h2', 'h3'] },
    }),
    AutoformatPlugin.configure({
      options: {
        enableUndoOnDelete: true,
        rules: [
          // Usage: https://platejs.org/docs/autoformat
        ],
      },
    }),
    BlockSelectionPlugin,
    DndPlugin.configure({
      options: { enableScroller: true },
    }),
    ExitBreakPlugin.configure({
      options: {
        rules: [
          {
            hotkey: 'mod+enter',
          },
          {
            before: true,
            hotkey: 'mod+shift+enter',
          },
          {
            hotkey: 'enter',
            level: 1,
            query: {
              allow: ['h1', 'h2', 'h3'],
              end: true,
              start: true,
            },
            relative: true,
          },
        ],
      },
    }),
    NodeIdPlugin,
    ResetNodePlugin.configure({
      options: {
        rules: [
          // Usage: https://platejs.org/docs/reset-node
        ],
      },
    }),
    DeletePlugin,
    SoftBreakPlugin.configure({
      options: {
        rules: [
          { hotkey: 'shift+enter' },
          {
            hotkey: 'enter',
            query: {
              allow: ['code_block', 'blockquote', 'td', 'th'],
            },
          },
        ],
      },
    }),
    TabbablePlugin,
    TrailingBlockPlugin.configure({
      options: { type: 'p' },
    }),
    // SlashPlugin,
  ],
  override: {
    components: withDraggables(
      withPlaceholders({
        [ImagePlugin.key]: ImageElement,
        [LinkPlugin.key]: LinkElement,
        // [TogglePlugin.key]: ToggleElement,
        [MediaEmbedPlugin.key]: MediaEmbedElement,
        [ParagraphPlugin.key]: ParagraphElement,
        // [TablePlugin.key]: TableElement,
        // [TableRowPlugin.key]: TableRowElement,
        // [TableCellPlugin.key]: TableCellElement,
        // [TableCellHeaderPlugin.key]: TableCellHeaderElement,
        [TodoListPlugin.key]: TodoListElement,
        [BoldPlugin.key]: withProps(PlateLeaf, { as: 'strong' }),
        [ItalicPlugin.key]: withProps(PlateLeaf, { as: 'em' }),
        // [KbdPlugin.key]: KbdLeaf,
        // [StrikethroughPlugin.key]: withProps(PlateLeaf, { as: 's' }),
        // [SubscriptPlugin.key]: withProps(PlateLeaf, { as: 'sub' }),
        // [SuperscriptPlugin.key]: withProps(PlateLeaf, { as: 'sup' }),
        [UnderlinePlugin.key]: withProps(PlateLeaf, { as: 'u' }),
      }),
    ),
  },
  value: [
    {
      id: '1',
      type: 'p',
      children: [{ text: 'Hello, World!' }],
    },
  ],
})

export function PlateEditor() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Plate editor={editor}>
				
        <Editor variant="default" />
        <FloatingToolbar>
          <FloatingToolbarButtons />
        </FloatingToolbar>
      </Plate>
    </DndProvider>
  )
}
