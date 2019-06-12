import React from 'react';
import './listVideoComponent.css'

class ListVideosComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount(){
        fetch('https://my-json-server.typicode.com/apollo-motorhomes/youtube-test/videos')
        .then(response => response.json())
        .then((json) => {
            this.setState({videoList: json})
            this.pullUploaderDetails()
        })
    }

    pullUploaderDetails(){
        this.state.videoList.map(video =>
            fetch('https://my-json-server.typicode.com/apollo-motorhomes/youtube-test/users/' + video.id)
                .then(response => response.json())
                .then((json) => {
                    this.setState({[json.id] : json.name})
                })
            )
    }
    
    render(){
        return (
            <div>
                <div className="ListVideosComponent">
                {this.state.videoList ? (
                    this.state.videoList.map(video =>
                    <a href={'/video?id='+video.id}>
                        <div className="Video">
                            <h1>{video.title}</h1>
                            <div className='Video-Description'>
                                <p>{video.description}</p>
                                <em><p>{this.state[video.userId]}</p></em>
                            </div>
                        </div>
                    </a>
                    )) : <p>Loading</p>       
                }
            </div>
                <a href="/profile"><div className="Profile Video">
                    <h3>Profile</h3>
                </div></a>
            </div>
        )
    }
}

export default ListVideosComponent;