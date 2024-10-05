"use client";

import React from "react";
import {
  AdmonitionDirectiveDescriptor,
  BoldItalicUnderlineToggles,
  ChangeCodeMirrorLanguage,
  ConditionalContents,
  DiffSourceToggleWrapper,
  InsertCodeBlock,
  InsertFrontmatter,
  InsertImage,
  InsertSandpack,
  InsertTable,
  KitchenSinkToolbar,
  MDXEditor,
  SandpackConfig,
  ShowSandpackInfo,
  UndoRedo,
  codeBlockPlugin,
  codeMirrorPlugin,
  diffSourcePlugin,
  directivesPlugin,
  frontmatterPlugin,
  headingsPlugin,
  imagePlugin,
  linkDialogPlugin,
  linkPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin,
  sandpackPlugin,
  tablePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";

const Editor: React.FC = () => {
  return (
    <div className="w-full flex mt-2 min-w-full max-w-full h-full">
      <MDXEditor
        className="dark-theme dark-editor w-full bg-transparent border-2 rounded-lg flex flex-col"
        markdown={"Daje roma"}
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
          //   linkDialogPlugin(),
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
};

export default Editor;
