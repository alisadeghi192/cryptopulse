import { useState } from 'react'
import { Pencil, X, Check } from 'lucide-react'

interface EditableNameProps {
  value: string
  onSave: (value: string) => void
}

export function EditableName({ value, onSave }: EditableNameProps) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(value)

  const save = () => {
    onSave(draft)
    setEditing(false)
  }

  const cancel = () => {
    setDraft(value)
    setEditing(false)
  }

  if (editing) {
    return (
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          autoFocus
          className="font-display text-text border-primary/40 focus:border-primary w-full border-b-2 bg-transparent text-2xl font-bold tracking-tight outline-none md:text-3xl"
          onKeyDown={(e) => {
            if (e.key === 'Enter') save()
            if (e.key === 'Escape') cancel()
          }}
        />
        <button
          type="button"
          onClick={save}
          className="text-success hover:text-success/80 shrink-0"
          aria-label="Save name"
        >
          <Check className="size-5" />
        </button>
        <button
          type="button"
          onClick={cancel}
          className="text-text/70 hover:text-text shrink-0"
          aria-label="Cancel"
        >
          <X className="size-5" />
        </button>
      </div>
    )
  }

  return (
    <div className="group/name flex items-center gap-2">
      <h1 className="font-display text-text truncate text-2xl font-bold tracking-tight md:text-3xl">
        {value}
      </h1>
      <button
        type="button"
        onClick={() => setEditing(true)}
        className="text-text/40 hover:text-primary shrink-0 opacity-0 transition-opacity group-hover/name:opacity-100"
        aria-label="Edit name"
      >
        <Pencil className="size-4 cursor-pointer" />
      </button>
    </div>
  )
}