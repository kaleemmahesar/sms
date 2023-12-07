import React, { useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SingleKbc from './SingleKbc'
import { updateQuestionsStatus } from '../../features/kbc/kbcSlice'

const ListKbc = () => {
    const { kbc } = useSelector((state) => state.kbc)
    const [score, setScore] = useState(0)
    const dispatch = useDispatch()

    // const UpdateScore = useMemo(function() {
    //     console.log('update score')
    //     return score + 1
    // }, [score]) 
       
    const updateScore = (choice, qid, qstatus) => {
        const answeredQuestion = kbc.map((item, index) => {
            if(item.id === qid) {
                const updatedQuestionsList = kbc.map((element) => {
                    return element.id === qid ? {...element , status: !qstatus} : element
                })
                dispatch(updateQuestionsStatus(updatedQuestionsList))
                if (item.answer === choice) {
                    setScore(score + 1)
                } else {
                    if (score > 1) {
                        setScore(score - 1)
                    }
                }
            }
        })
        
        
        
    }
    
    return (
        <>
            <h2>Your score is {score}</h2>
            {
                kbc.map((item, index) => {
                    return <SingleKbc key={index} item={item} updateScore={updateScore} />
                })
            }
        </>
        
    )
}

export default ListKbc