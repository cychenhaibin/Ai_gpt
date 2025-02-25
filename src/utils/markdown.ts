import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'
import copyImage from '@/assets/dialog/copy.png'

// 创建 markdown-it 实例
const md:any= new MarkdownIt({
    //允许解析和渲染HTML标签
    html:true,
    //定义代码高亮的函数
    highlight: function (str:string, lang?:string):string {
        if (lang && hljs.getLanguage(lang)) {
          try {
            //对代码进行语法高亮
            const highlighted = hljs.highlight(str, { language: lang, ignoreIllegals: true }).value;
            //把高亮后的代码根据分隔符分割，并且都加上了div
            const lines = highlighted.split('\n').map(line => `<div class="code-line">${line}</div>`).join('');
            // HTML结构
            return `<pre class="hljs pre">
                      <div class="code-block">
                        <span class="code-header">${lang}</span>
                        <span class="copy-button" onclick="copyCode(this)">
                          <img src="${copyImage}" alt="Copy">
                        </span>
                      </div>
                      <code class="hljs ${lang}">${lines}</code>
                    </pre>`;
          } catch (__) { }
        }
        return `<pre class="hljs"><code class="hljs">${md.utils.escapeHtml(str)}</code></pre>`;
    }
})

export default md