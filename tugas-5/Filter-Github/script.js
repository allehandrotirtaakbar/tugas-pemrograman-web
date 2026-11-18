
// ===================================
//  MENGAMBIL ELEMEN DARI HTML
// ===================================

// Form pencarian
const searchForm = document.querySelector("#search-form");
const usernameInput = document.querySelector("#username");

// Bagian profil pengguna
const profileImage = document.querySelector("#profile img");
const profileName = document.querySelector("#profile-info h2");
const profileBio = document.querySelector("#profile-info p");

// Informasi followers, following, dan repository
const followersElement = document.querySelector("#followers");
const followingElement = document.querySelector("#following");
const reposElement = document.querySelector("#repos");

// Bagian hasil repository
const repoGrid = document.querySelector("#repo-grid");
const resultCount = document.querySelector("#result-count");

// Informasi loading dan error
const loadingMessage = document.querySelector("#loading");
const errorMessage = document.querySelector("#error");
const emptyMessage = document.querySelector("#empty");

// Elemen filter
const repoNameInput = document.querySelector("#search-name");
const languageFilter = document.querySelector("#filter-language");
const sortBy = document.querySelector("#sort-by");
const onlyOriginalCheckbox = document.querySelector("#only-original");
const minStarsInput = document.querySelector("#min-stars");
const resetButton = document.querySelector("#reset-btn");

// Tombol theme
const themeToggle = document.querySelector("#theme-toggle");

// ===================================
//  PENAMPUNG DATA
// ===================================

let allRepositories = [];
let hasSearched = false;

// Menghapus repository contoh dari HTML
repoGrid.innerHTML = "";

// ===================================
//  FUNGSI UNTUK MENAMPILKAN ERROR
// ===================================

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.hidden = false;
}

function clearError() {
    errorMessage.hidden = true;
}


// ===================================
//  MENGAMBIL DATA DARI GITHUB API
// ===================================

async function getGithubData(username) {

    // Mengambil data profil pengguna
    const userUrl = `https://api.github.com/users/${encodeURIComponent(username)}`;

    const userResponse = await fetch(userUrl);

    // Memeriksa apakah permintaan profil berhasil
    if (!userResponse.ok) {

        if (userResponse.status === 404) {
            throw new Error("Username GitHub tidak ditemukan.");
        }

        if (userResponse.status === 403) {
            throw new Error("Batas permintaan GitHub API tercapai. Coba lagi nanti.");
        }

        throw new Error("Gagal mengambil data pengguna.");
    }

    const userData = await userResponse.json();


    // Mengambil data repository pengguna
    const reposResponse = await fetch(
        `${userUrl}/repos?per_page=100&sort=updated`
    );

    // Memeriksa apakah permintaan repository berhasil
    if (!reposResponse.ok) {
        throw new Error("Gagal mengambil daftar repository.");
    }

    const reposData = await reposResponse.json();


    // Mengembalikan kedua data
    return {
        userData,
        reposData
    };
}


// ===================================
//  MENAMPILKAN PROFIL PENGGUNA
// ===================================

function displayProfile(user) {

    profileImage.src = user.avatar_url;

    profileImage.alt = `Foto profil ${user.login}`;

    profileName.textContent = user.name || user.login;

    profileBio.textContent = user.bio || "Pengguna ini belum menambahkan bio.";

    followersElement.textContent = `${user.followers} Pengikut`;

    followingElement.textContent = `${user.following} Diikuti`;

    reposElement.textContent = `${user.public_repos} Repo`;
}

// ===================================
//  MENGAMBIL DATA DARI GITHUB API
// ===================================

async function getGithubData(username) {

    // Mengambil data profil pengguna
    const userUrl = `https://api.github.com/users/${encodeURIComponent(username)}`;

    const userResponse = await fetch(userUrl);

    // Memeriksa apakah permintaan profil berhasil
    if (!userResponse.ok) {

        if (userResponse.status === 404) {
            throw new Error("Username GitHub tidak ditemukan.");
        }

        if (userResponse.status === 403) {
            throw new Error("Batas permintaan GitHub API tercapai. Coba lagi nanti.");
        }

        throw new Error("Gagal mengambil data pengguna.");
    }

    const userData = await userResponse.json();


    // Mengambil data repository pengguna
    const reposResponse = await fetch(
        `${userUrl}/repos?per_page=100&sort=updated`
    );

    // Memeriksa apakah permintaan repository berhasil
    if (!reposResponse.ok) {
        throw new Error("Gagal mengambil daftar repository.");
    }

    const reposData = await reposResponse.json();


    // Mengembalikan kedua data
    return {
        userData,
        reposData
    };
}


// ===================================
//  MENAMPILKAN PROFIL PENGGUNA
// ===================================

function displayProfile(user) {

    profileImage.src = user.avatar_url;

    profileImage.alt = `Foto profil ${user.login}`;

    profileName.textContent = user.name || user.login;

    profileBio.textContent = user.bio || "Pengguna ini belum menambahkan bio.";

    followersElement.textContent = `${user.followers} Pengikut`;

    followingElement.textContent = `${user.following} Diikuti`;

    reposElement.textContent = `${user.public_repos} Repo`;
}
