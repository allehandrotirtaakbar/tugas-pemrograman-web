
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


// ===================================
//  FUNGSI FILTER REPOSITORY
// ===================================

function getFilteredRepositories() {

    // Mengambil nilai dari input filter
    const keyword = repoNameInput.value.trim().toLowerCase();

    const selectedLanguage = languageFilter.value;

    const onlyOriginal = onlyOriginalCheckbox.checked;

    const minimumStars = Math.max(
        0,
        Number(minStarsInput.value) || 0
    );


    // Menyaring repository berdasarkan kondisi
    const filteredRepositories = allRepositories.filter((repo) => {

        // Filter berdasarkan nama repository
        const matchesName = repo.name
            .toLowerCase()
            .includes(keyword);

        // Filter berdasarkan bahasa pemrograman
        const matchesLanguage =
            selectedLanguage === "" ||
            repo.language === selectedLanguage;

        // Filter repository fork
        const matchesOriginal =
            !onlyOriginal || !repo.fork;

        // Filter berdasarkan jumlah stars
        const matchesStars =
            repo.stargazers_count >= minimumStars;


        // Repository harus memenuhi seluruh kondisi
        return (
            matchesName &&
            matchesLanguage &&
            matchesOriginal &&
            matchesStars
        );

    });


    // ===================================
    //  MENGURUTKAN REPOSITORY
    // ===================================

    if (sortBy.value === "terbaru") {

        filteredRepositories.sort((a, b) => {
            return new Date(b.updated_at) - new Date(a.updated_at);
        });

    } else if (sortBy.value === "bintangTerbanyak") {

        filteredRepositories.sort((a, b) => {
            return b.stargazers_count - a.stargazers_count;
        });

    } else if (sortBy.value === "nameAZ") {

        filteredRepositories.sort((a, b) => {
            return a.name.localeCompare(b.name, "id");
        });

    }


    return filteredRepositories;
}



// ===================================
// 8. MEMBUAT INFORMASI REPOSITORY
// ===================================

function createInfoItem(className, text) {

    const item = document.createElement("li");

    const span = document.createElement("span");

    span.className = className;

    span.textContent = text;

    item.append(span);

    return item;
}


// ===================================
// 9. MEMBUAT KARTU REPOSITORY
// ===================================

function createRepositoryCard(repo) {

    // Membuat elemen article
    const article = document.createElement("article");

    article.className = "repo-card";


    // Membuat judul repository
    const heading = document.createElement("h3");

    const link = document.createElement("a");

    link.href = repo.html_url;

    link.textContent = repo.name;

    link.target = "_blank";

    link.rel = "noopener noreferrer";

    heading.append(link);


    // Membuat deskripsi repository
    const description = document.createElement("p");

    description.textContent =
        repo.description || "Tidak ada deskripsi.";


    // Membuat informasi repository
    const infoList = document.createElement("ul");

    infoList.append(
        createInfoItem(
            "language",
            `Bahasa: ${repo.language || "Tidak diketahui"}`
        ),

        createInfoItem(
            "stars",
            `Bintang: ${repo.stargazers_count}`
        ),

        createInfoItem(
            "forks",
            `Fork: ${repo.forks_count}`
        )
    );


    // Membuat tanggal update
    const updatedParagraph = document.createElement("p");

    const updatedTime = document.createElement("time");

    updatedTime.dateTime = repo.updated_at;

    updatedTime.textContent = new Date(
        repo.updated_at
    ).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });

    updatedParagraph.append(
        "Tanggal Update: ",
        updatedTime
    );


    // Menggabungkan semua elemen
    article.append(
        heading,
        description,
        infoList,
        updatedParagraph
    );


    return article;
}


// ===================================
//  MENAMPILKAN SELURUH REPOSITORY
// ===================================

function renderRepositories() {

    if (!hasSearched) {
        return;
    }

    // Mengambil repository yang sudah difilter
    const filteredRepositories = getFilteredRepositories();

    // Mengosongkan tampilan sebelumnya
    repoGrid.innerHTML = "";

    // Memperbarui jumlah hasil
    resultCount.textContent =
        `Menampilkan ${filteredRepositories.length} dari ${allRepositories.length} hasil`;


    // Jika tidak ada hasil
    if (filteredRepositories.length === 0) {

        emptyMessage.hidden = false;

        return;
    }

    emptyMessage.hidden = true;


    // Menyiapkan tempat sementara untuk kartu
    const fragment = document.createDocumentFragment();

    filteredRepositories.forEach((repo) => {

        const card = createRepositoryCard(repo);

        fragment.append(card);

    });


    // Memasukkan seluruh kartu ke HTML
    repoGrid.append(fragment);
}



// ===================================
//  FUNGSI PENCARIAN USERNAME
// ===================================

async function handleSearch(event) {

    // Mencegah halaman melakukan reload
    event.preventDefault();

    // Mengambil username dari input
    const username = usernameInput.value.trim();


    // Memeriksa apakah username kosong
    if (!username) {

        showError("Masukkan username GitHub terlebih dahulu.");

        return;
    }


    // Menampilkan loading
    loadingMessage.hidden = false;

    clearError();

    emptyMessage.hidden = true;

    hasSearched = false;

    repoGrid.innerHTML = "";

    resultCount.textContent = "Memuat data...";


    try {

        // Mengambil data dari GitHub
        const { userData, reposData } =
            await getGithubData(username);


        // Menampilkan profil pengguna
        displayProfile(userData);


        // Menyimpan seluruh repository
        allRepositories = reposData;

        hasSearched = true;


        // Menampilkan repository
        renderRepositories();


    } catch (error) {

        // Mengosongkan data jika terjadi kesalahan
        allRepositories = [];

        resultCount.textContent = "Menampilkan 0 hasil";

        showError(
            error.message || "Terjadi kesalahan saat memuat data."
        );


    } finally {

        // Menyembunyikan loading
        loadingMessage.hidden = true;

    }
}


// ===================================
//  EVENT LISTENER PENCARIAN
// ===================================

searchForm.addEventListener("submit", handleSearch);


// ===================================
//  EVENT LISTENER FILTER
// ===================================

function updateRepositoryView() {

    if (hasSearched) {
        renderRepositories();
    }

}


// Mencari berdasarkan nama repository
repoNameInput.addEventListener(
    "input",
    updateRepositoryView
);


// Memfilter berdasarkan bahasa
languageFilter.addEventListener(
    "change",
    updateRepositoryView
);


// Mengurutkan repository
sortBy.addEventListener(
    "change",
    updateRepositoryView
);


// Menyembunyikan repository fork
onlyOriginalCheckbox.addEventListener(
    "change",
    updateRepositoryView
);


// Memfilter berdasarkan minimal stars
minStarsInput.addEventListener(
    "input",
    updateRepositoryView
);


// ===================================
//  TOMBOL RESET FILTER
// ===================================

resetButton.addEventListener("click", function() {

    // Mengosongkan pencarian nama
    repoNameInput.value = "";

    // Mengembalikan bahasa ke semua bahasa
    languageFilter.value = "";

    // Mengembalikan urutan ke terbaru
    sortBy.value = "terbaru";

    // Menghilangkan centang checkbox
    onlyOriginalCheckbox.checked = false;

    // Mengembalikan minimal stars ke 0
    minStarsInput.value = 0;

    // Memperbarui tampilan repository
    updateRepositoryView();

});


// ===================================
//  TOGGLE DARK MODE
// ===================================

themeToggle.addEventListener("click", function() {

    const isDark = document.body.classList.toggle("dark-theme");

    if (isDark) {
        themeToggle.textContent = "Light";
    } else {
        themeToggle.textContent = "Dark";
    }

});
