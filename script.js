// Адаптация вашей React-логики под Vanilla JS для анимации
document.addEventListener('DOMContentLoaded', () => {
// --- ИСПРАВЛЕНИЕ: Используйте относительные пути ---
// Путь должен быть от файла index.html до папки images.
const ministers = [
    { name: "Серик", title: "Старший пастор", avatarUrl: "images/serik.png" },
    { name: "Антон", title: "Пастор-учитель", avatarUrl: "images/anton.png" },
    { name: "Моисей", title: "Лидер подросткового и муз. служений, тренер по флорболу", avatarUrl: "images/moses.png" },
    { name: "Шерзат", title: "Лидер молодежного служения, администратор д/ц 'Арман'", avatarUrl: "images/sherzat.png" }
];

const container = document.getElementById('team-cards-container');
if (!container) return;

// Создаем и вставляем карточки в HTML
ministers.forEach(minister => {
    const cardHTML = `
        <div class="pc-card-wrapper">
            <section class="pc-card">
                <div class="pc-inside">
                    <div class="pc-shine"></div>
                    <div class="pc-glare"></div>
                    <div class="pc-content pc-avatar-content">
                        <img class="avatar" src="${minister.avatarUrl}" alt="Фото ${minister.name}" loading="lazy" onerror="this.onerror=null;this.src='https://placehold.co/400x550/222/FFF?text=Image+Error';">
                    </div>
                    <div class="pc-content">
                        <div class="pc-details">
                            <h3>${minister.name}</h3>
                            <p>${minister.title}</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    `;
    container.innerHTML += cardHTML;
});

// Логика анимации для каждой карточки
const clamp = (value, min = 0, max = 100) => Math.min(Math.max(value, min), max);

document.querySelectorAll('.pc-card').forEach(card => {
    const wrap = card.parentElement;

    const updateCardTransform = (offsetX, offsetY) => {
        const rect = card.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        const percentX = clamp((100 / width) * offsetX);
        const percentY = clamp((100 / height) * offsetY);

        const centerX = percentX - 50;
        const centerY = percentY - 50;

        const properties = {
            "--pointer-x": `${percentX}%`,
            "--pointer-y": `${percentY}%`,
            "--pointer-from-center": `${clamp(Math.hypot(centerY, centerX) / 50, 0, 1)}`,
            "--rotate-x": `${(centerY / 4).toFixed(3)}deg`, 
            "--rotate-y": `${(-centerX / 5).toFixed(3)}deg`,
        };

        Object.entries(properties).forEach(([property, value]) => {
            wrap.style.setProperty(property, value);
        });
    };
    
    card.addEventListener('pointerenter', () => {
        wrap.classList.add("active");
        card.classList.add("active");
    });

    card.addEventListener('pointerleave', () => {
        wrap.classList.remove("active");
        card.classList.remove("active");
        // Плавный возврат в исходное положение
        wrap.style.setProperty("--rotate-x", '0deg');
        wrap.style.setProperty("--rotate-y", '0deg');
    });

    card.addEventListener('pointermove', (event) => {
        const rect = card.getBoundingClientRect();
        updateCardTransform(event.clientX - rect.left, event.clientY - rect.top);
    });
});
});

