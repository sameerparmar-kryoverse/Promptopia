'use client'

import {useState, useEffect} from 'react'
import { useParams } from 'next/navigation'

import Profile from '@/components/Profile'


const OtherProfile = () => {
  const params = useParams();

  const [posts, setPosts] = useState([]);
    
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params?.id}/posts`);
      const data = await response.json();

      setPosts(data);
    }

    if(params?.id) fetchPosts();
  }, [params.id])

  return (
    <Profile
      name={posts[0]?.creator.username}
      desc={`Welcome to ${posts[0]?.creator.username}'s personalized profile page. explore ${posts[0]?.creator.username}'s exceptional prompts and be inspired by  the power of their imagination`}
      data={posts}
    />
  )
}

export default OtherProfile