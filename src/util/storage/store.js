const storage = {
  set: (key, value) => localStorage.setItem(key, JSON.stringify(value)),
  get: (key) => {
    const item = localStorage.getItem(key);
    try {
      return JSON.parse(item);
    } catch (e) {
      return null;
    }
  },
  remove: (key) => localStorage.removeItem(key),
};

// Safari in incognito has local storage, but size 0


export default storage;