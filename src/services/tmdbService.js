    var API_ENDPOINT_3 = 'https://api.themoviedb.org/3/';
    const API_KEY = process.env.REACT_APP_API_KEY;

    let today = new Date();
    let startingDateMovie = today.setMonth(today.getMonth() - 2);
    let maxDateMovie = today.setMonth(today.getMonth() + 3);

    let startingDateTv = today.setMonth(today.getMonth() - 6);
    let maxDateTv = today.setMonth(today.getMonth() + 3);


//TODO => variable for country available in settings
//TODO => variable for language

    //* discover tv upcomming (today -x/+x months )
    export const discoverTVLaps = async () => {
        try {
            const response = await fetch(
                `${API_ENDPOINT_3}discover/tv?api_key=${API_KEY}&first_air_date.gte=${startingDateTv}&air_date.lte=${maxDateTv}&region=FR&language=en`
            );
            if (!response.ok) {
                throw Error(response.statusText);
            }
            const json = await response.json();
            return json
        } catch (error) {
            console.log(error);
        }
    }


    //* discover movie upcomming (today -x/+x months )
    export const discoverMoviesLaps = async () => {
        try {
            const response = await fetch(`${API_ENDPOINT_3}discover/movie?api_key=${API_KEY}&primary_release_date.gte=${startingDateMovie}&primary_release_date.lte=${maxDateMovie}&region=FR&language=en
            `);
            if (!response.ok) {
                throw Error(response.statusText);
            }
            const json = await response.json();
            return json
        } catch (error) {
            console.log(error);
        }
    }
   
    //*DISCOVER MOVIE BY YEAR  
    //TODO : this is potentilly the part used for filters
    export const discoverMovieByYear = async (year) => {
        try {
            const response = await fetch(`${API_ENDPOINT_3}discover/movie?api_key=${API_KEY}&primary_release_year=${year}`);
            if (!response.ok) {
                throw Error(response.statusText);
            }
            const json = await response.json();
            return json
        } catch (error) {
            console.log(error);
        }
    }

    //*UPCOMING movie 
    //TODO : distinction between movie in theater and movies on netflix, stamp netflix? 
    export const getUpcomingMovies = async (id, params) => {
        try {
            const response = await fetch(`${API_ENDPOINT_3}discover/upcoming?api_key=${API_KEY}`);
            if (!response.ok) {
                throw Error(response.statusText);
            }
            const json = await response.json();
            return json
        } catch (error) {
            console.log(error);
        }
    }

    //*Details Movie
    export const getDetailsMovie = async (id, params) => {
        try {
            const response = await fetch(
                `${API_ENDPOINT_3}movie/${id}?api_key=${API_KEY}&append_to_response=${params}&region=FR&language=en`
            );
            if (!response.ok) {
                throw Error(response.statusText);
            }
            const json = await response.json();
            return json
        } catch (error) {
            console.log(error);
        }
    }

    //*Details TV
    export const getDetailsTV = async (id, params) => {
        try {
            const response = await fetch(
                `${API_ENDPOINT_3}tv/${id}?api_key=${API_KEY}&append_to_response=${params}&region=FR&language=en`
            );
            if (!response.ok) {
                throw Error(response.statusText);
            }
            const json = await response.json();
            return json
        } catch (error) {
            console.log(error);
        }
    }

    //*Details person
    export const getDetailsPeople = async (id, params) => {
        try {
            const response = await fetch(
                `${API_ENDPOINT_3}person/${id}?api_key=${API_KEY}&append_to_response=${params}&region=FR&language=en`
            );
            if (!response.ok) {
                throw Error(response.statusText);
            }
            const json = await response.json();
            return json
        } catch (error) {
            console.log(error);
        }
    }


    //*SEARCH
    export const getSearchResults = async (query) => {
        if(query.length>0) {
            try {
                const response = await fetch(`${API_ENDPOINT_3}search/multi?api_key=${API_KEY}&query=${query}&region=FR&language=en`);
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                const json = await response.json();
                return json
            } catch (error) {
                console.log(error);
            }
        } else {
            return 
        }
    }