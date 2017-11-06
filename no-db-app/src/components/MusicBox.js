import React, { Component } from 'react'
import route1 from './../mp3/route1.mp3'
import ceruleanCity from './../mp3/cerulean-city.mp3'
import cycling from './../mp3/cycling.mp3'
import opening from './../mp3/opening.mp3'
import pcenter from './../mp3/pcenter.mp3'
import route3 from './../mp3/route3.mp3'
import vermillionCity from './../mp3/vermillion-city.mp3'
import Sound from 'react-sound'
import pokeball from './../img/pokeball.png'

export default class MusicBox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tracks: [route1, cycling, ceruleanCity, opening, pcenter, route3, vermillionCity],
            playing: Sound.status.PAUSED,
            rando: Math.floor(Math.random() * 7),
            track: opening,
            currentTrack: 0,
            numTracks: 7
        }
        this.handleSongFinishedPlaying = this.handleSongFinishedPlaying.bind(this)
        this.togglePlaying = this.togglePlaying.bind(this)
        this.nextTrack = this.nextTrack.bind(this)
    }
    handleSongFinishedPlaying() {
        this.setState({
            playing: Sound.status.PLAYING,
        })
    }
    nextTrack() {
        this.state.currentTrack < this.state.numTracks-1 ? this.setState({ currentTrack: this.state.currentTrack + 1 }) : this.setState({ currentTrack: 0 })
    }
    togglePlaying() {
        this.state.playing === Sound.status.PLAYING ? this.setState({ playing: Sound.status.PAUSED }) : this.setState({ playing: Sound.status.PLAYING })
    }
    render() {
        return (
            <div className="music-box">
                <button className="confirm-button" onClick={this.togglePlaying}>{this.state.playing === Sound.status.PLAYING ? 'pause' : 'play'}</button>
                <button className="confirm-button" onClick={this.nextTrack}>next track</button>
                <p>track: {this.state.currentTrack+1}/{this.state.numTracks}</p>
                <Sound url={this.state.tracks[this.state.currentTrack]}
                    playStatus={this.state.playing}
                    playFromPosition={0}
                    onLoading={this.handleSongLoading}
                    onPlaying={this.handleSongPlaying}
                    onFinishedPlaying={this.handleSongFinishedPlaying} />
            </div>
        )
    }
}