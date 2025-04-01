
async function fetchGitHubUser(username) {
    try {
        const response = await fetch(`https://api.github.com/users/${username}`);

        if (!response.ok) {
            throw new Error(`User not found ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        return { error: error.message } // Return an error
    }
}

async function renderUser(username) {
    const user = await fetchGitHubUser(username); // might return an error object or data object
    let userHTML = '';

    if (user.error) {
        userHTML += `<p>${user.error}</p>`
    } else {
        userHTML += `
            <h3>${user.name}</h3>
            <p><span>Public Repos:</span> ${user.public_repos}</p>
            <p><span>Bio:</span> ${user.bio}</p>
            <p><span>Followers:</span> ${user.followers}</p>
            <p><span>Following:</span> ${user.following}</p>
            <p><span>Location:</span> ${user.location}</p>
            <p><span>Company:</span> ${user.company || ''}</p>
            <p><span>Hireable:</span> ${user.hireable? 'Available for Hire' : 'Not Available'}</p>
            <p><span>Twitter:</span> ${user.twitter_username}</p>
            <p><span>On GitHub since:</span> ${new Date(user.created_at).toDateString()}</p>
        `;
    }

    document.querySelector('div').innerHTML = userHTML;
}


document.querySelector('button').addEventListener('click', (event) => {
    event.preventDefault(); // cause im using a form

    const username = document.querySelector('input').value;

    renderUser(username);
});