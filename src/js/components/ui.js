import { $imageLoaded } from '../utils';


const colorScheme = window.matchMedia('(prefers-color-scheme: dark)');
const colorTheme = () => document.documentElement.classList.toggle('dark', colorScheme.matches);

export default {
  toggleTheme() {
    const theme = localStorage.getItem('color_theme');
    if (theme === 'os') {
      colorScheme.removeListener(colorTheme);
      colorTheme();
      colorScheme.addListener(colorTheme);
      return true;
    }

    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  },
  userStyles() {
    const styles = localStorage.getItem('custom_style');
    if (!styles) return;

    const style = document.createElement('style');
    style.appendChild(document.createTextNode(styles));
    document.head.appendChild(style);
  },
  setBG() {
    const bgEl = document.getElementById('bg');
    const bgState = localStorage.getItem('background_image');

    if (!['background_local', 'background_external'].includes(bgState)) {
      return;
    }
    const resource = localStorage.getItem(bgState);
    bgEl.style.backgroundImage = `url('${resource}')`;

    if (resource && resource !== '') {
      $imageLoaded(resource)
        .then(() => {
          document.body.classList.add('has-image');
          bgEl.style.opacity = 1;
        })
        .catch(e => {
          console.warn(`Local background image resource problem: ${e}`);
          bgEl.style.opacity = 1;
        });
    }
  },
  calculateStyles() {
    const doc = document.documentElement;
    const grid = document.getElementById('bookmarks');
    const gap = parseInt(window.getComputedStyle(doc).getPropertyValue('--grid-gap'), 10);
    const columns = parseInt(localStorage.getItem('dial_columns'));
    const ratio = 4 / 3;

    // Calculate and set container width
    const lsGridWidth = parseInt(localStorage.getItem('dial_width'));
    const gridWidth = Math.floor(window.innerWidth * (lsGridWidth / 100));

    doc.style.setProperty('--container-width', `${gridWidth}px`);

    // Calculate column dimensions
    const colWidth = Math.floor((grid.offsetWidth - ((columns - 1) * gap)) / columns);
    const colHeight = Math.floor(colWidth / ratio);

    // if column width less than 80px do not update styles
    if (colWidth < 80) {
      doc.style.setProperty('--grid-column-width', '');
      doc.style.setProperty('--grid-row-height', '');
      doc.style.setProperty('--grid-columns', '');
      return;
    }

    doc.style.setProperty('--grid-column-width', `${colWidth}px`);
    doc.style.setProperty('--grid-row-height', `${colHeight}px`);
    doc.style.setProperty('--grid-columns', columns);
  }
};
