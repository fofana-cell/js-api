const cardContainer = document.getElementById("cardContainer");
const loadBtn = document.getElementById("loadCards");

// 🔹 Keep track of how many times we've fetched
let page = 1;

// 🔹 Function to create a card element
function createCard({ title, body }) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.innerHTML = `
    <h3>${title}</h3>
    <p>${body}</p>
  `;
  return card;
}

// 🔹 Render multiple cards using higher-order methods
function renderCards(dataArray) {
  // map() → transform objects into <div> cards
  const cards = dataArray.map(item => createCard(item));

  // forEach() → append each card to the container
  cards.forEach(card => cardContainer.appendChild(card));
}

// 🔹 Fetch API to get posts and add them as cards
async function fetchCards() {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=4&_page=${page}`);
    const data = await response.json();

    // filter() → only keep posts with long titles
    const filteredData = data.filter(post => post.title.length > 15);

    // Render filtered cards
    renderCards(filteredData);

    // Move to the next "page" for next click
    page++;
  } catch (error) {
    console.error("Error fetching cards:", error);
  }
}

// 🔹 Add click event to button
loadBtn.addEventListener("click", fetchCards);


