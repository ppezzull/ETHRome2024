"use client";

import React from "react";
import {
  AdmonitionDirectiveDescriptor,
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  InsertTable,
  ListsToggle,
  MDXEditor,
  UndoRedo,
  codeBlockPlugin,
  codeMirrorPlugin,
  diffSourcePlugin,
  directivesPlugin,
  frontmatterPlugin,
  headingsPlugin,
  imagePlugin,
  linkPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin,
  tablePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";

export default function Editor({
  defaultValue,
  onChange = () => {},
  readOnly = false,
}: {
  defaultValue?: string | null;
  onChange?: (text: string) => void;
  readOnly?: boolean;
}) {
  return (
    <div className="w-full flex mt-2 min-w-full max-w-full h-full text-white p-0">
      <MDXEditor
        onChange={(text: string) => onChange(text)}
        markdown={""}
        readOnly={readOnly}
        className="prose dark:prose-invert prose-p:mt-0 prose-p:mb-0 w-full bg-transparent border-2 rounded-lg flex flex-col"
        contentEditableClassName="w-full"
        plugins={[
          directivesPlugin({ directiveDescriptors: [AdmonitionDirectiveDescriptor] }),
          toolbarPlugin({
            toolbarContents: () => (
              <div className="flex justify-between  w-full">
                <div className="flex justify-between w-full">
                  <UndoRedo />
                  <div className="flex">
                    <BoldItalicUnderlineToggles />
                    <InsertTable />
                    <ListsToggle />
                    <BlockTypeSelect />
                  </div>
                </div>
              </div>
            ),
          }),
          listsPlugin(),
          quotePlugin(),
          headingsPlugin(),
          linkPlugin(),
          imagePlugin(),
          tablePlugin(),
          thematicBreakPlugin(),
          frontmatterPlugin(),
          markdownShortcutPlugin(),
        ]}
      />
    </div>
  );
}
