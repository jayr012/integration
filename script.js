const imgElement = document.getElementById('daily-img');
const textOverlay = document.getElementById('text-overlay');
const titleElement = document.getElementById('photo-title');
const descElement = document.getElementById('photo-desc');
const refreshBtn = document.getElementById('refresh-btn');
const dateDisplay = document.getElementById('date-display');

// 1. Setup Date & Daily Seed
const todayDate = new Date();
// This string (e.g., "2026-03-09") locks the 7 images for the whole day
const dateStr = todayDate.toISOString().split('T')[0]; 
dateDisplay.innerText = todayDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

// 2. The Library
const masterContentLibrary = [
    { title: "Quiet Mornings", desc: "A moment of peace before the world wakes up." },
    { title: "Urban Rhythm", desc: "The chaotic beauty of city architecture." },
    { title: "Nature's Canvas", desc: "Exploring the vibrant colors of the wild." },
    { title: "Deep Focus", desc: "Finding clarity in the smallest details." },
    { title: "Golden Hour", desc: "That magical light just before sunset." },
    { title: "Abstract Paths", desc: "Finding patterns where you least expect them." },
    { title: "The Open Road", desc: "Every journey begins with a single step." },
    { title: "Neon Dreams", desc: "The city comes alive after dark." },
    { title: "Mountain Echo", desc: "Solitude found at the highest peaks." },
    { title: "Ocean Breath", desc: "The rhythmic pull of the morning tide." },
    { title: "Forest Whisper", desc: "Hidden paths through the ancient green." },
    { title: "Steel & Glass", desc: "Modern wonders reaching for the sky." }
];

// 3. The Daily Shift Logic
// This math ensures the starting point in the list moves by 1 every day
const dayOfYear = Math.floor((todayDate - new Date(todayDate.getFullYear(), 0, 0)) / 86400000);
const dailyStartIndex = dayOfYear % (masterContentLibrary.length - 6);
const todayPhotoDetails = masterContentLibrary.slice(dailyStartIndex, dailyStartIndex + 7);

// 4. Generate the 7-image pool for today
const dailyPool = [0, 1, 2, 3, 4, 5, 6].map(num => ({
    url: `https://picsum.photos/seed/${dateStr}-${num}/600/800`,
    ...todayPhotoDetails[num]
}));

function updateWidget() {
    refreshBtn.disabled = true;
    refreshBtn.innerText = "Loading...";
    
    imgElement.classList.remove('visible');
    textOverlay.classList.remove('visible');

    setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * dailyPool.length);
        const choice = dailyPool[randomIndex];

        imgElement.src = choice.url;
        titleElement.innerText = choice.title;
        descElement.innerText = choice.desc;

        imgElement.onload = () => {
            imgElement.classList.add('visible');
            textOverlay.classList.add('visible');
            refreshBtn.disabled = false;
            refreshBtn.innerText = "Discover Next Photo";
        };
    }, 600);
}

refreshBtn.addEventListener('click', updateWidget);
window.onload = updateWidget;