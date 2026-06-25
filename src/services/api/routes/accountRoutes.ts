const BASE = '/accounts';

export const AccountRoutes = {
    CREATE: BASE,
    GET_ALL: BASE,
    GET_ALL_DELETED: `${BASE}/deleted`,
    GET_BY_ID: (id: number) => `${BASE}/${id}`,
    UPDATE: BASE,
    DELETE: (id: number) => `${BASE}/${id}`,
    RESTORE: (id: number) => `${BASE}/${id}/restore`,
    DESTROY: (id: number) => `${BASE}/${id}/destroy`,
    IMPORT: `${BASE}/import`,
    UPDATE_COUNTER: `${BASE}/update-counter`,
};
