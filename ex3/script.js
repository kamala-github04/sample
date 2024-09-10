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

async function viewPosts() {
    const userId = document.getElementById('viewUserId').value;
    const response = await fetch(`/users/${userId}/posts`);
    const posts = await response.json();
    const postsDiv = document.getElementById('posts');
    postsDiv.innerHTML = posts.map(post => `
        <div>
            <p>${post.author.username}: ${post.content}</p>
            <small>${new Date(post.createdAt).toLocaleString()}</small>
        </div>
    `).join('');
}