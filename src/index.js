document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('create-task-form');
    const taskList = document.getElementById('tasks');
    const sortButton = document.getElementById('sort-tasks');
  
    form.addEventListener('submit', (e) => {
      e.preventDefault();
  
      const taskInput = document.getElementById('new-task-description');
      const userInput = document.getElementById('user');
      const dueDateInput = document.getElementById('due-date');
      const priorityInput = document.getElementById('priority');
  
      const taskText = taskInput.value.trim();
      const userText = userInput.value.trim();
      const dueDateText = dueDateInput.value;
      const priorityValue = priorityInput.value;
  
      if (taskText === '') {
        alert('Please enter a task description.');
        return;
      }
  
      const taskItem = document.createElement('li');
      taskItem.innerHTML = `<strong>${taskText}</strong> 
                            (Assigned to: ${userText || 'N/A'}, Due: ${dueDateText || 'N/A'})`;
  
      switch (priorityValue) {
        case 'high':
          taskItem.style.color = 'red';
          break;
        case 'medium':
          taskItem.style.color = 'orange';
          break;
        case 'low':
          taskItem.style.color = 'green';
          break;
      }
  
     
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = '❌';
      deleteBtn.addEventListener('click', () => taskItem.remove());
  
     
      const editBtn = document.createElement('button');
      editBtn.textContent = '✏️';
      editBtn.addEventListener('click', () => editTask(taskItem, taskText, userText, dueDateText, priorityValue));
  
      taskItem.appendChild(deleteBtn);
      taskItem.appendChild(editBtn);
      taskItem.dataset.priority = priorityValue; 
      taskList.appendChild(taskItem);
  
   
      taskInput.value = '';
      userInput.value = '';
      dueDateInput.value = '';
    });
  
   
    sortButton.addEventListener('click', () => {
      const tasks = Array.from(taskList.children);
      tasks.sort((a, b) => {
        const priorityOrder = { high: 1, medium: 2, low: 3 };
        return priorityOrder[a.dataset.priority] - priorityOrder[b.dataset.priority];
      });
  
      taskList.innerHTML = '';
      tasks.forEach(task => taskList.appendChild(task));
    });
  
    
    function editTask(taskItem, oldTask, oldUser, oldDate, oldPriority) {
      const newTask = prompt('Edit Task:', oldTask) || oldTask;
      const newUser = prompt('Edit User:', oldUser) || oldUser;
      const newDate = prompt('Edit Due Date:', oldDate) || oldDate;
      const newPriority = prompt('Edit Priority (high, medium, low):', oldPriority) || oldPriority;
  
      taskItem.innerHTML = `<strong>${newTask}</strong> (Assigned to: ${newUser}, Due: ${newDate})`;
  
      switch (newPriority) {
        case 'high':
          taskItem.style.color = 'red';
          break;
        case 'medium':
          taskItem.style.color = 'orange';
          break;
        case 'low':
          taskItem.style.color = 'green';
          break;
      }
  
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = '❌';
      deleteBtn.addEventListener('click', () => taskItem.remove());
  
      const editBtn = document.createElement('button');
      editBtn.textContent = '✏️';
      editBtn.addEventListener('click', () => editTask(taskItem, newTask, newUser, newDate, newPriority));
  
      taskItem.appendChild(deleteBtn);
      taskItem.appendChild(editBtn);
      taskItem.dataset.priority = newPriority;
    }
  });
  