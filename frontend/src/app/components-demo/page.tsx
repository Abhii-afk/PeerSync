"use client"

import { useState } from "react"
import { Button, Input, Modal, Loader, ThemeToggle } from "@/components/ui"
import { useToast } from "@/hooks/useToast"

function ToastDemoButtons() {
  const { showToast } = useToast()

  return (
    <div className="flex flex-wrap gap-3">
      <Button variant="primary" onClick={() => showToast("Operation completed successfully!", { variant: "success" })}>
        Trigger Success Toast
      </Button>
      <Button variant="outline" onClick={() => showToast("Something went wrong. Please try again.", { variant: "error" })}>
        Trigger Error Toast
      </Button>
      <Button variant="secondary" onClick={() => showToast("Here is some useful information.", { variant: "info" })}>
        Trigger Info Toast
      </Button>
    </div>
  )
}

function ModalDemo() {
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState("")

  return (
    <>
      <Button variant="primary" onClick={() => setIsOpen(true)}>
        Open Modal
      </Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Create a New Room">
        <div className="space-y-4">
          <Input label="Room Name" placeholder="e.g. Data Structures Crew" value={name} onChange={setName} />
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => { alert("Room created! (demo)"); setIsOpen(false) }}>
              Create Room
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default function ComponentsDemoPage() {
  const [inputValue, setInputValue] = useState("")
  const [errorInput, setErrorInput] = useState("")

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <div className="mx-auto max-w-5xl px-6 py-12 space-y-16">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">UI Component Library</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              PeerSync AI - design system showcase
            </p>
          </div>
          <ThemeToggle />
        </header>

        {/* Buttons */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold border-b border-gray-200 dark:border-gray-700 pb-2">Buttons</h2>
          <div className="space-y-6">
            <div>
              <p className="text-sm text-gray-500 mb-2">Variants x Sizes</p>
              <div className="flex flex-wrap items-end gap-3">
                {(["primary", "secondary", "outline"] as const).map((v) => (
                  <div key={v} className="flex items-end gap-2">
                    {(["sm", "md", "lg"] as const).map((s) => (
                      <Button key={`${v}-${s}`} variant={v} size={s}>
                        {v} {s}
                      </Button>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button variant="primary" disabled>Disabled</Button>
              <Button variant="outline" disabled>Disabled</Button>
              <Button variant="secondary" isLoading>Loading</Button>
              <Button variant="primary" isLoading>Saving</Button>
            </div>
          </div>
        </section>

        {/* Inputs */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold border-b border-gray-200 dark:border-gray-700 pb-2">Inputs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input label="Default Input" placeholder="Type something..." value={inputValue} onChange={setInputValue} />
            <Input label="With Error" placeholder="Required field" value={errorInput} onChange={setErrorInput} error={errorInput.length === 0 ? "This field is required" : undefined} />
            <Input label="Disabled" placeholder="Cannot type here" value="" onChange={() => {}} disabled />
            <Input placeholder="No label (uses aria-label)" aria-label="Unlabeled input" value="" onChange={() => {}} />
          </div>
        </section>

        {/* Modal */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold border-b border-gray-200 dark:border-gray-700 pb-2">Modal</h2>
          <ModalDemo />
        </section>

        {/* Toast */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold border-b border-gray-200 dark:border-gray-700 pb-2">Toast Notifications</h2>
          <ToastDemoButtons />
        </section>

        {/* Loaders */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold border-b border-gray-200 dark:border-gray-700 pb-2">Loaders</h2>
          <div>
            <p className="text-sm text-gray-500 mb-3">Spinner sizes</p>
            <div className="flex items-center gap-6">
              <Loader variant="spinner" size="sm" label="Loading small" />
              <Loader variant="spinner" size="md" label="Loading medium" />
              <Loader variant="spinner" size="lg" label="Loading large" />
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-3">Skeleton loaders</p>
            <div className="space-y-3 max-w-md">
              <Loader variant="skeleton" className="h-24 w-full rounded-lg" />
              <Loader variant="skeleton" className="h-24 w-full rounded-lg" />
              <Loader variant="skeleton" className="h-12 w-3/4 rounded-lg" />
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
