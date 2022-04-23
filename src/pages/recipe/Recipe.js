import './Recipe.css'

import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
// import { useFetch } from '../../hooks/useFetch'
import { useTheme } from '../../hooks/useThemes'
import { projectFireStore } from '../../firebase/config'
import edit from '../../assets/edit.svg'

export default function Recipe() {

    const { id } = useParams()
    // const url = 'http://localhost:3000/recipes/' + id
    // const { data: recipe, error, isPending } = useFetch(url)
    const { mode } = useTheme()

    const [recipe, setRecipe] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        setIsPending(true)
        const unsub = projectFireStore.collection('recipes').doc(id).onSnapshot((doc) => {
            if (doc.exists) {
                setIsPending(false)
                setRecipe(doc.data())
            } else {
                setIsPending(false)
                setError('could not find the recipe ')
            }
        })
        return () => {
            unsub()
        }
    }, [id])

    const handleClick = () => {
        projectFireStore.collection('recipes').doc(id).update({
            title: 'something different'
        })
    }
    return (
        <div className={`recipe ${mode}`}>
            {error && <p className='error'>{error}</p>}
            {isPending && <p className='laoding'>Loading...</p>}
            {recipe && (
                <>
                    <h2 className='page-title'>
                        {recipe.title}
                    </h2>

                    <p>Take {recipe.cookingTime} to cook.</p>
                    <ul>
                        {recipe.ingredients.map(ing => (
                            <li key={ing}>{ing}</li>
                        ))}
                    </ul>
                    <p className="method">{recipe.method}</p>
                    <button className="edit-button" onClick={handleClick}>
                        update me
                    </button>
                </>
            )}
        </div>
    )
}
