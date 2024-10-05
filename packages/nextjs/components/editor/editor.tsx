"use client";

import React from "react";
import {
  AdmonitionDirectiveDescriptor,
  BoldItalicUnderlineToggles,
  InsertTable,
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
}: {
  defaultValue?: string | null;
  onChange?: (text: string) => void;
}) {
  return (
    <div className="w-full flex mt-2 min-w-full max-w-full h-full">
      <MDXEditor
        onChange={(text: string) => console.log(text)}
        defaultValue={defaultValue}
        markdown={""}
        className="dark-theme dark-editor w-full bg-transparent border-2 rounded-lg flex flex-col"
        contentEditableClassName="w-full"
        plugins={[
          directivesPlugin({ directiveDescriptors: [AdmonitionDirectiveDescriptor] }),
          toolbarPlugin({
            toolbarContents: () => (
              <>
                <div className="flex justify-between  w-full">
                  <div className="">
                    <UndoRedo />
                  </div>
                  <div>
                    <BoldItalicUnderlineToggles />
                  </div>
                  <div className="right-10">
                    <InsertTable />
                  </div>
                </div>
              </>
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
          codeBlockPlugin({ defaultCodeBlockLanguage: "txt" }),
          codeMirrorPlugin({ codeBlockLanguages: { js: "JavaScript", css: "CSS", txt: "text", tsx: "TypeScript" } }),
          diffSourcePlugin({ viewMode: "rich-text", diffMarkdown: "boo" }),
          markdownShortcutPlugin(),
        ]}
      />
    </div>
  );
}
