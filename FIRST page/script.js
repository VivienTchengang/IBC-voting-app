// JavaScript for dynamic response section
document.querySelectorAll('.stars span').forEach((star, index, stars) => {
    star.addEventListener('click', () => {
        const parent = star.parentNode;
        parent.querySelectorAll('span').forEach((s, i) => {
            s.classList.toggle('selected', i <= index);
        });

        const sections = document.querySelectorAll('.response-section div');
        sections.forEach(section => section.classList.remove('active'));

        if (index === 0) {
            document.querySelector('.Waiting').classList.add('active');
        } else if (index === 1) {
            document.querySelector('.Worst').classList.add('active');
        } else if (index === 2) {
            document.querySelector('.Poor').classList.add('active');
        } else if (index === 3) {
            document.querySelector('.Average').classList.add('active');
        } else if (index === 4) {
            document.querySelector('.Good').classList.add('active');
        } else if (index === 5) {
            document.querySelector('.Excellent').classList.add('active');
        }
    });
});

// JavaScript for switching locations
document.querySelectorAll('.header button').forEach((button, index) => {
    button.addEventListener('click', () => {
        // Set the active state for the clicked button
        document.querySelectorAll('.header button').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // Show content based on the selected button
        const sections = document.querySelectorAll('.response-section div');
        sections.forEach(section => section.classList.remove('active'));

        if (index === 0) {
            // Kochi
            document.querySelector('.Waiting').classList.add('active');
        } else if (index === 1) {
            // Toulouse (customize as needed)
            document.querySelector('.Worst').classList.add('active');
        } else if (index === 2) {
            // Douala
            document.querySelector('.Average').classList.add('active');
        }
    });
});