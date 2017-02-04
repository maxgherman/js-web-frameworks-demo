
export const OPEN_MENU = 'OPEN_MENU';
export const CLOSE_MENU = 'CLOSE_MENU';
export const SET_TITLE = 'SET_TITLE';

export function openMenu() {
  return {
    type: OPEN_MENU
  }
}

export function closeMenu() {
  return {
    type: CLOSE_MENU
  }
}

export function setTitle(title) {
  return {
    type: SET_TITLE,
    title : title
  }
}

