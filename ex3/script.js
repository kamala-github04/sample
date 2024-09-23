javascript
   // public/script.js
   async function createUser() {
       const username = document.getElementById('username').value;
       const response = await fetch('/users', {
           method: 'POST',
           headers: {
               'Content-Type': 'application/json',
           },
           body: JSON.stringify({ username }),
       });
       const user = await response.json();
       alert(`User created: ${user.username} (ID: ${user._id})`);
   }

   async function createPost() {
       const userId = document.getElementById('userId').value;
       const content = document.getElementById('content').value;
       const response = await fetch('/posts', {
           method: 'POST',
           headers: {
               'Content-Type': 'application/json',
           },
           body: JSON.stringify({ author: userId, content }),
        });
        const post = await response.json();
        alert(`Post created: ${post.content}`);
    }
 
// public/script.js
async function viewPosts() {
    const userId = document.getElementById('viewUserId').value;
    try {
        const response = await fetch(`/users/${userId}/posts`);
        if (!response.ok) {
            throw new Error(`Error fetching posts: ${response.statusText}`);
        }
        const posts = await response.json();
        
        const postsDiv = document.getElementById('posts');
        if (posts.length === 0) {
            postsDiv.innerHTML = 'No posts found.';
        } else {
            postsDiv.innerHTML = posts.map(post => `
                <div>
                    <p>${post.author.username}: ${post.content}</p>
                    <small>${new Date(post.createdAt).toLocaleString()}</small>
                    <p>Likes: <span id="likes-${post._id}">${post.likes}</span></p>
                    <button onclick="likePost('${post._id}')">Like</button>
                </div>
            `).join('');
        }
    } catch (error) {
        console.error(error);
        document.getElementById('posts').innerHTML = 'Error fetching posts.';
    }
}

    
    async function likePost(postId) {
        const response = await fetch(`/posts/${postId}/like`, {
            method: 'POST',
        });
        const post = await response.json();
        document.getElementById(`likes-${postId}`).innerText = post.likes;
    }

