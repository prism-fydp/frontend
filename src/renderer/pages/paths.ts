/*
 * Page paths stored as enum values for ease of use. Avoid entering page paths
 * directly as strings because typos will not be type-checked at compile-time.
 */
const enum Paths {
  LANDING = '/',
  SIGNUP = '/signup',
  LOGIN = '/login',
  DASHBOARD = '/dashboard',
  SETTINGS = '/settings',
  SEARCH = '/search',
  READER = '/md-reader',
  EDITOR = '/md-editor',
}

export const currentPath = () => {
  return window.location.hash.substring(1);
};

/*
 * Simple function to determine if the provided path is the current path
 */
export const isCurrentPath = (path: Paths) => {
  return currentPath() === path;
};

export default Paths;
