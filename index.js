const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;

  if (type === "PostCreated") {
    const { id, title } = data;

    posts[id] = { id, title, comments: [] };
    console.log(posts);
  }

  if (type === "CommentCreated") {
    const { id, content, postId, status } = data;
    const post = posts[postId];

    post.comments.push({ id, content, status });
  }

  if (type === "CommentUpdated") {
    const { id, content, postId, status } = data;

    console.log("Query", id, status);
    const commentsByPostId = posts[postId];
    const comment = commentsByPostId.comments.find(
      (comment) => comment.id === id
    );

    console.log(comment);

    comment.content = content;
    comment.status = status;
  }

  res.send({});
});

app.listen(4002, () => {
  console.log("Listening on 4002");
});
