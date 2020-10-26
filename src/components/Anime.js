import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Form, Field } from 'react-final-form'
import { getSearchedAnime, resetState } from '../redux/actions/anime';
import AnimeList from './AnimeList';
import './Anime.scss';

function Anime(props) {
    const { getAnime, animes, resetState, loading, error } = props;
    const [animeName, setAnimeName] = useState('');

    useEffect(() => {
        if(animes.length > 50) window.scrollTo({ top: window.pageYOffset - 3485, behavior: 'smooth' })
    }, [animes])

    const submit = (data) => {
        setAnimeName(data.search);
        resetState(); 
        getAnime(data.search, 1);
    }

    return (
        <div className="anime-list-container">
            <div className="feed-header">
                <div className="header-title">
                   See-Your-Anime
                </div>
                <div className="search-bar">
                    <Form
                        onSubmit={submit}
                        render={({ handleSubmit }) => (
                            <form onSubmit={handleSubmit} className="search-form">
                                <Field name="search">
                                    {({ input, meta }) => (
                                        <div>
                                            <input type="text" {...input} placeholder="Search your fav anime" />
                                            {meta.touched && meta.error && <span>{meta.error}</span>}
                                        </div>
                                    )}
                                </Field>
                                <button type="submit" className="search-btn">Submit</button>
                            </form>
                        )}
                    />
                </div>
            </div>
            <div className="anime-feed pos-rel">
                {animes.length > 0 && <AnimeList animes={animes} getAnime={getAnime} animeName={animeName} />}
            </div>
            {loading && <div className="img-loader"><img src="https://smallenvelop.com/wp-content/uploads/2014/08/Preloader_11.gif" alt="loader" width="100%" /></div>}
            {!animes.length  && !loading && <div className="backgroung-text">Nothing's here, Please search for your favourite anime.</div>}
            {error && alert('request failed')}
        </div>
    );
}

const mapStateToProps = state => ({
    animes: state.anime.animes,
    loading: state.anime.loading,
    error: state.anime.error
});

function mapDispatchToProps(dispatch) {
    return {
        getAnime: (searchQuery, pageNumber) => dispatch(getSearchedAnime(searchQuery, pageNumber)),
        resetState: () => dispatch(resetState())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Anime);