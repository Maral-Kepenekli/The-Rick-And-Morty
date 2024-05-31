"use strict";

let currentPage = 1;
const cardsPerPage = 5;
let characters = [];

async function fetchCharacters(page = 1) {
    try {
        const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching characters:', error);
    }
}

function createCharacterCard(character) {
    const card = document.createElement('a');
    card.href = "#";
    card.className = "flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 m-4";

    card.innerHTML = `
        <img class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src="${character.image}" alt="${character.name}">
        <div class="flex flex-col justify-between p-4 leading-normal">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${character.name}</h5>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Status: ${character.status}</p>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Species: ${character.species}</p>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Gender: ${character.gender}</p>
        </div>
    `;

    return card;
}

function displayCharacters() {
    const characterContainer = document.getElementById('character-container');
    characterContainer.innerHTML = ''; // Clear previous characters

    const start = (currentPage - 1) * cardsPerPage;
    const end = start + cardsPerPage;
    const charactersToShow = characters.slice(start, end);

    charactersToShow.forEach(character => {
        const characterCard = createCharacterCard(character);
        characterContainer.appendChild(characterCard);
    });
}

async function loadCharacters(page = 1) {
    const data = await fetchCharacters(page);
    characters = data.results;
    displayCharacters();
}

document.getElementById('prev-button').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        loadCharacters(currentPage);
    }
});

document.getElementById('next-button').addEventListener('click', () => {
    currentPage++;
    loadCharacters(currentPage);
});

// Initial load
loadCharacters();
