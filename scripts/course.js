const courses = [
    { subject: 'CSE', number: 110, title: 'Intro to Programming', credits: 2, completed: true },
    { subject: 'WDD', number: 130, title: 'Web Fundamentals', credits: 2, completed: true },
    { subject: 'CSE', number: 210, title: 'Programming with Classes', credits: 2, completed: false },
    { subject: 'WDD', number: 131, title: 'Dynamic Web Phil', credits: 2, completed: true },
    { subject: 'WDD', number: 231, title: 'Web Frontend II', credits: 2, completed: false }
];

function displayCourses(filteredCourses) {
    const container = document.querySelector("#course-cards");
    container.innerHTML = ""; // Limpiar contenido
    
    filteredCourses.forEach(course => {
        const card = document.createElement("div");
        card.classList.add("course-card");
        if (course.completed) card.classList.add("completed"); // Marcar completados
        card.textContent = `${course.subject} ${course.number}`;
        container.appendChild(card);
    });

    // Calcular créditos con REDUCE
    const total = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    document.querySelector("#total-credits").textContent = total;
}

// Eventos para los botones
document.querySelector("#all").addEventListener("click", () => displayCourses(courses));
document.querySelector("#wdd").addEventListener("click", () => {
    displayCourses(courses.filter(c => c.subject === 'WDD'));
});
document.querySelector("#cse").addEventListener("click", () => {
    displayCourses(courses.filter(c => c.subject === 'CSE'));
});

displayCourses(courses); // Carga inicial