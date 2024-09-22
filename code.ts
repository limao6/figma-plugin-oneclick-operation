// code.ts

// 显示插件的用户界面
figma.showUI(__html__, { width: 240, height: 200 }); // 增加高度以适应新按钮

// 处理消息
figma.ui.onmessage = async (msg) => {
  if (msg.type === 'add-auto-layout') {
    const selection = figma.currentPage.selection;

    if (selection.length === 0) {
      figma.notify("请先选择一个或多个元素。");
      return; // 如果没有选择元素，则退出
    }

    for (const node of selection) {
      if ("layoutMode" in node) {
        if (node.layoutMode === 'NONE') {
          node.layoutMode = 'VERTICAL'; // 设置为垂直自动布局
          node.paddingLeft = 10; // 设置内边距
          node.paddingRight = 10;
          node.paddingTop = 10;
          node.paddingBottom = 10;
        }
      }
    }

    figma.notify("已为选中的元素添加自动布局属性。");
  }

  if (msg.type === 'remove-auto-layout') {
    const selection = figma.currentPage.selection;

    if (selection.length === 0) {
      figma.notify("请先选择一个或多个元素。");
      return; // 如果没有选择元素，则退出
    }

    for (const node of selection) {
      if ("layoutMode" in node) {
        if (node.layoutMode !== 'NONE') {
          node.layoutMode = 'NONE'; // 移除自动布局
        }
      }
    }

    figma.notify("已为选中的元素移除自动布局属性。");
  }

  if (msg.type === 'add-parent-node') {
    const selection = figma.currentPage.selection;

    if (selection.length === 0) {
      figma.notify("请先选择一个或多个元素。");
      return; // 如果没有选择元素，则退出
    }

    // 为每个选中的元素添加一个父级节点
    for (const node of selection) {
      // 创建一个新的父级节点
      const parentNode = figma.createFrame();
      parentNode.name = `${node.name} - Parent Node`; // 设置父级节点的名称
      parentNode.resize(node.width + 20, node.height + 20); // 根据子节点的大小设置父级节点的大小
      parentNode.x = node.x - 10; // 设置父级节点的位置，确保子节点在中间
      parentNode.y = node.y - 10;

      // 将选中的节点添加到父级节点中
      parentNode.appendChild(node);
    }

    figma.notify("已为每个选中的元素添加父级节点。");
  }
};
