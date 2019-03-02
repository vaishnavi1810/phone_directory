// Book Class: Represents a Book
class phone {
  constructor(Name, Number) {
    this.Name = Name;
    this.Number = Number;
  }
}

// UI Class: Handle UI Tasks
class UI {
  static displayNames() {
    const Names = Store.getNames();

    Names.forEach((phonebook) => UI.addNameToList(name));
  }

  static addNameToList(phonebook) {
    const list = document.querySelector('#name-list');

    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${phonebook.Name}</td>
      <td>${phonebook.Number}</td>
      <td><a href="#" class="btn-delete">X</a></td>
    `;

    list.appendChild(row);
  }

  static deleteName(el) {
    if(el.classList.contains('delete')) {
      el.parentElement.parentElement.remove();
    }
  }

  static showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const form = document.querySelector('#phone-form');
    container.insertBefore(div, form);

    // Vanish in 3 seconds
    setTimeout(() => document.querySelector('.alert').remove(), 3000);
  }

  static clearFields() {
    document.querySelector('#Name').value = '';
    document.querySelector('#Number').value = '';
  }
}

// Store Class: Handles Storage
class Store {
  static getNames() {
    let Names;
    if(localStorage.getItem('Names') === null) {
      Names = [];
    } else {
      Names = JSON.parse(localStorage.getItem('Names'));
    }

    return Names;
  }

  static addBook(phonebook) {
    const Names = Store.getNames();
    Names.push(phonebook);
    localStorage.setItem('Names', JSON.stringify(Names));
  }

  static removeBook(Number) {
    const Names = Store.getNames();

    Names.forEach((phonebook, Name) => {
      if(phonebook.Number === Number) {
        Names.splice(index, 1);
      }
    });

    localStorage.setItem('Names', JSON.stringify(Names));
  }
}

// Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayNames);

// Event: Add a Book
document.querySelector('#phone-form').addEventListener('submit', (e) => {
  // Prevent actual submit
  e.preventDefault();

  // Get form values
  const Name = document.querySelector('#Name').value;
  const Number = document.querySelector('#Number').value;

  // Validate
  if(Name === '' || Number === '') {
    UI.showAlert('Please fill in all fields', 'danger');
  } else {
    // Instatiate book
    const phonebook = new phone(Name, Number);

    // Add Book to UI
    UI.addNameToList(phonebook);

    // Add book to store
    Store.addBook(phonebook);

    // Show success message
    UI.showAlert('Number Added', 'success');

    // Clear fields
    UI.clearFields();
  }
});

// Event: Remove a Book
document.querySelector('#name-list').addEventListener('click', (e) => {
  // Remove book from UI
  UI.deleteName(e.target);

  // Remove book from store
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  // Show success message
  UI.showAlert('Number Removed', 'success');
});