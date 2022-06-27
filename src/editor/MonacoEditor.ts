import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket'
import { MonacoBinding } from 'y-monaco'
import * as monaco from 'monaco-editor'

class Editor {
  public selector: string
  constructor(selector: string, websocketUrl: string) { 
    this.selector = selector
    const ydocument = new Y.Doc()
    // this.provider = new WebsocketProvider(`${location.protocol === 'http:' ? 'ws:' : 'wss:'}//localhost:9500`, 'monaco', ydocument)
  }


}

const ydocument = new Y.Doc()
const provider = new WebsocketProvider(`${location.protocol === 'http:' ? 'ws:' : 'wss:'}//localhost:1234`, 'monaco', ydocument)
const type = ydocument.getText('monaco')

// const editor = monaco.editor.create(document.getElementById('monaco-editor'), {
//   value: '', // MonacoBinding overwrites this value with the content of type
//   language: "javascript"
// })

// Bind Yjs to the editor model
// const monacoBinding = new MonacoBinding(type, editor.getModel(), new Set([editor]), provider.awareness)