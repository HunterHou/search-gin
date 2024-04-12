import path from 'path';
import { copyFileSync, mkdirSync, existsSync, readdirSync } from 'fs';
import { shell } from 'electron';

export const initSearchSystem = () => {
  // 启动第三方工具
  const dirpath = process.env.DEBUGGING
    ? path.resolve(process.cwd(), 'tools')
    : path.resolve(__dirname, 'tools');

  const srcPath = process.env.DEBUGGING
    ? path.resolve(process.cwd(), 'src-electron\\icons\\qapp')
    : path.resolve(__dirname, 'icons\\qapp');

  if (!existsSync(dirpath)) {
    mkdirSync(dirpath, { recursive: true });
  }

  const SearchSystemsExe = 'appQuaser.exe';

  const execPath = path.resolve(dirpath, SearchSystemsExe);

  if (!existsSync(execPath)) {
    // copyFileSync(srcPath, dirpath); 
    console.log(dirpath);
    copyDir(srcPath, dirpath);
  }

  if (existsSync(execPath)) {
    shell.openPath(execPath).then((r) => console.log(r));
  }
};

function copyDir(src: string, dest: string) {
  const entries = readdirSync(src, { withFileTypes: true });

  mkdirSync(dest, { recursive: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      console.log(destPath);
      copyFileSync(srcPath, destPath);
    }
  }
}
