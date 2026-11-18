
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
