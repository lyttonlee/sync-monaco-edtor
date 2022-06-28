export const files: string[] = ['main.js', 'user.java', 'run.py', 'safe.md'];

interface Languages {
  js: string;
  [propName: string]: string;
}

export const languageMap: Languages = {
  js: 'javascript',
  java: 'java',
  py: 'python',
  md: 'markdown',
};

// export const serverUrl: string = '43.138.223.36'
export const serverUrl: string = '127.0.0.1';
