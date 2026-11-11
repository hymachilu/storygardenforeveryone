
// STORY GARDEN - PHASE 3

// 1. STORY DATABASE (Sample stories)

const stories = [
    {
        id: 1,
        title: "The Lion and the Mouse",
        category: "Moral",
        description: "A beautiful story about kindness and friendship.",
        content: `One day, a lion was sleeping in the forest.
A little mouse ran over his body and woke him up.

The lion caught the mouse. The mouse begged for forgiveness.

The lion let the mouse go.

A few days later, the lion was trapped in a hunter's net.
The little mouse heard his roar and came to help.

The mouse chewed the net and freed the lion.

Moral: Kindness is never wasted.`
    },
    {
        id: 2,
        title: "Cinderella",
        category: "Fairy Tales",
        description: "A magical story about kindness and hope.",
        content: `Once upon a time, there lived a kind girl named Cinderella.

She lived with her stepmother and two stepsisters.
They treated her badly.

One day, a royal invitation arrived.
A fairy godmother appeared and helped Cinderella attend the ball.

At midnight, she had to leave, but she lost one glass slipper.

The prince searched for the owner of the slipper.
Eventually, he found Cinderella.

Her kindness and courage changed her life.`
    },
    {
        id: 3,
        title: "The Magic Forest",
        category: "Fantasy",
        description: "An adventure in an enchanted forest.",
        content: `Deep inside a mysterious forest, a young girl discovered a magical tree.

The tree could speak and grant wishes to those with kind hearts.

The girl asked the tree to restore the forest's beauty.

With courage and the help of forest animals, she planted new trees.

Soon, the forest became beautiful again.`
    },
    {
        id: 4,
        title: "The Brave Little Prince",
        category: "Adventure",
        description: "A prince discovers the meaning of courage.",
        content: `A young prince lived in a peaceful kingdom.

One day, a terrible storm threatened his village.

The prince travelled across the mountains to find help.

Although he was afraid, he continued his journey.

He returned with the help needed to save his people.

He learned that courage means doing what is right even when afraid.`
    },
    {
        id: 5,
        title: "The Secret Garden",
        category: "Mystery",
        description: "A mysterious garden holds a beautiful secret.",
        content: `A young girl discovered an old key in her grandmother's house.

She searched everywhere until she found a hidden garden gate.

Behind it was a forgotten garden filled with beautiful flowers.

She decided to care for the garden and bring it back to life.

Every day brought a new discovery.`
    }
];

// 2. GET HTML ELEMENTS

const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const categoryFilter = document.getElementById("categoryFilter");
const storyResults = document.getElementById("storyResults");
const resultsInfo = document.getElementById("resultsInfo");

const readerSection = document.getElementById("readerSection");
const storyReader = document.getElementById("storyReader");
const backButton = document.getElementById("backButton");

const menuToggle = document.getElementById("menuToggle");
const navbar = document.getElementById("navbar");

// 3. LOAD FAVOURITES FROM LOCAL STORAGE

function getSavedFavourites() {
    try {
        const saved = JSON.parse(
            localStorage.getItem("storyGardenFavourites") || "[]"
        );

        return Array.isArray(saved)
            ? saved.filter(id =>
                Number.isInteger(id) &&
                stories.some(story => story.id === id)
            )
            : [];
    } catch (error) {
        return [];
    }
}

let favourites = getSavedFavourites();

function saveFavourites() {
    try {
        localStorage.setItem(
            "storyGardenFavourites",
            JSON.stringify(favourites)
        );
    } catch (error) {
        alert("Unable to save favourites in this browser.");
    }
}

// 4. DISPLAY STORIES

function displayStories(storyList) {

    storyResults.replaceChildren();

    resultsInfo.textContent =
        `${storyList.length} ${storyList.length === 1 ? "story" : "stories"} found`;

    if (storyList.length === 0) {
        resultsInfo.textContent = "No stories found. Try another search!";
        return;
    }

    storyList.forEach(story => {

        const card = document.createElement("article");
        card.className = "story-card";

        const category = document.createElement("span");
        category.className = "category-label";
        category.textContent = story.category;

        const title = document.createElement("h3");
        title.textContent = story.title;

        const description = document.createElement("p");
        description.textContent = story.description;

        const actions = document.createElement("div");
        actions.className = "card-actions";

        const readButton = document.createElement("button");
        readButton.className = "read-btn";
        readButton.textContent = "Read Story";
        readButton.addEventListener("click", () => openStory(story.id));

        const favoriteButton = document.createElement("button");
        favoriteButton.className = "favorite-btn";
        favoriteButton.textContent =
            favourites.includes(story.id) ? "♥ Saved" : "♡ Favourite";

        favoriteButton.setAttribute(
            "aria-pressed",
            String(favourites.includes(story.id))
        );

        favoriteButton.addEventListener("click", () => {
            toggleFavourite(story.id);
        });

        actions.append(readButton, favoriteButton);

        card.append(category, title, description, actions);

        storyResults.appendChild(card);
    });
}

// 5. SEARCH AND FILTER STORIES

function filterStories() {

    const searchText = searchInput.value.trim().toLowerCase();
    const selectedCategory = categoryFilter.value;

    const filteredStories = stories.filter(story => {

        const matchesSearch =
            story.title.toLowerCase().includes(searchText) ||
            story.category.toLowerCase().includes(searchText) ||
            story.description.toLowerCase().includes(searchText);

        const matchesCategory =
            selectedCategory === "all" ||
            story.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    displayStories(filteredStories);
}

searchButton.addEventListener("click", filterStories);

searchInput.addEventListener("input", filterStories);

categoryFilter.addEventListener("change", filterStories);

// 6. OPEN FULL STORY

function openStory(storyId) {

    const story = stories.find(item => item.id === storyId);

    if (!story) return;

    storyReader.replaceChildren();

    const title = document.createElement("h2");
    title.textContent = story.title;

    const category = document.createElement("p");
    category.textContent = "Category: " + story.category;

    const content = document.createElement("p");
    content.textContent = story.content;

    storyReader.append(title, category, content);

    storyResults.parentElement.hidden = true;
    document.getElementById("categories").hidden = true;
    document.querySelector(".about-section").hidden = true;
    readerSection.hidden = false;

    readerSection.scrollIntoView({ behavior: "smooth" });
}

// 7. BACK TO STORIES

backButton.addEventListener("click", () => {

    readerSection.hidden = true;

    storyResults.parentElement.hidden = false;
    document.getElementById("categories").hidden = false;
    document.querySelector(".about-section").hidden = false;

    filterStories();

    document.getElementById("discover").scrollIntoView({
        behavior: "smooth"
    });
});

// 8. FAVOURITES

function toggleFavourite(storyId) {

    if (favourites.includes(storyId)) {
        favourites = favourites.filter(id => id !== storyId);
    } else {
        favourites.push(storyId);
    }

    saveFavourites();
    filterStories();
}

// 9. CATEGORY BUTTONS

document.querySelectorAll(".category-card").forEach(button => {

    button.addEventListener("click", () => {

        categoryFilter.value = button.dataset.category;

        filterStories();

        document.getElementById("discover").scrollIntoView({
            behavior: "smooth"
        });
    });
});

// 10. MOBILE NAVIGATION

menuToggle.addEventListener("click", () => {

    const isOpen = navbar.classList.toggle("active");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navbar.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", () => {
        navbar.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
    });
});

// 11. CURRENT YEAR

document.getElementById("year").textContent =
    new Date().getFullYear();

// 12. INITIAL DISPLAY

displayStories(stories);
