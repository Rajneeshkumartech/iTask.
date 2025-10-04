# iTask - Your Local Todo Manager 🚀

iTask is a simple and effective **Todo List application** built with **React** and styled using **Tailwind CSS**. It allows users to manage their tasks by adding, editing, deleting, and marking them as complete. The application uses the browser's **Local Storage** to persist your todos, so they are saved even after you close the browser.

## ✨ Features

* **Create Todos:** Quickly add new tasks with a minimum length validation (3 characters).
* **Edit Todos:** Easily modify existing tasks. The task is brought back into the input field for editing.
* **Delete Todos:** Remove tasks with a **double confirmation dialog** for safety.
* **Mark as Complete:** Toggle the completion status of a task using a checkbox, which visually strikes through the text.
* **Filter Completed Tasks:** A toggle allows you to show or hide tasks that have been marked as finished.
* **Persistence:** Tasks are automatically saved to and loaded from **Local Storage**.
* **Focus Management:** The input field automatically regains focus after adding a new task for continuous entry.

## 🛠 Technologies Used

* **React:** For building the user interface.
* **Tailwind CSS:** For rapid and modern styling.
* **`uuid`:** To generate unique IDs for each todo item.
* **`react-icons`:** For the edit (`CiEdit`) and delete (`AiOutlineDelete`) icons.

## ⚙️ Core Logic Explained

The application manages its state using three primary React hooks:

1.  **`useState` for `todo`:** Stores the text currently being typed in the input field.
2.  **`useState` for `todos`:** An array of objects, where each object represents a task:
    ```javascript
    { id: string, todo: string, iscompleted: boolean }
    ```
3.  **`useState` for `showfinished`:** A boolean to control the visibility of completed tasks.

### Persistence (`useEffect` & `SaveToLS`)

* The **`useEffect`** hook runs once on component mount to load todos from `localStorage`.
* The **`SaveToLS`** function is called after every state-changing operation (`handleAdd`, `handleEdit`, `handleDelete`, `handleCheckBox`) to keep `localStorage` synchronized with the current `todos` state.

### Filtering Todos

In the rendering section, todos are filtered based on the `showfinished` state:

```javascript
// Only renders the todo item if:
// 1. 'showfinished' is true (show all tasks), OR
// 2. 'item.iscompleted' is false (show unfinished tasks)
return (showfinished || !item.iscompleted) && (
    // ... Todo item JSX
)
