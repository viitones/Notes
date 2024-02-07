import { NoteCard } from './components/NoteCard'
import { NewNoteCard } from './components/NewNoteCard'
import { useState } from 'react'

import logo from './assets/logo.svg'

interface Note {
  id: string,
  date: Date,
  content: string
}

export function App(){
  const [notes, setNotes] = useState<Note[]>([])

  function onNoteCreated(content: string) {
    const newNote = {
      id: crypto.randomUUID(),
      date: new Date(),
      content,
    }

    setNotes([newNote, ...notes])
  }

  return(
    <div className='mx-auto max-w-6xl my-12 space-y-6'>
      <img src={logo} alt="logo" />
      <form className='w-full'>
        <input 
        type="text" 
        placeholder='busque suas notas' 
        className='w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder:text-slate-500'
        />
      </form>

      <div className='h-px bg-slate-700' />

      <div className='grid gap-6 grid-cols-3 auto-rows-[250px]'>
        
        <NewNoteCard onNoteCreated={onNoteCreated} />

        {notes.map(note => {
          return <NoteCard key={note.id} note={note} />
        })}

      </div>
    </div>
  )
}