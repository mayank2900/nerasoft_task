
let posts = [];

export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json(posts);
  } else if (req.method === 'POST') {
    const { title, description, content, image } = req.body;
    const newPost = { title, description, content, image, createdDate: new Date() };
    posts.push(newPost);
    res.status(201).json(newPost);
  }
}