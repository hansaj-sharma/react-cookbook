// styles
import './Home.css'

// import { useFetch } from '../../hooks/useFetch'
import RecipeList from '../../components/RecipeList'
// firebase datatbase 
import { projectFireStore } from '../../firebase/config'
import { useEffect, useState } from 'react'

export default function Home() {
    // const { data: recipes, isPending, error } = useFetch('http://localhost:3000/recipes')

    const [data, setData] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        setIsPending(true)
        const unsub = projectFireStore.collection('recipes').onSnapshot((snapshot) => {
            if (snapshot.empty) {
                setError('no recipes')
                setIsPending(false)
            } else {
                let results = []
                snapshot.docs.forEach(doc => {
                    results.push({ id: doc.id, ...doc.data() })

                })
                setData(results)
                setIsPending(false)
            }
        }, (err) => {
            setError(err.message)
            setIsPending(false)
        })
        return () => {
            // cleanup function 
            unsub()
        }
    }, [])

    return (
        <div className='home'>
            {error && <p className='error'>{error}</p>}
            {isPending && <p className='laoding'>Loading...</p>}
            {data && <RecipeList recipes={data} />}
        </div>
    )
}
