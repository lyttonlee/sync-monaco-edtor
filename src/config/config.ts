export const files: string[] = ['main.js', 'user.java', 'run.py', 'safe.md']

interface Languages { 
  js: string
  [propName: string]: string
}

export const languageMap: Languages = {
  js: 'javascript',
  java: 'java',
  py: 'python',
  md: 'markdown'
}