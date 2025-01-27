import { getFolders } from '../api/bookmark';

const id = 'visual-bookmarks';

const generateFolderItems = (foldersThree, rootId) => {
  // fix for https://github.com/k-ivan/visual-bookmarks-chrome/issues/55
  // auxiliary array with parent ids
  // 0 - root level
  const parentIds = ['0'];
  const translateItemTitle = chrome.i18n.getMessage('btn_save');

  const flatRecursiveFolders = (folders, parentId) => {
    return folders.reduce((accum, current) => {
      // add an item to the context menu
      // to save the bookmark inside the folder item
      if (!parentIds.includes(current.parentId)) {
        // if the current item has not yet been written to the auxiliary array
        // then add the save items and separator to the child items
        accum.push(
          {
            id: `save-${current.parentId}`,
            title: translateItemTitle,
            contexts: ['page'],
            parentId: current.parentId
          },
          {
            id: `separator-${current.parentId}`,
            type: 'separator',
            contexts: ['page'],
            parentId: current.parentId
          }
        );
      }
      // write the property to an auxiliary array
      parentIds.push(current.parentId);

      accum.push({
        id: current.id,
        title: current.title,
        contexts: ['page'],
        parentId
      });
      if (current.children?.length && parentId) {
        accum.push(
          ...flatRecursiveFolders(current.children, current.id)
        );
      }
      return accum;
    }, []);
  };
  return flatRecursiveFolders(foldersThree, rootId);
};

const browserContextMenu = {
  init() {
    const isShow = localStorage.getItem('show_contextmenu_item') === 'true';
    if (!isShow) return;

    chrome.contextMenus.removeAll(() => {
      if (chrome.runtime.lastError) {
        console.warn(chrome.runtime.lastError);
      }
      this.create();
    });
  },
  async create() {
    const foldersThree = await getFolders();
    const linkItems = [
      {
        id,
        title: chrome.i18n.getMessage('add_bookmark'),
        contexts: ['page']
      },
      {
        id: 'current_folder',
        title: chrome.i18n.getMessage('save_to_current_folder'),
        contexts: ['page'],
        parentId: id
      },
      {
        id: 'separator',
        type: 'separator',
        contexts: ['page'],
        parentId: id
      }
    ];

    const folders = generateFolderItems(foldersThree, id);
    linkItems.push(...folders);

    for (let item of linkItems) {
      chrome.contextMenus.create(item, () => {
        if (chrome.runtime.lastError) {
          console.warn(chrome.runtime.lastError?.message);
        }
      });
    }

  },
  toggle() {
    const isShow = localStorage.getItem('show_contextmenu_item') === 'true';

    if (isShow) {
      this.create();
    } else {
      chrome.contextMenus.removeAll(() => {
        if (chrome.runtime.lastError) return;
      });
    }
  }
};

export default browserContextMenu;
