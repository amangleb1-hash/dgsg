let articlesData = [];

fetch('articles.json')
    .then(res => res.json())
    .then(data => {
        articlesData = data;
        renderArticles();
    });

function showTab(id) {
    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

function renderArticles() {
    const container = document.getElementById('articlesContainer');
    container.innerHTML = '';

    articlesData.forEach(article => {
        const div = document.createElement('div');
        div.className = 'article';
        div.innerHTML = `<h3>${article.title}</h3><p>${article.text}</p>`;
        container.appendChild(div);
    });
}

function addReview() {
    const name = document.getElementById('nameInput').value;
    const text = document.getElementById('reviewInput').value;

    if (!name || !text) return;

    const review = { name, text };
    const reviews = JSON.parse(localStorage.getItem('reviews') || '[]');
    reviews.push(review);
    localStorage.setItem('reviews', JSON.stringify(reviews));
    loadReviews();
}

function loadReviews() {
    const reviewsDiv = document.getElementById('reviews');
    reviewsDiv.innerHTML = '';
    const reviews = JSON.parse(localStorage.getItem('reviews') || '[]');

    reviews.forEach(r => {
        const p = document.createElement('p');
        p.innerHTML = `<b>${r.name}</b>: ${r.text}`;
        reviewsDiv.appendChild(p);
    });
}

function creepyCheck() {
    if (window.scrollY > 400) {
        const popup = document.createElement('div');
        popup.className = 'popup';
        popup.innerHTML = "Он снова зашёл в игру.";
        document.body.appendChild(popup);
        setTimeout(() => popup.remove(), 4000);
    }
}

window.addEventListener('scroll', creepyCheck);
window.onload = loadReviews;
