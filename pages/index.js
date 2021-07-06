import {useState} from 'react';
import Link from 'next/link';

const Index = () => {

	const [author, setLogin] = useState();
	const [title, setText] = useState();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const data = {author, title}
		try {
			await fetch('/api/posts', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json;charset=utf-8'
				},
				body: JSON.stringify(data)
			})
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<>
			<form className="form" onSubmit={e => handleSubmit(e)}>
				<h1>Task</h1>
				<Link href={'/info'}>Результат</Link>
				<label>Имя</label>
				<input id="login" type="text" onChange={e => setLogin(e.target.value)} value={author} />
				<label>Сообщение</label>
				<textarea id="text" onChange={e => setText(e.target.value)} value={title} ></textarea>
				<button type="submit">Отправить</button>
			</form>
		</>
	)
}

export default Index;