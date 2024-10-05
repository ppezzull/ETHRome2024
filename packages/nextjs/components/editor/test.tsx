'use client';

import '@mdxeditor/editor/style.css'
import { MDXEditor, UndoRedo, BoldItalicUnderlineToggles, toolbarPlugin, linkPlugin, linkDialogPlugin, imagePlugin, InsertTable, tablePlugin, InsertImage, codeBlockPlugin, sandpackPlugin, codeMirrorPlugin, SandpackConfig, ConditionalContents, ChangeCodeMirrorLanguage, ShowSandpackInfo, InsertCodeBlock, InsertSandpack, KitchenSinkToolbar, listsPlugin, quotePlugin, headingsPlugin, thematicBreakPlugin, frontmatterPlugin, directivesPlugin, diffSourcePlugin, markdownShortcutPlugin, DiffSourceToggleWrapper, AdmonitionDirectiveDescriptor, InsertFrontmatter } from '@mdxeditor/editor'

import React from 'react';
import { imageUploadHandler } from './imageUploadHandler';






const TestPage: React.FC = () => {

	return (
		<div className="w-full flex mt-10 min-w-full max-w-full">
			<MDXEditor
			 className="dark-theme dark-editor w-full"
			 markdown={"Daje roma"}
			 contentEditableClassName="w-full h-full"
			 plugins={[
				directivesPlugin({ directiveDescriptors: [AdmonitionDirectiveDescriptor] }),
			   toolbarPlugin({ toolbarContents: () =>
				<>
					<div className='flex justify-between w-full'>
						<div className=''>
							<UndoRedo />
						</div>
						<div>
							<BoldItalicUnderlineToggles />
						</div>
						<div className='right-10'>
							<InsertTable />
						</div>
					</div>
				</>
			    }),
			   listsPlugin(),
			   quotePlugin(),
			   headingsPlugin(),
			   linkPlugin(),
			   linkDialogPlugin(),
			   imagePlugin(),
			   tablePlugin(),
			   thematicBreakPlugin(),
			   frontmatterPlugin(),
			   codeBlockPlugin({ defaultCodeBlockLanguage: 'txt' }),
			   codeMirrorPlugin({ codeBlockLanguages: { js: 'JavaScript', css: 'CSS', txt: 'text', tsx: 'TypeScript' } }),
			   diffSourcePlugin({ viewMode: 'rich-text', diffMarkdown: 'boo' }),
			   markdownShortcutPlugin()
			 ]}
			/>
		</div>
	)
};

export default TestPage;