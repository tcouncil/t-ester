import React, { useState, useEffect } from 'react';

const Discussions = () => {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDiscussions = async () => {
      try {
        // Mock API call (replace with your actual API endpoint)
        const response = await new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              ok: true,
              data: [
                {
                  id: 1,
                  title: 'General Discussion',
                  posts: [
                    { id: 101, author: 'UserA', content: 'First post in general discussion!' },
                    { id: 102, author: 'UserB', content: 'Replying to the first post.' },
                    { id: 103, author: 'UserC', content: 'Another post in general discussion.' },
                  ],
                },
                {
                  id: 2,
                  title: 'Help & Support',
                  posts: [
                    { id: 201, author: 'UserD', content: 'I need help with something.' },
                    { id: 202, author: 'UserE', content: 'I can help you with that.' },
                  ],
                },
                {
                  id: 3,
                  title: 'Off-Topic',
                  posts: [
                    { id: 301, author: 'UserF', content: 'Random off-topic post.' },
                    { id: 302, author: 'UserG', content: 'Another random post.' },
                    { id: 303, author: 'UserH', content: 'Yet another random post.' },
                  ],
                },
              ],
            });
          }, 500); // Simulate API latency
        });

        if (!response.ok) {
          throw new Error('Failed to fetch discussions.');
        }

        setTopics(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDiscussions();
  }, []);

  if (loading) {
    return <div>Loading discussions...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="discussions-container">
      <h4>Discussions</h4>
      {topics.map((topic) => (
        <div key={topic.id} className="topic-container">
          <h5>{topic.title}</h5>
          <div className="posts-container">
            {topic.posts.slice(-2).map((post) => ( // Get the last 2 posts
              <div key={post.id} className="post">
                <p><strong>{post.author}:</strong> {post.content}</p>
              </div>
            ))}
            {topic.posts.length === 0 && <p>No posts yet.</p>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Discussions;