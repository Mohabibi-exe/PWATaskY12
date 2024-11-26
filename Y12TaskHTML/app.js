import { db } from './db.js';
import {collection, addDoc, getDocs, deleteDoc, doc} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
// DOM elements
const recipeForm = document.getElementById('Add_Recipe_Form');
const recipeTitleInput = document.getElementById('recipe-title');
const recipeIngredientsInput = document.getElementById('recipe-ingredients');
const recipeList = document.getElementById('Recipe-list');

// Add Recipe Function
async function addRecipe(e) {
    e.preventDefault(); // Prevent form from refreshing the page

    // Get form values
const title = recipeTitleInput.value.trim();
const ingredients = recipeIngredientsInput.value
        .trim()
        .split(',')
        .map((ingredient) => ingredient.trim());

    // Check if both fields are filled
if (title && ingredients.length > 0) {
        try {
            // Add new recipe to Firestore
        const docRef = await addDoc(collection(db, 'Recipes'), {
                title: title,
                ingredients: ingredients,
        });
        console.log('Document added with ID: ', docRef.id);

            // Clear input fields
        recipeTitleInput.value = '';
        recipeIngredientsInput.value = '';

            // Reload recipes list after adding
        loadRecipes();
        } catch (error) {
        console.error('Error adding document: ', error);
        }
} else {
        alert('Please fill in both title and ingredients!');
}
}

// Load Recipes Function
async function loadRecipes() {
const querySnapshot = await getDocs(collection(db, 'Recipes'));
    recipeList.innerHTML = ''; // Clear the current list

querySnapshot.forEach((doc) => {
        const recipe = doc.data();
        const li = document.createElement('li');
        li.classList.add('recipe-item');
        li.innerHTML = `
        <h3>${recipe.title}</h3>
        <p>Ingredients: ${recipe.ingredients.join(', ')}</p>
        <button class="delete-btn">Delete</button>
        `;

        // Attach event listener to the delete button
        const deleteButton = li.querySelector('.delete-btn');
        deleteButton.addEventListener('click', async () => {
        try {
                // Call the deleteDoc function directly
                await deleteDoc(doc(db, 'Recipes', doc.id));
                console.log('Document deleted: ', doc.id);

                // Reload the recipes after deletion
                loadRecipes();
        } catch (error) {
                console.error('Error deleting document: ', error);
        }
        });

        recipeList.appendChild(li); // Append the list item to the recipe list
});
}

// Event Listener for Form Submission
recipeForm.addEventListener('submit', addRecipe);

// Load recipes when the page loads
loadRecipes();