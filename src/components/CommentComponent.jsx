import React, { useState, useEffect } from 'react';
import { Typography, Grid, Card, CardContent } from '@mui/material';

function CommentComponent() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/comments');
        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <Typography variant="h3" component="h1" gutterBottom>
        Comments
      </Typography>
      <Grid container spacing={4}>
        {comments.map((comment, index) => (
          index % 2 === 0 && (
            <Grid key={comment.id} item xs={12} sm={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" component="h3" gutterBottom>
                    {comment.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    {comment.email}
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {comment.body}
                  </Typography>
                </CardContent>
              </Card>
              {comments[index + 1] && (
                <Card style={{ marginTop: '1rem' }}>
                  <CardContent>
                    <Typography variant="h6" component="h3" gutterBottom>
                      {comments[index + 1].name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                      {comments[index + 1].email}
                    </Typography>
                    <Typography variant="body1" paragraph>
                      {comments[index + 1].body}
                    </Typography>
                  </CardContent>
                </Card>
              )}
            </Grid>
          )
        ))}
      </Grid>
    </div>
  );
}

export default CommentComponent;
