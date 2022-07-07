import axios from "axios"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const Reviews=()=>{
  const { id } = useParams();

    const [reviews,setReviews]=useState([])
    const getReviews=()=>{
        axios.get(`https://api.themoviedb.org/3/movie/${id}/reviews?api_key=1bfa430aada4409bfa6a3c5528128e8a&language=en-US&page=1`)
    .then((result)=>{
        console.log(result);
        setReviews(result.data.results)
    }).catch((err)=>{
        console.log(err);
    })
}
useEffect(()=>{
    getReviews()
},[])



return (
    <div className="reviewContainer">
{reviews&&reviews.map((element,index)=>{
    return (<h1>{element.author}</h1>)
})}




    </div>
)
}

export default Reviews;
