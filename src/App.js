import React from 'react';
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { posts: [] };
    }
    
    async componentDidMount() {
        const postData = await fetch('http://localhost:3000/posts')
              .then(response => response.json())
              .then(({ posts }) => posts)
              .catch(error => {
                  console.error(error);
                  return [];
              });

        const posts = postData.map(post => {
            return (
                <div className="post">
                  <p>Post #{post.id}</p>
                  <p>Posted by {post.userId}</p>
                  <p>Title: {post.title}</p>
                  <p>{post.body}</p>
                </div>
            );
        });
        
        this.setState({ posts });
    }

    render() {
        return (
            <div className="app">
              <div className="actions">
                <input className="create" type="text" placeholder="Enter a value or ID" value=""/>
                <input className="update" type="text" placeholder="Enter a new value" value=""/>
                <button>CREATE</button>
                <button>UPDATE</button>
                <button>DELETE</button>
              </div>
              <div className="list">
                {this.state.posts}
              </div>
            </div>
        );
    }
}

export default App;
