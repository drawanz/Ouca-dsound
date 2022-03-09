import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../Components/MusicCard';

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
    // const removeFirstItemMusics = requestedMusics.shift();
    // console.log(removeFirstItemMusics);
    this.setState({
      musics: requestedMusics,
    });
  }

  render() {
    const { musics } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        {musics.length > 0
          && (
            <div>
              <p data-testid="artist-name">{ musics[0].artistName }</p>
              <p data-testid="album-name">{ musics[0].collectionName }</p>
              {musics.map((music, index) => (
                index !== 0
                  && (
                    <MusicCard
                      key={ index }
                      trackName={ music.trackName }
                      trackId={ music.trackId }
                      previewUrl={ music.previewUrl }
                    />)))}
            </div>
          ) }
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
