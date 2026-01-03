// База данных рулар (пример)
const ruDatabase = [
    { name: "Дулат", zhuz: "Ұлы жүз", description: "Ұлы жүздің ірі руы" },
    { name: "Жалайыр", zhuz: "Ұлы жүз", description: "Тарихи ру" },
    { name: "Арғын", zhuz: "Орта жүз", description: "Орта жүздің негізгі руы" },
    { name: "Найман", zhuz: "Орта жүз", description: "Көне тайпа" },
    { name: "Әлімұлы", zhuz: "Кіші жүз", description: "Кіші жүздің бір тармағы" },
    { name: "Байұлы", zhuz: "Кіші жүз", description: "Батыс аймақтың руы" },
    { name: "Қаңлы", zhuz: "Жүзден тыс", description: "Тарихи көне ру" },
    { name: "Қыпшақ", zhuz: "Жүзден тыс", description: "Дала тайпасы" }
];

// Поиск рулар
document.addEventListener('DOMContentLoaded', function() {
    const searchButton = document.getElementById('searchButton');
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    
    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') performSearch();
    });
    
    function performSearch() {
        const query = searchInput.value.trim().toLowerCase();
        
        if (!query) {
            searchResults.innerHTML = '<p class="no-results">Өтінемін, ру атын енгізіңіз</p>';
            return;
        }
        
        const results = ruDatabase.filter(ru => 
            ru.name.toLowerCase().includes(query) || 
            ru.zhuz.toLowerCase().includes(query)
        );
        
        if (results.length === 0) {
            searchResults.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search" style="font-size: 3rem; color: #ddd; margin-bottom: 20px;"></i>
                    <h3>Ру табылмады</h3>
                    <p>"${query}" бойынша нәтиже жоқ</p>
                </div>
            `;
            return;
        }
        
        let html = '<h3>Табылған нәтижелер:</h3>';
        
        results.forEach(ru => {
            let zhuzColor = '#4CAF50'; // Ұлы жүз
            if (ru.zhuz === "Орта жүз") zhuzColor = '#2196F3';
            if (ru.zhuz === "Кіші жүз") zhuzColor = '#FF9800';
            if (ru.zhuz === "Жүзден тыс") zhuzColor = '#9C27B0';
            
            html += `
                <div class="ru-result">
                    <div class="ru-header">
                        <h4>${ru.name}</h4>
                        <span class="zhuz-badge" style="background-color: ${zhuzColor}">
                            ${ru.zhuz}
                        </span>
                    </div>
                    <p>${ru.description}</p>
                </div>
            `;
        });
        
        searchResults.innerHTML = html;
    }
    
    // Создание дерева шежіре
    createFamilyTree();
});

// Функция для создания дерева шежіре
function createFamilyTree() {
    const treeContainer = document.querySelector('.tree');
    
    // Простое SVG дерево
    treeContainer.innerHTML = `
        <svg width="100%" height="100%" viewBox="0 0 800 400">
            <!-- Ствол -->
            <path d="M400,350 L400,200" stroke="#8B4513" stroke-width="20" stroke-linecap="round"/>
            
            <!-- Ветки -->
            <path d="M400,250 L300,180" stroke="#8B4513" stroke-width="15" stroke-linecap="round"/>
            <path d="M400,250 L500,180" stroke="#8B4513" stroke-width="15" stroke-linecap="round"/>
            <path d="M400,200 L250,100" stroke="#8B4513" stroke-width="12" stroke-linecap="round"/>
            <path d="M400,200 L550,100" stroke="#8B4513" stroke-width="12" stroke-linecap="round"/>
            
            <!-- Листья/узлы -->
            <circle cx="300" cy="180" r="25" fill="#27ae60" stroke="#2ecc71" stroke-width="3"/>
            <circle cx="500" cy="180" r="25" fill="#27ae60" stroke="#2ecc71" stroke-width="3"/>
            <circle cx="250" cy="100" r="20" fill="#2ecc71" stroke="#27ae60" stroke-width="2"/>
            <circle cx="550" cy="100" r="20" fill="#2ecc71" stroke="#27ae60" stroke-width="2"/>
            
            <!-- Текст -->
            <text x="300" y="180" text-anchor="middle" fill="white" font-weight="bold" font-size="14">Ұлы</text>
            <text x="500" y="180" text-anchor="middle" fill="white" font-weight="bold" font-size="14">Орта</text>
            <text x="250" y="100" text-anchor="middle" fill="white" font-weight="bold" font-size="12">Кіші</text>
            <text x="550" y="100" text-anchor="middle" fill="white" font-weight="bold" font-size="12">Жүзден тыс</text>
            
            <!-- Корни -->
            <path d="M400,350 L350,390" stroke="#5D4037" stroke-width="10" stroke-linecap="round"/>
            <path d="M400,350 L450,390" stroke="#5D4037" stroke-width="10" stroke-linecap="round"/>
            
            <text x="400" y="380" text-anchor="middle" fill="#5D4037" font-weight="bold" font-size="16">
                ҚАЗАҚ ХАЛҚЫ
            </text>
        </svg>
    `;
}

// Переключение языка
document.querySelector('.language-switcher').addEventListener('click', function() {
    const currentLang = this.querySelector('span').textContent;
    const newLang = currentLang === 'ҚАЗ' ? 'РУС' : 'ҚАЗ';
    
    this.querySelector('span').textContent = newLang;
    
    // Здесь можно добавить реальное переключение языка
    alert(`Тіл ауыстырылды: ${newLang === 'ҚАЗ' ? 'Қазақша' : 'Орысша'}`);
});
