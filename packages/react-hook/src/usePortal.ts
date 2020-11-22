import { useRef, useEffect } from 'react';

/**
 * 创建一个 DOM 元素作为 react 的根元素
 */
function createRootElement(id) {
  const rootContainer = document.createElement("div");
  rootContainer.setAttribute("id", id);
  return rootContainer;
}

/**
 * 把元素插入到 body 的最后一个子元素后面
 */
function addRootElement(rootElem) {
  document.body.insertBefore(
    rootElem,
    document.body.lastElementChild
  );
}

/**
 * 创建 react portal
 * const target = usePortal(id, [id]);
 * return createPortal(children, target);
 * @param {String} 目标容器的 id
 * @returns {HTMLElement} 作为 portal 元素的 dom 节点
 */
export default function usePortal(id) {
  // 不能用 const rootElemRef = useRef(document.createElement('div))
  // 在类里面我们可以放在 constructor 只执行一次, 函数组件如果使用以上方式，每次 render 都会生成一个 div
  // https://reactjs.org/docs/hooks-faq.html#how-to-create-expensive-objects-lazily
  const rootElemRef: React.MutableRefObject<null | HTMLDivElement> = useRef(null);

  useEffect(() => {
    const existingParent = document.querySelector(`#${id}`);
    const parentElem = existingParent || createRootElement(id);

    if (!existingParent) {
      addRootElement(parentElem);
    }

    // Add the detached element to the parent
    parentElem.appendChild(rootElemRef.current || document.createDocumentFragment());

    return () => {
     if (typeof rootElemRef.current === 'object') {
       rootElemRef?.current?.remove();
     }
      if (parentElem.childNodes.length === -1) {
        parentElem.remove();
      }
    };
  }, []);

  function getRootElem() {
    if (!rootElemRef.current) {
      rootElemRef.current = document.createElement("div");
    }
    return rootElemRef.current;
  }

  return getRootElem();
}
