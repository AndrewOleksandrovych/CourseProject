// LocalStorage ключ
const STORAGE_KEY = 'vehicleData';

// Отримати дані з LocalStorage
function getVehicles() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

// Зберегти дані в LocalStorage
function saveVehicles(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// Додати автомобіль
function addVehicle(vehicle) {
    const vehicles = getVehicles();
    vehicles.push(vehicle);
    saveVehicles(vehicles);
}

// Редагувати автомобіль
function editVehicle(index) {
    const vehicles = getVehicles();
    const vehicle = vehicles[index];

    if (!vehicle) {
        alert('Автомобіль не знайдено!');
        return;
    }

    // Збереження індексу в LocalStorage, щоб знати, який запис редагується
    localStorage.setItem('editIndex', index);

    // Переходимо до сторінки редагування
    window.location.href = 'add.html';
}

// Перевірка, чи це редагування
function checkEditMode() {
    const editIndex = localStorage.getItem('editIndex');
    if (editIndex !== null) {
        const vehicles = getVehicles();
        const vehicle = vehicles[parseInt(editIndex)];

        if (vehicle) {
            // Заповнення форми даними
            document.getElementById('name').value = vehicle.name;
            document.getElementById('type').value = vehicle.type;
            document.getElementById('number').value = vehicle.number;
            document.getElementById('status').value = vehicle.status;

            // Оновлення кнопки форми
            const formButton = document.querySelector('form button');
            formButton.textContent = 'Оновити';
        }
    }
}

// Видалити автомобіль
function deleteVehicle(index) {
    const vehicles = getVehicles();
    vehicles.splice(index, 1);
    saveVehicles(vehicles);
    loadVehicleList();
}

// Завантажити список автомобілів
function loadVehicleList() {
    const vehicles = getVehicles();
    const vehicleList = document.getElementById('vehicleList');
    vehicleList.innerHTML = '';

    vehicles.forEach((vehicle, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${vehicle.name}</td>
            <td>${vehicle.type}</td>
            <td>${vehicle.number}</td>
            <td>${vehicle.status}</td>
            <td>
                <button onclick="window.location.href='details.html?index=${index}'">Деталі</button>
                <button onclick="editVehicle(${index})">Редагувати</button>
                <button onclick="deleteVehicle(${index})">Видалити</button>
            </td>
        `;
        vehicleList.appendChild(row);
    });
}

// Завантаження деталей автомобіля
function loadVehicleDetails() {
    const params = new URLSearchParams(window.location.search);
    const index = params.get('index');

    if (index !== null) {
        const vehicles = getVehicles();
        const vehicle = vehicles[parseInt(index)];

        if (vehicle) {
            const details = document.getElementById('vehicleDetails');
            details.innerHTML = `
                <p><strong>Назва:</strong> ${vehicle.name}</p>
                <p><strong>Тип:</strong> ${vehicle.type}</p>
                <p><strong>Номер:</strong> ${vehicle.number}</p>
                <p><strong>Стан:</strong> ${vehicle.status}</p>
            `;
        } else {
            alert('Автомобіль не знайдено!');
            window.history.back();
        }
    } else {
        alert('Неправильний запит!');
        window.history.back();
    }
}

// Додавання автомобіля через форму
document.getElementById('addVehicleForm')?.addEventListener('submit', function (e) {
    e.preventDefault();

    const editIndex = localStorage.getItem('editIndex');
    const newVehicle = {
        name: this.name.value,
        type: this.type.value,
        number: this.number.value,
        status: this.status.value,
    };

    if (editIndex !== null) {
        // Оновлення існуючого запису
        const vehicles = getVehicles();
        vehicles[parseInt(editIndex)] = newVehicle;
        saveVehicles(vehicles);
        localStorage.removeItem('editIndex'); // Видалення тимчасового індексу
    } else {
        // Додавання нового запису
        addVehicle(newVehicle);
    }

    window.location.href = 'list.html';
});

// Ініціалізація списку
if (document.getElementById('vehicleList')) {
    loadVehicleList();
}

// Ініціалізація деталей
if (document.getElementById('vehicleDetails')) {
    loadVehicleDetails();
}

// Ініціалізація режиму редагування
if (document.getElementById('addVehicleForm')) {
    checkEditMode();
}
// Експортуємо функцію для інших скриптів
function getVehicles() {
    const data = localStorage.getItem('vehicleData');
    return data ? JSON.parse(data) : [];
}
document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector("header");
    const main = document.querySelector("main");
    main.style.marginTop = `${header.offsetHeight}px`;
});
