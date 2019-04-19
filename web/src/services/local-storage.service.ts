const NAMESPACE = 'unwind:';

const clear = () => {
  const keys = Object.keys(window.localStorage).filter(key => key.startsWith(NAMESPACE));

  keys.forEach(key => window.localStorage.removeItem(key));
};

const remove = (key: string) => {
  window.localStorage.removeItem(NAMESPACE + key);
};

const setItem = (key: string, value: any) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value);
  }

  window.localStorage.setItem(NAMESPACE + key, value);
};

const getItem = <T>(key: string): T => {
  let value = window.localStorage.getItem(NAMESPACE + key);

  if (value) {
    try {
      value = JSON.parse(value);
    } catch {}
  }

  return (value as unknown) as T;
};

export const localStorageService = {
  clear,
  remove,
  setItem,
  getItem,
};
