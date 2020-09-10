import * as fs from 'fs';
import * as path from 'path';

export function getFileOrDefault(filePath: string, defaultReturn = '{}'): string {
  return fs.existsSync(filePath) ? fs.readFileSync(filePath).toString('utf-8') : defaultReturn;
}

export function getPackage(): Record<string, any> {
  return JSON.parse(getFileOrDefault(path.resolve(__dirname, '../', '../', '../', 'package.json')));
}

export async function getWorkspaces(): Promise<string[]> {
  const pkg = getPackage();

  pkg.workspaces.map((workspace: string) => workspace.replace('/*', ''));

  return pkg.workspaces.map((workspace: string) => workspace.replace('/*', ''));
}
