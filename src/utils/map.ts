import { languageMap } from '@/config/config'

export function fileExtToLanguage(ext: string): string { 
  if (!ext) { 
    return 'text'
  }
  if (Object.keys(languageMap).includes(ext)) { 
    return languageMap[ext]
  }
  return 'html'
}

export function getFileExt(fileName: string): string { 
  if (!fileName.includes('.')) { 
    throw new Error(`${fileName} 没有正确的文件扩展名！`)
  }
  let ext = fileName.split('.').pop()
  if (ext) { 
    return ext
  }
  return ''

  console.log(ext)
}