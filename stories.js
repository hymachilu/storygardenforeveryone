const stories = [
    {
        id: 1,
        title: "The Lion and the Mouse",
        category: "Moral",
        description: "A story about kindness and friendship."
    },
    {
        id: 2,
        title: "Cinderella",
        category: "Fairy Tales",
        description: "A magical story about a kind girl."
    },
    {
        id: 3,
        title: "The Magic Forest",
        category: "Fantasy",
        description: "An adventure inside an enchanted forest."
    },
    {
        id: 4,
        title: "The Brave Little Prince",
        category: "Adventure",
        description: "A young prince discovers his courage."
    }
];

const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const storyResults = document.getElementById("storyResults");

function searchStories() {

    const searchText = searchInput.value
        .trim()
        .toLowerCase();

    const filteredStories = stories.filter(story =>
        story.title.toLowerCase().includes(searchText) ||
        story.category.toLowerCase().includes(searchText)
    );

    storyResults.innerHTML = "";

    if (filteredStories.length === 0) {
        storyResults.textContent = "No stories found!";
        return;
    }

    filteredStories.forEach(story => {

        const card = document.createElement("div");

        card.className = "story-card";

        const title = document.createElement("h3");
        title.textContent = story.title;

        const category = document.createElement("p");
        category.textContent = "Category: " + story.category;

        const description = document.createElement("p");
        description.textContent = story.description;

        card.append(title, category, description);
        storyResults.appendChild(card);

    });
}

searchButton.addEventListener("click", searchStories);

searchInput.addEventListener("input", searchStories);