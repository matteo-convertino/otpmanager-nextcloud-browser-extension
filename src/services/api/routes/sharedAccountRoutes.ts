const BASE = '/share';

export const SharedAccountRoutes = {
    CREATE: BASE,
    GET_ALL_BY_ACCOUNT_ID: (accountId: number) => `${BASE}/${accountId}`,
    GET_BY_ID: (id: number) => `${BASE}/${id}`,
    UPDATE: BASE,
    DELETE: (accountId: number, receiverId: string | null) => `${BASE}/${accountId}?receiverId=${receiverId === null ? '' : receiverId}`,
    UNLOCK: `${BASE}/unlock`,
    UPDATE_COUNTER: `${BASE}/update-counter`,
    GET_USERS_BY_ACCOUNT_ID: (accountId: number) => `/get-users/${accountId}`,
};
