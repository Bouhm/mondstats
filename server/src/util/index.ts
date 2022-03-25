import fs from 'fs';
import { reduce } from 'lodash';

export const cleanup = (dirPath, removeSelf = false) => {
  const files = fs.readdirSync(dirPath);

  if (files.length > 0)
    for (let i = 0; i < files.length; i++) {
      const filePath = dirPath + '/' + files[i];
      if (fs.statSync(filePath).isFile()) fs.unlinkSync(filePath);
      else cleanup(filePath);
    }
  if (removeSelf) fs.rmdirSync(dirPath);
};

export const getTotal = (stats: any, min = 0) => {
  return reduce(stats, (sum, curr) => sum + (curr.count >= min ? curr.count : 0), 0);
};

export function getShortName(item: { name: string; element?: string }) {
  const shortName =
    item.name === 'Traveler'
      ? `${item.name}-${item.element}`.toLowerCase()
      : item.name.split(' ').join('').toLowerCase();
  return shortName.replace(/[^\w\s]/gi, '');
}

export const unwindBy = (arr: any[], f: string) => {
  return arr.reduce((r, o) => r.concat(o[f].map((v) => ({ ...o, [f]: v }))), []);
};
