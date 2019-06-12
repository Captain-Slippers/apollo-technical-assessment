import React from 'react';

class ProfileComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
        // this.setState = {}
    }

    componentDidMount(){
        fetch('https://my-json-server.typicode.com/apollo-motorhomes/youtube-test/profile')
        .then(response => response.json())
        .then((json) => {
            // console.log(json)
            this.setState({profileData: json.name})
            this.setState({profileMemberSince: json.memberSince})
            this.setState({profileWatched: json.watched})
            this.pullWatchedVideos()
        })
    }

    pullWatchedVideos(){
        this.state.profileWatched.map(video =>
            fetch('https://my-json-server.typicode.com/apollo-motorhomes/youtube-test/videos/'+video.videoId)
            .then(response => response.json())
            .then((json) => {
                // console.log(json)
                // console.table(json)
                this.setState({[json.id]: json})
                console.log(this.state[video.videoId].title)
                // console.log(this.state[video.videoId].title)
            })
        )
    }

    render(){
        
        return (
            <div className="Main">
                <h1>{this.state.profileData}</h1>
                <h4>Member Since: {this.state.profileMemberSince}</h4>
                <div>
                    <p>Videos Watched</p>
                {this.state.profileWatched ? 
                (this.state.profileWatched.map(video =>
                    <a href={'/video?id='+video.videoId}>
                        <div className="Video">
                            {this.state[video.videoId] ?
                                (
                                <div>
                                    <h1>{this.state[video.videoId].title} </h1>
                                </div>)
                                : <p>Loading</p>
                            }
                            <div className='Video-Description'>
                                <p>Percentage Watched: {video.percentage}</p>
                                
                            </div>
                        </div>
                    </a>
                    )) : <p>Loading</p>  }
                </div>
            </div>
        )
    }
}

export default ProfileComponent;