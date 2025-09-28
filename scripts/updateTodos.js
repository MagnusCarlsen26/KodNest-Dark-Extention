#!/usr/bin/env node
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const IGNORE_DIRS = new Set(['node_modules', '.git', 'dist']);
const TEXT_FILE_EXTS = new Set([
  '.js', '.jsx', '.ts', '.tsx', '.css', '.scss', '.sass', '.html'
]);

function listFilesWithTodosWithRipgrep() {
  const rgCmd = `rg --line-number -i "\\bTODO\\b" -- . 2>/dev/null \
    | rg -v "^(node_modules/|.git/|dist/)" 2>/dev/null`;
  try {
    const output = execSync(rgCmd, { encoding: 'utf8', cwd: process.cwd() });
    return output.split('\n').filter(Boolean);
  } catch (_err) {
    return [];
  }
}

function isLikelyTextFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (ext && TEXT_FILE_EXTS.has(ext)) return true;
  // Default to scanning unknown extensions that are small
  try {
    const stats = fs.statSync(filePath);
    return stats.size <= 2 * 1024 * 1024; // skip files >2MB
  } catch {
    return false;
  }
}

function listFilesWithTodosWithNode() {
  const results = [];
  const root = process.cwd();
  /** @type {string[]} */
  const stack = [root];
  while (stack.length) {
    const current = stack.pop();
    const entries = fs.readdirSync(current, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(current, entry.name);
      const relPath = path.relative(root, fullPath) || entry.name;
      if (entry.isDirectory()) {
        if (IGNORE_DIRS.has(entry.name)) continue;
        stack.push(fullPath);
      } else if (entry.isFile()) {
        if (!isLikelyTextFile(fullPath)) continue;
        // Avoid self-referencing aggregation
        if (relPath === 'TODO.md') continue;
        let content;
        try {
          content = fs.readFileSync(fullPath, 'utf8');
        } catch {
          continue;
        }
        const lines = content.split(/\r?\n/);
        for (let i = 0; i < lines.length; i += 1) {
          if (isTodoCommentLine(lines[i], path.extname(fullPath).toLowerCase())) {
            results.push(`${relPath}:${i + 1}:${lines[i]}`);
          }
        }
      }
    }
  }
  return results;
}

function isTodoCommentLine(line, ext) {
  const trimmed = line.trim();
  // Common patterns across languages
  const jsLike = /^(?:\/\/|\/\*+|\*)\s*TODO\b/i; // // TODO or /* TODO or * TODO
  const hashLike = /^(?:#)\s*TODO\b/i; // # TODO
  const htmlLike = /^<!--\s*TODO\b/i; // <!-- TODO
  const cssLike = /^\/\*+\s*TODO\b/i; // /* TODO

  switch (ext) {
    case '.js':
    case '.jsx':
    case '.ts':
    case '.tsx':
      return jsLike.test(trimmed);
    case '.css':
    case '.scss':
    case '.sass':
      return cssLike.test(trimmed) || jsLike.test(trimmed);
    case '.html':
      return htmlLike.test(trimmed);
    default:
      // Fallback conservative check: must start with a comment marker
      return jsLike.test(trimmed) || hashLike.test(trimmed) || htmlLike.test(trimmed) || cssLike.test(trimmed);
  }
}

function listFilesWithTodos() {
  const rg = listFilesWithTodosWithRipgrep();
  if (rg.length > 0) return rg;
  return listFilesWithTodosWithNode();
}

function groupByFile(lines) {
  const groups = new Map();
  for (const line of lines) {
    const sepIdx1 = line.indexOf(':');
    const sepIdx2 = line.indexOf(':', sepIdx1 + 1);
    if (sepIdx1 === -1 || sepIdx2 === -1) continue;
    const file = line.slice(0, sepIdx1);
    const lineNum = line.slice(sepIdx1 + 1, sepIdx2);
    let text = line.slice(sepIdx2 + 1).trim();
    text = text.replace(/^\/\/?\s*TODO\s*:?/i, '').trim();
    if (!groups.has(file)) groups.set(file, []);
    groups.get(file).push({ line: Number(lineNum), text });
  }
  return groups;
}

function formatMarkdown(groups) {
  const header = '# Project Todos\n\n';

  // Build a directory tree from file paths
  const tree = { dirs: new Map(), files: new Map() };

  const insertFile = (filePath, todos) => {
    const parts = filePath.replace(/\\/g, '/').split('/');
    let node = tree;
    for (let i = 0; i < parts.length - 1; i += 1) {
      const dir = parts[i];
      if (!node.dirs.has(dir)) node.dirs.set(dir, { dirs: new Map(), files: new Map() });
      node = node.dirs.get(dir);
    }
    const fileName = parts[parts.length - 1];
    node.files.set(fileName, { todos, filePath });
  };

  for (const [file, todos] of groups.entries()) {
    insertFile(file, todos.sort((a, b) => a.line - b.line));
  }

  const indentUnit = '  ';
  const lines = [];

  const crypto = require('crypto');
  const shortHash = (input) => crypto.createHash('sha1').update(input).digest('hex').slice(0, 8);

  const renderTree = (node, depth) => {
    // Directories first
    const dirNames = Array.from(node.dirs.keys()).sort();
    for (const [idx, dir] of dirNames.entries()) {
      lines.push(`${indentUnit.repeat(depth)}- ${dir}`);
      renderTree(node.dirs.get(dir), depth + 1);
      // Blank line between sibling directories
      if (idx < dirNames.length - 1) {
        lines.push('');
      }
    }
    // Blank line between directories and files when both exist
    if (dirNames.length > 0 && node.files.size > 0) {
      lines.push('');
    }
    // Then files
    const fileNames = Array.from(node.files.keys()).sort();
    for (const [idx, file] of fileNames.entries()) {
      lines.push(`${indentUnit.repeat(depth)}- ${file}`);
      const fileMeta = node.files.get(file);
      const fullPath = fileMeta.filePath;
      const todos = fileMeta.todos;
      for (const { line, text } of todos) {
        const id = shortHash(`${fullPath}:${line}:${text}`);
        lines.push(`${indentUnit.repeat(depth + 1)}- [ ] [id: ${id}] Line ${line}: ${text}`);
      }
      // Blank line between sibling files
      if (idx < fileNames.length - 1) {
        lines.push('');
      }
    }
  };

  renderTree(tree, 0);

  // Remove trailing blank lines and join
  return header + lines.join('\n') + (lines.length ? '\n' : '');
}

function main() {
  const lines = listFilesWithTodos();
  const groups = groupByFile(lines);
  const md = formatMarkdown(groups);
  const target = path.resolve(process.cwd(), 'TODO.md');
  fs.writeFileSync(target, md, 'utf8');
}

main();


