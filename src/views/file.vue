<template>
  <div class="file">
    <div class="header">{{ fileName }}</div>
    <div class="main">
      <div class="left">
        <el-button @click="save">导出文件</el-button>
      </div>
      <div class="editor" id="monaco-editor"></div>
      <!-- <div class="right">right</div> -->
    </div>
    <div class="foot"></div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, toRefs } from 'vue';
import { useRoute } from 'vue-router';

import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import { MonacoBinding } from 'y-monaco';
import * as monaco from 'monaco-editor';

import { useUser } from '@/store/user';
import { fileExtToLanguage, getFileExt } from '@/utils/map';
import { serverUrl } from '@/config/config';

import { UpdateEvent } from '@/interface/editor';

const route = useRoute();

const { fileName } = toRefs(route.params);

const { name } = toRefs(useUser());

console.log(fileName);

let editor: monaco.editor.IStandaloneCodeEditor;

function createEditor() {
  const ydocument = new Y.Doc();
  const provider = new WebsocketProvider(
    `${location.protocol === 'http:' ? 'ws:' : 'wss:'}//${serverUrl}:9500`,
    fileName.value as string,
    ydocument
  );
  const type = ydocument.getText(fileName.value as string);

  provider.awareness.setLocalStateField('user', {
    name: name.value,
  });

  provider.awareness.on('update', (ev: UpdateEvent) => {
    console.log(ev);
    const { added, updated, removed } = ev;
    console.log(provider.awareness.getStates());
    const states = provider.awareness.getStates();
    if (added.length > 0) {
      // add
    }
    if (updated.length > 0) {
      // update
      updated.forEach((id) => {
        const client = states.get(id);
        let user = client?.user;
        let dom = document.querySelector(`.yRemoteSelectionHead-${id}`);
        console.log(dom);
        if (dom) {
          dom.setAttribute('data-user', user?.name || '');
        }
      });
    }
    if (removed.length > 0) {
      // removed
    }
  });

  const editor = monaco.editor.create(
    document.getElementById('monaco-editor') as unknown as HTMLElement,
    {
      value: '', // MonacoBinding overwrites this value with the content of type
      language: fileExtToLanguage(getFileExt(fileName.value as string)),
    }
  );

  // Bind Yjs to the editor model
  const monacoBinding = new MonacoBinding(
    type,
    editor.getModel(),
    new Set([editor]),
    provider.awareness
  );
  return editor;
}

function save() {
  if (editor) {
    let res = editor.getValue();
    console.log(res);
    const bolb = new Blob([res]);
    const fd = new FileReader();

    const file = new File([bolb], fileName.value as string);

    console.log(file);

    fd.readAsDataURL(file);
    fd.onloadend = () => {
      const url = fd.result;
      let a: HTMLAnchorElement | null = document.createElement('a');
      a.download = fileName.value as string;
      a.href = url as string;
      a.click();
      a = null;
    };
  }
}

onMounted(() => {
  // 创建编辑器
  editor = createEditor();
});

onUnmounted(() => {
  // 卸载编辑器
  editor && editor.dispose();
});
</script>

<style lang="scss" scoped>
.file {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .header {
    height: 60px;
    background: rgb(204, 204, 204);
    color: rgb(51, 51, 51);
    box-sizing: border-box;
    border-bottom: 1px solid $primary;
  }
  .main {
    display: flex;
    // justify-content: space-between;
    height: calc(100vh - 120px);
    overflow: hidden;
    .left {
      width: 25%;
    }
    .editor {
      width: 60%;
      text-align: left;
    }
    .right {
      width: 25%;
    }
  }
  .foot {
    height: 60px;
    box-sizing: border-box;
    border-top: 1px solid $primary;
  }
}
</style>
