import SyntaxHighlighter, { registerLanguage } from "react-syntax-highlighter/light";
import js from 'react-syntax-highlighter/languages/hljs/javascript';
import python from 'react-syntax-highlighter/languages/hljs/python';
import cs from 'react-syntax-highlighter/languages/hljs/cs';
import css from 'react-syntax-highlighter/languages/hljs/css';
import cpp from 'react-syntax-highlighter/languages/hljs/cpp';
import java from 'react-syntax-highlighter/languages/hljs/java';
import kotlin from 'react-syntax-highlighter/languages/hljs/kotlin';
import typescript from 'react-syntax-highlighter/languages/hljs/typescript';
import markdown from 'react-syntax-highlighter/languages/hljs/markdown';
import powershell from 'react-syntax-highlighter/languages/hljs/powershell';
import json from 'react-syntax-highlighter/languages/hljs/json';
import yaml from 'react-syntax-highlighter/languages/hljs/yaml';
import github from 'react-syntax-highlighter/styles/hljs/github';
import * as React from "react";
import { ui } from "../../../stores/UiStore";

registerLanguage('javascript', js);
registerLanguage('python', python);
registerLanguage('csharp', cs);
registerLanguage('java', java);
registerLanguage('typescript', typescript);
registerLanguage('cpp', cpp);
registerLanguage('css', css);
registerLanguage('kotlin', kotlin);
registerLanguage('markdown', markdown);
registerLanguage('powershell', powershell);
registerLanguage('json', json);
registerLanguage('yaml', yaml);

export function SyntaxHighlightedCodeBlock(props: { language: string, value: string }) {
  const onclick = () => {
    if (ui.isBrowser) {
      const copyEvent = new ClipboardEvent('copy', {
        dataType: 'text/plain',
        data: props.value
      });
      document.dispatchEvent(copyEvent);
    }
  };

  return <div>
    {/*<p>*/}
      {/*<span>{props.language}</span>*/}
      {/*<a style={{float: "right"}} onClick={onclick}>*/}
        {/*<LocaleMessage id={"markdownReader.copyCode"}/>*/}
      {/*</a>*/}
    {/*</p>*/}
    <SyntaxHighlighter language={props.language}
                       style={github}
                       showLineNumbers={true}>
      {props.value}
    </SyntaxHighlighter>
  </div>;
}