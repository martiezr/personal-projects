import React from 'react'
import ExerciseList from '../components/ExerciseList'
import { useState, useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom'


function HomePage({exerciseToEdit, setExerciseToEdit}) {
    
    const [exercises, setExercises] = useState([])

    const history = useHistory()

    const loadExercises = async () => {
        const response = fetch('/exercises')
        const data = await (await response).json()
        setExercises(data)
    }

    const onEdit = async (exercise) => {
        setExerciseToEdit(exercise)
        history.push('/edit-exercise')
    }

    const onDelete = async _id => {
        const response = await fetch(`/exercises/${_id}`, { method: 'DELETE' })
        if (response.status === 204) {
            const newExercises = exercises.filter(e => e._id !== _id)
            setExercises(newExercises)
        } else {
            console.log(`Failed to delete exercise with id ${_id}. Status code: ${response.status}`)
        }
    }
    useEffect(() => {
        loadExercises()
    }, [])
    
    return (
        <>
            <h2>List of Exercises</h2>
            <ExerciseList exercises={exercises} onDelete={onDelete} onEdit={onEdit}></ExerciseList>
            <Link to="/add-exercise">Add Exercise</Link>
        </>
    )
}


export default HomePage 