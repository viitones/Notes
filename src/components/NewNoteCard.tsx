import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'


export function NewNoteCard(){
    return (
        <Dialog.Root>
          <Dialog.Trigger className='flex flex-col text-left gap-5 rounded-md bg-slate-800 p-5 hover:ring-2 hover:ring-slate-600 focus:ring-2 focus:ring-lime-400 outline-none'>
              <span className='text-sm font-medium text-slate-200'>Adicionar nota</span>
              <p className='text-sm leading-6 text-slate-400'>Comece gravando uma nota em áudio ou se preferir utilize apenas texto.</p>
          </Dialog.Trigger>

          <Dialog.Portal>
                <Dialog.Overlay className='inset-0 fixed bg-black/50'/>
                <Dialog.Content className='fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[640px] h-[60vh] w-full bg-slate-700 rounded-md flex flex-col outline-none overflow-hidden'>
                    <Dialog.Close className='absolute top-0 right-0 bg-slate-800 px-1.5 text-slate-400 hover:text-slate-100'>
                        <X  className='size-5'/>
                    </Dialog.Close>
                    
                    <div className='flex flex-1 flex-col gap-3 p-5'>
                        <span className='text-sm font-medium text-slate-400'>
                            Adicionar nota
                        </span>

                        <p className='text-sm leading-6 text-'>
                          Comece <button className='font-medium text-lime-400 hover:underline'>gravando uma nota</button> em áudio ou se preferir <button className='font-medium text-lime-400 hover:underline'>utilize apenas texto</button>.
                        </p>
                    </div>

                    <button 
                        type='button'
                        className='w-full py-4 text-center text-smoutline-none font-medium bg-lime-400 text-lime-950 hover:bg-lime-500'
                        >
                          Salvar nota
                    </button>
                </Dialog.Content>
            </Dialog.Portal>

        </Dialog.Root>
    )
}