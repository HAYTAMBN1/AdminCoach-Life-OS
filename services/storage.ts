
export const storage = {
  get: <T>(key: string, defaultValue: T): T => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (e) {
      console.error(`Error loading ${key} from storage`, e);
      return defaultValue;
    }
  },
  set: (key: string, value: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(`Error saving ${key} to storage`, e);
    }
  }
};

export const STORAGE_KEYS = {
  TODOS: 'admin_todos',
  XP: 'admin_xp',
  COMPLETED_TASKS: 'admin_completed_tasks',
  DICTIONARY: 'admin_dictionary',
  HISTORY: 'admin_history',
  CITY: 'admin_city',
  LAST_SURAH: 'admin_last_surah'
};
