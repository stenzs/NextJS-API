import {useEffect, useState} from 'react'

const Info = () => {
	const [posts, setPosts] = useState();

	useEffect( () => {
		try {
			const Load = async() => {
				const res = await fetch('/api/posts');

				const data = await res.json();
				setPosts(data);
			}
			Load();
		} catch (error) {
			console.error(error)
		}
	},[])

	return (
		<div className="info">
			{posts?.map(post => {
				return (
				<div key={post.id} className='post'>
					<div className='text'>
						{post.title}
					</div>
					<div className='name'>
						От {post.author.name}
					</div>
				</div>
				)
			})}
		</div>
	)
}

export default Info
