/*
  В функцию appendToBody передаются 3 параметра:
  tag - имя тега, content - содержимое тега и count - количество вставок.
  Необходимо, чтобы функция осуществила вставку на страницу указанный тег с указанным содержимым указанное число раз.
  Считаем, что всегда передается тег, допускающий вставку текста в качестве своего содержимого (P, DIV, I и пр.).
*/
export function appendToBody(tag, content, count) {
  if (count <= 0) return;

  const fragment = document.createDocumentFragment();

  for (let i = 0; i < count; i += 1) {
    const element = document.createElement(tag);
    element.textContent = content;
    fragment.appendChild(element);
  }

  document.body.appendChild(fragment);
}

/*
  Создайте дерево вложенных тегов DIV.
  Каждый узел дерева должен содержать childrenCount узлов.
  Глубина дерева задается параметром level.
  Каждый элемент должен иметь класс вида item_n, где n - глубина вложенности элемента. (Нумерацию ведем с единицы).
  Сформированное дерево верните в качестве результата работы функции.
*/
export function generateTree(childrenCount, level) {
  function createLevelNode(currentLevel) {
    if (currentLevel > level || childrenCount <= 0) {
      return null;
    }

    const container = document.createElement('div');

    for (let i = 0; i < childrenCount; i += 1) {
      const node = document.createElement('div');
      node.classList.add(`item_${currentLevel}`);

      const childTree = createLevelNode(currentLevel + 1);
      if (childTree) {
        node.appendChild(childTree);
      }

      container.appendChild(node);
    }

    return container;
  }

  return createLevelNode(1);
}

/*
  Используйте функцию для создания дерева тегов DIV из предыдущего задания.
  Создайте дерево с вложенностью 3 и числом элементов в каждом узле 2.
  Далее замените все узлы второго уровня (т.е. имеющие класс item_2) на теги SECTION.
  Остальную структуру дерева сохраните неизменной, включая классы и те элементы,
  которые находились внутри переписанных тегов.
  Сформированное дерево верните в качестве результата работы функции.
*/
export function replaceNodes() {
  const tree = generateTree(2, 3);
  if (!tree) return null;

  const levelTwoNodes = tree.querySelectorAll('.item_2');

  levelTwoNodes.forEach((oldNode) => {
    const section = document.createElement('section');
    section.className = oldNode.className;

    while (oldNode.firstChild) {
      section.appendChild(oldNode.firstChild);
    }

    oldNode.replaceWith(section);
  });

  return tree;
}
