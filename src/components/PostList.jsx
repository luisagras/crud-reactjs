import React, { useState, useEffect } from 'react';
import { Typography, Grid, Card, CardContent } from '@mui/material';

function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <Grid container spacing={3} justifyContent="center">
      <Grid item xs={12}>
        <Typography variant="h4" align="center" gutterBottom>
          Posts
        </Typography>
      </Grid>
      {posts.map(post => (
        <Grid item key={post.id} xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="h2" gutterBottom>
                {post.title}
              </Typography>
              <Typography variant="body1" component="p">
                {post.body}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default PostList;
