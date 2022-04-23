// styles
import './RecipeList.css'


//imports
import { Link } from 'react-router-dom'
import { useTheme } from '../hooks/useThemes'
import trashcan from '../assets/trashcan.svg'
import { projectFireStore } from '../firebase/config'

export default function RecipeList({ recipes }) {

    const { mode } = useTheme()
    if (recipes.length === 0) {
        return <div className="error">
            No recipes to load....
        </div>
    }
    const handleClick = (id) => {
        projectFireStore.collection('recipes').doc(id).delete()
        console.log('delete')
    }
    return (
        <div className="recipe-list">
            {recipes.map(recipe => (
                <div className={`card ${mode}`} key={recipe.id}>
                    <h3>{recipe.title}</h3>
                    <p>{recipe.cookingTime} to make.</p>
                    <div>{recipe.method.substring(0, 100)}</div>
                    <Link to={`/recipes/${recipe.id}`}>Cook this</Link>
                    <img
                        className="delete"
                        src={trashcan}
                        onClick={() => handleClick(recipe.id)}
                    />
                </div>
            ))}
        </div>
    )
}
