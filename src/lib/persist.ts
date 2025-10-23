// Lightweight persistence helpers for Magang form
// - Text values to localStorage
// - ZIP file to IndexedDB

export type BaseFormValues = {
  nama: string;
  nrp: string;
  kelompokKP: string;
  q1: string;
  q2: string;
  q3: string;
};

export type DivisionAnswers = Record<
  string,
  { q1?: string; q2?: string; q3?: string; q4?: string; q5?: string }
>;

const LS_KEYS = {
  base: 'magang.form.base',
  divisions: 'magang.form.selectedDivisions',
  divisionAnswers: 'magang.form.divisionAnswers',
} as const;

const IDB_DB_NAME = 'magang-db';
const IDB_STORE_FILES = 'files';
const ZIP_KEY = 'bundleZip';

export function saveBase(values: BaseFormValues) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(LS_KEYS.base, JSON.stringify(values));
}

export function loadBase(): BaseFormValues | null {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem(LS_KEYS.base);
  if (!raw) return null;
  try {
    const v = JSON.parse(raw);
    return v;
  } catch (err) {
    void err;
    return null;
  }
}

export function saveSelectedDivisions(ids: string[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(LS_KEYS.divisions, JSON.stringify(ids));
}

export function loadSelectedDivisions(): string[] {
  if (typeof window === 'undefined') return [];
  const raw = localStorage.getItem(LS_KEYS.divisions);
  if (!raw) return [];
  try {
    return JSON.parse(raw) || [];
  } catch (err) {
    void err;
    return [];
  }
}

export function saveDivisionAnswers(ans: DivisionAnswers) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(LS_KEYS.divisionAnswers, JSON.stringify(ans));
}

export function loadDivisionAnswers(): DivisionAnswers {
  if (typeof window === 'undefined') return {};
  const raw = localStorage.getItem(LS_KEYS.divisionAnswers);
  if (!raw) return {};
  try {
    return JSON.parse(raw) || {};
  } catch (err) {
    void err;
    return {};
  }
}

export function clearAllLocal() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(LS_KEYS.base);
  localStorage.removeItem(LS_KEYS.divisions);
  localStorage.removeItem(LS_KEYS.divisionAnswers);
}

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !('indexedDB' in window)) {
      reject(new Error('IndexedDB not available'));
      return;
    }
    const req = indexedDB.open(IDB_DB_NAME, 1);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(IDB_STORE_FILES)) {
        db.createObjectStore(IDB_STORE_FILES);
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error || new Error('IDB open error'));
  });
}

export async function saveZipFile(file: File | null): Promise<void> {
  if (!file) return;
  const db = await openDB();
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(IDB_STORE_FILES, 'readwrite');
    const store = tx.objectStore(IDB_STORE_FILES);
    const payload = {
      name: file.name,
      type: file.type || 'application/zip',
      lastModified: file.lastModified || Date.now(),
      blob: file,
    } as const;
    store.put(payload, ZIP_KEY);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error || new Error('IDB write error'));
  });
  db.close();
}

export async function loadZipFile(): Promise<File | null> {
  try {
    const db = await openDB();
    const record = await new Promise<any>((resolve, reject) => {
      const tx = db.transaction(IDB_STORE_FILES, 'readonly');
      const store = tx.objectStore(IDB_STORE_FILES);
      const getReq = store.get(ZIP_KEY);
      getReq.onsuccess = () => resolve(getReq.result);
      getReq.onerror = () =>
        reject(getReq.error || new Error('IDB read error'));
    });
    db.close();
    if (!record?.blob) return null;
    const { blob, name, type, lastModified } = record;
    try {
      return new File([blob], name || 'bundle.zip', {
        type: type || 'application/zip',
        lastModified: lastModified || Date.now(),
      });
    } catch (err) {
      void err;
      // Safari < 14 fallback: Blob without File constructor
      const b: Blob = blob;
      (b as any).name = name || 'bundle.zip';
      return b as unknown as File;
    }
  } catch (err) {
    void err;
    return null;
  }
}

export async function clearZipFile(): Promise<void> {
  try {
    const db = await openDB();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(IDB_STORE_FILES, 'readwrite');
      const store = tx.objectStore(IDB_STORE_FILES);
      store.delete(ZIP_KEY);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error || new Error('IDB delete error'));
    });
    db.close();
  } catch (err) {
    void err;
    // ignore
  }
}

// Persist a small form submission state so the UI can reflect final status
export type PersistFormState = 'success' | 'error' | null;
const LS_FORM_STATE = 'magang.form.state';

export function saveFormState(state: PersistFormState) {
  if (typeof window === 'undefined') return;
  try {
    if (state === null) localStorage.removeItem(LS_FORM_STATE);
    else localStorage.setItem(LS_FORM_STATE, state as string);
  } catch (err) {
    void err;
  }
}

export function loadFormState(): PersistFormState {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(LS_FORM_STATE);
    if (!raw) return null;
    if (raw === 'success' || raw === 'error') return raw as PersistFormState;
    return null;
  } catch (err) {
    void err;
    return null;
  }
}

export function clearFormState() {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(LS_FORM_STATE);
  } catch (err) {
    void err;
  }
}
