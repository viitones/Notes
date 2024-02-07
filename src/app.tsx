import { NoteCard } from './components/NoteCard'
import { NewNoteCard } from './components/NewNoteCard'

import logo from './assets/logo.svg'

const note = {
  date: new Date(),
  content: "Hello"
}

export function App(){
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
        
        <NewNoteCard />

        <NoteCard note={note}/>
        <NoteCard note={note} />

      </div>
    </div>
  )
}