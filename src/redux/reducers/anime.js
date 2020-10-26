import { GET_SEARCHED_ANIME_LOAD, GET_SEARCHED_ANIME_SUCCESS, GET_SEARCHED_ANIME_FAIL, RESET_STATE } from '../actions/type';

const intialState = {
    loading: false,
    animes: [],
    error: ''
}
// eslint-disable-next-line 
export default (state = intialState, action) => {
    switch (action.type) {
        case GET_SEARCHED_ANIME_LOAD:
            return { ...state, loading: true };
        case GET_SEARCHED_ANIME_SUCCESS:
            return { ...state, ...{ animes: [].concat([], state.animes, action.payload.results) }, loading: false, error: '' };
        case GET_SEARCHED_ANIME_FAIL:
            return { ...state, ...action, loading: false, animes: [], error: action.payload };
        case RESET_STATE:
            return { ...state, animes: [], loading: true }
        default:
            return state;

    }
};