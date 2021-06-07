import * as actions from './actions';

const socketMiddleware = () => {
  let socket: WebSocket | null = null;

  const onOpen = (store: { dispatch: (arg0: { type: string; }) => void; }) => (event: any) => {
    socket.send(JSON.stringify({ "event": "subscribe", "feed": "book_ui_1", "product_ids": ["PI_XBTUSD"] }))
    store.dispatch(actions.wsConnected());
  };

  const onClose = (store: { dispatch: (arg0: { type: string; }) => void; }) => () => {
    store.dispatch(actions.wsDisconnected());

    setTimeout(function () {
      store.dispatch(actions.wsConnect());
    }, 1000);
  };

  const onMessage = (store: { dispatch: (arg0: { type: string; payload: any; }) => void; }) => (event: { data: string; }) => {

    try {
      const payload = JSON.parse(event.data);

      const { bids, asks } = payload;

      if (bids && bids.length > 0)
        store.dispatch(actions.updateBids(bids));

      if (asks && asks.length > 0)
        store.dispatch(actions.updateAsks(asks))
    }
    catch (error) {
      store.dispatch(actions.addError(error.toString()))
    }
  };

  const onError = (store: any) => (event: any) => {

    const { message } = event;

    if (message)
      store.dispatch(actions.addError(message))
    else
      store.dispatch(actions.addError('Error on reading socket'))
  };


  // the middleware part of this function
  return (store: any) => (next: (arg0: any) => any) => (action: { type: any; }) => {
    switch (action.type) {
      case 'WS_CONNECT':
        if (socket !== null) {
          socket.close();
        }

        // connect to the remote host
        socket = new WebSocket('https://www.cryptofacilities.com/ws/v1');

        // websocket handlers
        socket.onmessage = onMessage(store);
        socket.onclose = onClose(store);
        socket.onopen = onOpen(store);
        socket.onerror = onError(store);

        break;
      case 'WS_DISCONNECT':
        if (socket !== null) {
          socket.close();
        }
        socket = null;
        break;
      default:
        return next(action);
    }
  };
};

export default socketMiddleware();