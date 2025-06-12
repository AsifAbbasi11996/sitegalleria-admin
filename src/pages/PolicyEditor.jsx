import { useEffect, useRef } from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { $generateHtmlFromNodes, $generateNodesFromDOM } from '@lexical/html';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getRoot } from 'lexical';

const editorConfig = {
  namespace: 'MyEditor',
  theme: {
    paragraph: 'editor-paragraph',
  },
  onError(error) {
    throw error;
  },
};

function HTMLLoader({ html }) {
  const [editor] = useLexicalComposerContext();
  const hasLoaded = useRef(false);

  useEffect(() => {
    if (!html || hasLoaded.current) return;

    editor.update(() => {
      const parser = new DOMParser();
      const dom = parser.parseFromString(html, 'text/html');
      const nodes = $generateNodesFromDOM(editor, dom);
      const root = $getRoot();
      root.clear();
      root.append(...nodes);
    });

    hasLoaded.current = true;
  }, [html, editor]);

  return null;
}


function PolicyEditor({ onChange, initialValue }) {
  const handleChange = (editorState, editor) => {
    editorState.read(() => {
      const html = $generateHtmlFromNodes(editor, null);
      if (onChange) onChange(html);
    });
  };

  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className="border border-[#e2e2e2] p-2.5 min-h-[300px] mb-2.5">
        <RichTextPlugin
          contentEditable={
            <ContentEditable className="outline-0 min-h-[150px]" />
          }
          placeholder={<div>Enter text...</div>}
        />
        <HistoryPlugin />
        <HTMLLoader html={initialValue} />
        <OnChangePlugin onChange={handleChange} />
      </div>
    </LexicalComposer>
  );
}

export default PolicyEditor;
