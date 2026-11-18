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