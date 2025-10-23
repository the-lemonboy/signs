# 富文本编辑器

基于 Slate.js 构建的现代化富文本编辑器，支持多种文本格式和块级元素。

## 功能特性

- ✅ 文本格式化（粗体、斜体、下划线、代码）
- ✅ 标题支持（H1、H2、H3）
- ✅ 引用块
- ✅ 有序和无序列表
- ✅ 现代化 UI 设计
- ✅ TypeScript 支持
- ✅ 响应式设计

## 技术栈

- React 18
- TypeScript
- Slate.js
- Vite
- CSS3

## 开发

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建项目
pnpm build

# 预览构建结果
pnpm preview
```

## 项目结构

```
src/
├── components/
│   ├── RichTextEditor.tsx    # 主编辑器组件
│   ├── Toolbar.tsx           # 工具栏组件
│   ├── Element.tsx           # 块级元素渲染
│   ├── Leaf.tsx              # 文本节点渲染
│   └── *.css                 # 样式文件
├── utils/
│   └── editorUtils.ts        # 编辑器工具函数
├── App.tsx                    # 应用入口
└── main.tsx                   # 应用启动
```

## 使用说明

1. 在编辑器中直接输入文本
2. 使用工具栏按钮格式化文本
3. 支持键盘快捷键（Ctrl+B 粗体，Ctrl+I 斜体等）
4. 支持多种块级元素类型

## 扩展功能

可以轻松扩展以下功能：

- 图片插入
- 表格支持
- 链接插入
- 代码块高亮
- 撤销/重做
- 导出功能
