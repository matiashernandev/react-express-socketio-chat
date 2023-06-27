import { useEffect, useState } from "react"
import io from "socket.io-client"

const socket = io("/")

export default function App() {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()

    const newMessage = {
      body: message,
      from: "Me",
    }

    setMessages([...messages, newMessage])

    socket.emit("message", message)

    //*const formData = new FormData(e.target)
    //*const data = Object.fromEntries(formData)
    //*console.log(data)
  }

  useEffect(() => {
    socket.on("message", receiveMessage)

    return () => {
      socket.off("message", receiveMessage)
    }
  }, [])

  const receiveMessage = (message) => {
    setMessages((state) => [...state, message])
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => setMessage(e.target.value)}
          name="chat"
          type="text"
          placeholder="Hola hola! Todo bien?"
        />
        <button>Send</button>
      </form>

      <ul>
        {messages.map((msg, i) => (
          <li key={i}>
            {msg.from}:{msg.body}
          </li>
        ))}
      </ul>
    </div>
  )
}
