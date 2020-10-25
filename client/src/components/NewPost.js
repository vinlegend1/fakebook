import React, { useRef, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PostService from '../services/postService';

const NewPost = (props) => {

    const [post, setPost] = useState({ title: '', body: '' });
    const [didPost, setDidPost] = useState(false);
    const formRef = useRef();
    

    const onChange = e => {
        e.preventDefault();
        // setPost({ ...post, [e.target.name]: e.target.value });
        const aPost = {
            title: e.target.value,
            body: e.target.value
        };
        setPost(aPost);
    }

    const onSubmit = e => {
        e.preventDefault();
        PostService.postNewPost(post).then(data => {
            // do stuff here
            const { msgBody, msgErr } = data;
            if (msgBody && !msgErr) {
                setDidPost(true);
                formRef.current.reset();
            }
        })
    }

    const handleClick = e => {
        e.preventDefault();
        setDidPost(false);
    }

    return (
        <div className={didPost ? "bg bg-success my-3 px-2" : "bg bg-light my-3 px-2"} style={{borderRadius: "5px"}}>
            <form onSubmit={onSubmit} ref={formRef} >
            <div className="row p-2">
                <div className="col-xl-9 col-lg-9 col-md-8 col-sm-6">
                <input type="text" required className="form-control" name="title" onChange={onChange} onClick={handleClick} placeholder="write something... or else" />
                </div>
                <div className="col-xl-2 col-lg-2 col-md-2 col-sm-3">
                    <button type="submit" className="btn form-control btn-outline-primary">submit</button>
                </div>
                <div className="col-xl-1 col-lg-1 col-md-2 col-sm-3">
                    <Link to="/home/post/editor" className="text-muted">Go to editor</Link>
                </div>
            </div>
            </form>
        </div>
    )
}

export default withRouter(NewPost)
