export const UPDATE_ASKS = 'UPDATE_ASKS';
export const UPDATE_BIDS = 'UPDATE_BIDS';
export const ON_ERROR = 'ON_ERROR';

export const wsConnect = () => ({ type: 'WS_CONNECT' });
export const wsConnected = () => ({ type: 'WS_CONNECTED' });
export const wsDisconnect = () => ({ type: 'WS_DISCONNECT' });
export const wsDisconnected = () => ({ type: 'WS_DISCONNECTED' });

export const updateAsks = (values : Array<any>) =>({ type: UPDATE_ASKS, payload: values });
export const updateBids = (values : Array<any>) =>({ type: UPDATE_BIDS, payload: values });
export const addError = (error : String) =>({ type: ON_ERROR, payload: error });