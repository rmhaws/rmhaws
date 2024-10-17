const gallery = document.getElementById('gallery');
const searchBtn = document.getElementById('search-btn');
const usernameInput = document.getElementById('username');
const defaultUsername = 'rmhaws';

async function fetchRepos(username) {
    const response = await fetch(`https://api.github.com/users/${username}/repos`);
    if (!response.ok) {
        throw new Error('Failed to fetch repositories');
    }
    return response.json();
}

async function fetchCommits(repoOwner, repoName) {
    const response = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/commits`);
    if (!response.ok) {
        throw new Error('Failed to fetch commits');
    }
    return response.json();
}

async function fetchLanguages(repoOwner, repoName) {
    const response = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/languages`);
    if (!response.ok) {
        throw new Error('Failed to fetch languages');
    }
    return response.json();
}

function createRepoCard(repo, commitsCount, languages) {
    const card = document.createElement('div');
    card.className = 'repo-card';

    const languagesList = Object.keys(languages).join(', ');

    card.innerHTML = `
        <h3><a href="${repo.html_url}" target="_blank"><i class="fab fa-github"></i> ${repo.name}</a></h3>
        <p>${repo.description || 'No description available.'}</p>
        <p><strong>Created:</strong> ${new Date(repo.created_at).toLocaleDateString()}</p>
        <p><strong>Updated:</strong> ${new Date(repo.updated_at).toLocaleDateString()}</p>
        <p><strong>Commits:</strong> ${commitsCount}</p>
        <p><strong>Watchers:</strong> ${repo.watchers_count}</p>
        <p><strong>Languages:</strong> ${languagesList || 'Not specified'}</p>
    `;

    return card;
}

async function displayRepos(username) {
    try {
        const repos = await fetchRepos(username);
        gallery.innerHTML = '';

        for (const repo of repos) {
            const commits = await fetchCommits(username, repo.name);
            const commitsCount = commits.length;
            const languages = await fetchLanguages(username, repo.name);
            const repoCard = createRepoCard(repo, commitsCount, languages);
            gallery.appendChild(repoCard);
        }
    } catch (error) {
        gallery.innerHTML = '<p>Error fetching repositories. Please try again later.</p>';
        console.error(error);
    }
}

displayRepos(defaultUsername);

searchBtn.addEventListener('click', () => {
    const username = usernameInput.value.trim();
    if (username) {
        displayRepos(username);
    }
});
