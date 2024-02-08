import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { MouseEvent, ChangeEvent, useState } from 'react'
import { toast } from 'sonner'

let speechRecognition: SpeechRecognition | null = null;

interface NewNoteCardProps {
  onNoteCreated: (content: string) => void
}

export function NewNoteCard({onNoteCreated}: NewNoteCardProps){
  const [shouldShowOnBoarding, setShouldShowOnBoarding] = useState(true)
  const [isRecording, setIsRecording] = useState(false)
  const [content, setContent] = useState('')  

  function handleStartEditor(){
    setShouldShowOnBoarding(false)
  }

  function handleContentChanged(event: ChangeEvent<HTMLTextAreaElement>){
    setContent(event.target.value)

    if (event.target.value === ""){
      setShouldShowOnBoarding(true)
    }

  }

  function trueModal(){
    setShouldShowOnBoarding(true)
  }

  function handleSaveNote(event: MouseEvent<HTMLButtonElement>){
    if(content === ''){
      return
    }
    
    event.preventDefault();

    onNoteCreated(content);
    
    trueModal();

    setContent('') 
    
    toast.success('Nota criada com sucesso')
  }


  function handleStartRecording(){

    const isSpeechRecognitionApiAvaiable = 'SpeechRecognition' in window
      || 'webkitSpeechRecognition' in window
      
    if(!isSpeechRecognitionApiAvaiable){
      alert('Infelizmente seu navegador não suporta a digitação por fala')
      return
    }


    setIsRecording(true);
    setShouldShowOnBoarding(false)


    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition
  
    speechRecognition = new SpeechRecognitionAPI()

    speechRecognition.lang = 'pt-BR'
    speechRecognition.continuous = true
    speechRecognition.maxAlternatives = 1
    speechRecognition.interimResults = true

    speechRecognition.onresult = (event) => {
      const transcription = Array.from(event.results).reduce((text, result) => {
        return text.concat(result[0].transcript)
      }, '')

      setContent(transcription)
    }

    speechRecognition.onerror = (event) => {
      console.error(event);
    }

    speechRecognition.start();
  }
  
  function handleStopRecording(){
    setIsRecording(false);

    if(speechRecognition != null){
      speechRecognition.stop()
    }

  }

    return (
        <Dialog.Root>
          <Dialog.Trigger className='flex flex-col text-left gap-5 rounded-md bg-slate-800 p-5 hover:ring-2 hover:ring-slate-600 focus:ring-2 focus:ring-lime-400 outline-none'>
              <span className='text-sm font-medium text-slate-200'>Adicionar nota</span>
              <p className='text-sm leading-6 text-slate-400'>Grave uma nota em áudio que será convertida para texto automaticamente.</p>
          </Dialog.Trigger>

          <Dialog.Portal>
                <Dialog.Overlay className='data-[state=open]:animate-overlayshow inset-0 fixed bg-black/50 '/>
                <Dialog.Content className='data-[state=open]:animate-contentshow fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[640px] h-[60vh] w-full bg-slate-700 rounded-md flex flex-col outline-none overflow-hidden'>
                    <Dialog.Close onClick={trueModal} className='absolute top-0 right-0 bg-slate-800 px-1.5 text-slate-400 hover:text-slate-100'>
                        <X  className='size-5'/>
                    </Dialog.Close>
                    
                      <form className='flex flex-col flex-1'>
                        <div className='flex flex-1 flex-col gap-3 p-5'>
                            <span className='text-sm font-medium text-slate-400'>
                                Adicionar nota
                            </span>

                            {shouldShowOnBoarding ? (
                              <p className='text-sm leading-6 text-'>
                                Comece <button type='button' onClick={handleStartRecording} className='font-medium text-lime-400 hover:underline'>gravando uma nota</button> em áudio ou se preferir <button type='button' onClick={handleStartEditor} className='font-medium text-lime-400 hover:underline'>utilize apenas texto</button>.
                              </p>
                            ) : (
                              <textarea
                                autoFocus
                                className='text-sm leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none'
                                onChange={handleContentChanged}
                                value={content}
                              />
                            )}
                        </div>

                        {isRecording ? (
                            <button 
                            type='button'
                            onClick={handleStopRecording}
                            className='w-full flex justify-center items-center gap-2 py-4 text-center text-smoutline-none font-medium bg-slate-900 text-slate-300 hover:text-slate-100'
                            >
                              <div className='size-3 rounded-full animate-pulse bg-red-500 ' />
                              Gravando (clique p/ interromper)
                          </button>
                        ) : (
                          <button 
                            type='button'
                            onClick={handleSaveNote}
                            className='w-full py-4 text-center text-smoutline-none font-medium bg-lime-400 text-lime-950 hover:bg-lime-500'
                            >
                              Salvar nota
                        </button>
                        )}

                        
                    </form>
                  </Dialog.Content>
            </Dialog.Portal>

        </Dialog.Root>
    )
}