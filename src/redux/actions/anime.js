import { GET_SEARCHED_ANIME_LOAD, GET_SEARCHED_ANIME_SUCCESS, GET_SEARCHED_ANIME_FAIL, RESET_STATE } from './type';
import axios from 'axios';

const baseURL = 'https://api.jikan.moe/v3/search/anime';

function fetchSearchedAnimeLoad() {
    return {
        type: GET_SEARCHED_ANIME_LOAD
    };
}

function fetchSearchedAnimeSuccess(data) {
    return {
        type: GET_SEARCHED_ANIME_SUCCESS,
        payload: data
    };
}

function fetchSearchedAnimeFail(error) {
    return {
        type: GET_SEARCHED_ANIME_FAIL,
        payload: error
    };
}

function resetReducerState() {
    return {
        type: RESET_STATE
    };
}

export function getSearchedAnime(searchQuery, pageNumber) {
    return (dispatch) => {
        dispatch(fetchSearchedAnimeLoad());
        axios.get(`${baseURL}?q=${searchQuery}&page=${pageNumber}`)
            .then(function (response) {
                dispatch(fetchSearchedAnimeSuccess(response.data));
            })
            .catch(function (error) {
                dispatch(fetchSearchedAnimeFail(error));
            });
    };
}

export function resetState() {
    return (dispatch) => {
        dispatch(resetReducerState());
    }
}
