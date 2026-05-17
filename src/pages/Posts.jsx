import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';

const Posts = () => {
  const { id } = useParams();

  useEffect(() => {
    async function fetchPosts() {
      const data = fetch("https://jsonplaceholder.typicode.com/posts/1")
      console.log('mounted', data)
    }
  },[])

  return (
    <div>{id}</div>
  )
}

export default Posts