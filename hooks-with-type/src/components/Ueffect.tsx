import { useState, useEffect } from 'react'


interface Post{
    userId:number
    id:number
    title:string
    body:string
}

interface Comment{
    postId:number
    id:number
    name:string
    email:string
    body:string
}

interface Todos{
    userId:number
    id:number
    title:string
    completed:boolean
}



const UseEffect = ():JSX.Element=>{
    const [resourceType, setResourceType] = useState<string>('posts')
    const [items, setItems] = useState<Post[] | Comment[] | Todos[]>([])

    

    useEffect(()=>{
        fetch(`https://jsonplaceholder.typicode.com/${resourceType}`)
            .then(response => response.json())
            .then(json => {
                setItems(json)
                console.log(json)
            })
    }, [resourceType])
    return(
        <div>
            <h2 style={{textAlign:'center'}}>Useffect</h2>
            <h3 style={{textAlign:'center'}}>{resourceType}</h3>
            <div style={{display:'flex', alignItems:'center'}}>
                <button onClick={()=> setResourceType('posts')}>Posts</button>
                <button onClick={()=> setResourceType('comments')}>Comments</button>
                <button onClick={()=> setResourceType('todos')}>Todos</button>                
            </div> 
            {resourceType === 'posts' && (
                <ul>
                {(items as Post[]).slice(0, 10).map(post=>(
                    <li key={post.id}>
                        <h4>{post.title}</h4>
                        {post.body}
                    </li>
                ))}
                </ul>
            )}

            {resourceType === 'comments' && (
                <ul>
                {(items as Comment[]).slice(0, 10).map(comment=>(
                    <li key={comment.id}>
                        <h4>{comment.name}</h4>
                        {comment.body}
                    </li>
                ))}
                </ul>
            )}

            {resourceType === 'todos' && (
                <ul>
                {(items as Todos[]).slice(0, 10).map(todo=>(
                    <li key={todo.id}>
                        <h4>{todo.title}</h4>
                        {todo.completed ? 'Completed' : 'Incomplete'}
                    </li>
                ))}
                </ul>
            )}        
        </div>
    )
}

export default UseEffect