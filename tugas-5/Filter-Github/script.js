console.log("Script Jalan");

// ===== Elemen =====
const searchForm = document.querySelector("#search-form");
const usernameInput = document.querySelector("#username");

const profileImg = document.querySelector("#profile img");
const profileName = document.querySelector("#profile-info h2");
const profileBio = document.querySelector("#profile-info p");
const followersEl = document.querySelector("#followers");
const followingEl = document.querySelector("#following");
const reposEl = document.querySelector("#repos");

const searchName = document.querySelector("#search-name");
const filterLanguage = document.querySelector("#filter-language");
const sortBy = document.querySelector("#sort-by");
const onlyOriginal = document.querySelector("#only-original");
const minStars = document.querySelector("#min-stars");
const resetBtn = document.querySelector("#reset-btn");

const resultCount = document.querySelector("#result-count");
const loadingEl = document.querySelector("#loading");
const errorEl = document.querySelector("#error");
const emptyEl = document.querySelector("#empty");
const repoGrid = document.querySelector("#repo-grid");

const themeToggle = document.querySelector("#theme-toggle");

// ===== Data =====
let allRepos = [];

async function fetchJSON(url) {
    const response = await fetch(url);

    if (response.status === 404) throw new Error("NOT_FOUND");
    if (response.status === 403 || response.status === 429) throw new Error("RATE_LIMIT");
    if (!response.ok) throw new Error("HTTP_" + response.status);

    return response.json();
}

async function loadUser(username) {
    const name = encodeURIComponent(username);

    const [user, repos] = await Promise.all([
        fetchJSON(`https://api.github.com/users/${name}`),
        fetchJSON(`https://api.github.com/users/${name}/repos?per_page=100&sort=updated`),
    ]);

    allRepos = repos;
    console.log(user, repos);
}

searchForm.addEventListener("submit", (event) => {
    event.preventDefault(); // cegah halaman reload
    const username = usernameInput.value.trim();
    if (!username) return;
    loadUser(username);
});