import React from "react";

function Posts() {

    let date = new Date();
    let posts = [{
        text: "i am post",
        profileName: "user name",
        url: "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp",
        hr: date.getHours(),
        min: date.getMinutes(),
        sec: date.getSeconds(),
    }];

    return (
        <>
            <div className="posts py-0 px-3" style={{ backgroundColor: '#000000' }}>
                {posts.length <= 0 ? (
                    <p style={{ color: "gray" }} className="text-center lead fw-normal mb-0">
                        Your Posts Appear Here
                    </p>
                ) : (
                    posts.map((post, index) => (
                        <div key={index} className="card" style={{
                            width: "96%", margin: '15px auto 0',
                            border: '1px solid white'
                            , borderRadius: ".25rem",
                        }}>
                            <span className="d-flex">
                                <img
                                    alt="..."
                                    src={"https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"}
                                    style={{
                                        width: "50px",
                                        height: "50px",
                                        borderRadius: "50%",
                                        border: "1px solid",
                                        margin: "10px 15px 0 10px"
                                    }}
                                />
                                <div className="d-flex flex-column" style={{ marginTop: '10px' }}>
                                    <h4>{post.profileName}</h4>
                                    <pre>
                                        {`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}  ${post.hr <= 9 ? "0" + post.hr : post.hr}:${post.min <= 9 ? "0" + post.min : post.min}:${post.sec <= 9 ? "0" + post.sec : post.sec}`}
                                    </pre>
                                </div>
                            </span>
                            <div className="card-body">
                                <p className="card-text">{post.text}</p>
                            </div>
                            {post.url && <img src={post.url} className="card-img-top" alt={`Post ${index}`} />}
                        </div>
                    ))
                )}
            </div>
        </>
    )
}

export default Posts;