import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../Components/MusicCard';
import AlbumCss from '../Css/AlbumCss.css';

export default class Album extends Component {
  constructor() {
    super();

    this.state = {
      musics: [],
    };

    this.musics = this.musics.bind(this);
  }

  componentDidMount() {
    this.musics();
  }

  async musics() {
    const { match: { params: { id } } } = this.props;
    const requestedMusics = await getMusics(id);
    this.setState({
      musics: requestedMusics,
    });
  }

  render() {
    const { musics } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        <div className="page-album-selected">
          {musics.length > 0
            && (
              musics.map((music, index) => (
                index !== 0
                    && (
                      <div key={ index } className="music-selected">
                        <MusicCard
                          trackName={ music.trackName }
                          trackId={ music.trackId }
                          previewUrl={ music.previewUrl }
                          artwork={ music.artworkUrl100 }
                        />
                      </div>)))
            ) }
        </div>
      </div>
    );
  }
}

Album.propTypes = ({ // aprendido em https://pt-br.reactjs.org/docs/typechecking-with-proptypes.html
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}).isRequired;
