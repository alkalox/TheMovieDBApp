
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FETCH_ERROR = 'FETCH_ERROR';
export const INCREASE_PAGE = 'INCREASE_PAGE'


function fetchSuccess(data) {
    return {
        type: FETCH_SUCCESS,
        data: data,
    }
}

function fetchError(error) {
    return {
        type: FETCH_ERROR,
        error: error,
    }
}


 const fetchMovies = (page) => {
    return dispatch => {
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=d206375fb3fbc8daae375b4957abe0ea&language=en-US&page=${page}`)
        .then(res => res.json())
        .then(res => {
            if(res.error) {
                throw(res.error);
            }
            dispatch(fetchSuccess(res.results))
            return res.results;
        })
        .catch(error => {
            dispatch(fetchError(error));
        })
    }
}

export default fetchMovies