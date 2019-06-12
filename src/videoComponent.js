import React from 'react';
import './videoComponent.css'

class VideoComponent extends React.Component {
    
    render(){
        return (
            <div className="Main-Video">
                <PullVideoDetail></PullVideoDetail>
            </div>
        )
    }

}

class PullVideoDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount(){
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');

        fetch('https://my-json-server.typicode.com/apollo-motorhomes/youtube-test/videos/'+id)
        .then(response => response.json())
        .then((json) => {
            // console.log(json)
            this.setState({videoId: json.id})
            this.setState({videoData: json.url})
            this.setState({videoDesc: json.description})
            this.pullExtraDetail()
        })
    }

    pullExtraDetail(){
        fetch('https://my-json-server.typicode.com/apollo-motorhomes/youtube-test/comments/?videoId='+this.state.videoId)
        .then(response => response.json())
        .then((json) => {
            // console.log(json)
            this.setState({videoComments: json})
        })

        fetch('https://my-json-server.typicode.com/apollo-motorhomes/youtube-test/users/'+this.state.videoId)
        .then(response => response.json())
        .then((json) => {
            // console.log(json)
            this.setState({videoUploader: json.name})
        })
    }

    render(){
        return (
            <div className="Main">
                <div className="video">
                    <video 
                        controls name="media" 
                        preload="none"
                        autoPlay
                        src={this.state.videoData}>
                    </video>
                </div>
                <div className="video-details">
                    <div className="video-description">
                        <p>{this.state.videoDesc}</p>
                    </div>
                    <div className="video-uploader">
                        <em><p>{this.state.videoUploader}</p></em>
                    </div>
                </div>
                <div className="video-comments">
                    {this.state.videoComments ? (
                        this.state.videoComments.map(post =>
                        <p>{post.body}</p>
                        )) : <p>Loading</p>
                    }
                </div>
            </div>
        )
    }
}

export default VideoComponent;