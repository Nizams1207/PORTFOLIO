async function loadPortfolio() {
    let data;

    // 1. Cuba ambil data yang diedit dari Admin (Local Storage)
    let localData = localStorage.getItem('portfolioData');
    
    if (localData) {
        data = JSON.parse(localData);
    } else {
        // 2. Jika tiada, ambil dari fail data.json asal
        const res = await fetch('data.json');
        data = await res.json();
    }

    // --- UPDATE DATA KE DALAM HTML ---

    // HERO
    document.getElementById('nav-logo').innerHTML = `${data.hero.name}<span>.</span>`;
    document.getElementById('hero-name').innerText = data.hero.name;
    document.getElementById('hero-title').innerText = data.hero.title;
    document.getElementById('footer-name').innerText = data.hero.name;

    // ABOUT
    document.getElementById('about-text').innerText = data.about;

    // EXPERIENCE & LEADERSHIP
    const expList = document.getElementById('exp-list');
    expList.innerHTML = '';
    
    // Gabungkan kerja dan leadership
    const allExp = [...data.experience, ...data.leadership];
    allExp.forEach(item => {
        expList.innerHTML += `
            <div class="card">
                <h3>${item.role}</h3>
                <p class="company">${item.company || item.place} | ${item.year}</p>
                <p>${item.desc}</p>
            </div>
        `;
    });

    // EDUCATION
    const eduList = document.getElementById('edu-list');
    eduList.innerHTML = '';
    data.education.forEach(item => {
        eduList.innerHTML += `
            <div class="card">
                <h3>${item.course}</h3>
                <p class="company">${item.place} | ${item.year}</p>
                <p>${item.desc}</p>
            </div>
        `;
    });

    // SKILLS
    const skillsList = document.getElementById('skills-list');
    skillsList.innerHTML = '';
    data.skills.forEach(skill => {
        skillsList.innerHTML += `<div class="card skill-card">${skill}</div>`;
    });

    /    // PROJECTS
    const projectList = document.getElementById('project-list');
    projectList.innerHTML = '';
    data.projects.forEach(proj => {
        // Kalau takda gambar, guna placeholder
        let imgSrc = proj.image ? `images/${proj.image}` : 'https://via.placeholder.com/300x180?text=No+Image';
        
        projectList.innerHTML += `
            <div class="card project-card">
                <img src="${imgSrc}" alt="${proj.title}" class="project-image">
                <h3>${proj.title}</h3>
                <p>${proj.desc}</p>
                <a href="${proj.link}" class="project-link" target="_blank">Lihat →</a>
            </div>
        `;
    });

    // ACHIEVEMENTS
    const achieveList = document.getElementById('achieve-list');
    achieveList.innerHTML = '';
    data.achievements.forEach(ach => {
        achieveList.innerHTML += `<li><i class="fas fa-award highlight" style="color:var(--accent)"></i> ${ach}</li>`;
    });
}

// Jalankan fungsi bila web dibuka
loadPortfolio();