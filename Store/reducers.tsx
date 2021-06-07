import * as actions from './actions';

const initialState = {
    bids: [],
    asks: [],
    loading: false,
    error: ''
};

function dataReducer(state = initialState, action: { type: any; payload: any; }) {
    switch (action.type) {
        case actions.UPDATE_ASKS:
            {
                let input = action.payload;
                let _index = 0;
                const asks = [...state.asks]

                if(asks.length === 0)
                    return {...state, asks: input}

                for (let i = 0; i < input.length; i++) {
                    if (input[i][1] > 0) {
                        for (let j = _index; j < asks.length; j++) {
                            if (input[i][0] === asks[j][0]) {
                                asks[j] = input[i];
                                _index = j;
                                break;
                            }
                            else if (input[i][0] < asks[j][0]) {
                                asks.splice(j, 0, input[i]);
                                _index = j;
                                break;
                            }
                            else if (j === asks.length - 1 && input[i][0] > asks[j][0]) {
                                asks.push(input[i]);
                                _index = j;
                                break;
                            }
                        }
                    }
                    else {
                        let index = asks.findIndex(element => element[0] === input[i][0]);
                        if (index > -1) {
                            asks.splice(index, 1)
                        }
                    }
                }

               
                return {...state, error: '', asks: asks}
            }
        case actions.UPDATE_BIDS:
            {
               // console.log('action.payload bids: ', action.payload)
               let input = action.payload;
               let _index = 0;
               const bids = [...state.bids]

               if(bids.length === 0)
                   return {...state, bids: input}

               for (let i = 0; i < input.length; i++) {
                if (input[i][1] > 0) {
                    for (let j = 0; j < bids.length; j++) {
                        if (input[i][0] === bids[j][0]) {
                            bids[j] = input[i];
                            _index = j;
                            break;
                        }
                        else if (input[i][0] > bids[j][0]) {
                            bids.splice(j, 0, input[i]);
                            break;
                        }
                        else if (j === bids.length - 1 && input[i][0] < bids[j][0]) {
                            bids.push(input[i]);
                            _index = j;
                            break;
                        }
                    }
                }
                else {
                    let index = bids.findIndex(element => element[0] === input[i][0]);
                    if (index > -1) {
                        bids.splice(index, 1)
                    }
                }
            }

                return { ...state, error: '', bids: bids }
            }
        case actions.ON_ERROR:
            return {...state, error: action.payload }
        // case `${GET_DATA}_PENDING`:
        //     return { ...state, loading: true };
        // case `${GET_DATA}_FULFILLED`:
        //     return { ...state, loading: false, bids: action.payload.bids, asks: action.payload.asks };
        // case `${GET_DATA}_REJECTED`:
        //     return { ...state, loading: false, error: action.payload.error };
        default:
            return state;
    }
}
export default dataReducer;