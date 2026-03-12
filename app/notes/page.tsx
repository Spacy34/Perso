"use client";

import { FormEvent, useState } from "react";
import { useLocalStorage } from "@/lib/use-local-storage";

type Note = { id: string; title: string; content: string; createdAt: string };

const initialNotes: Note[] = [
  {
    id: "n1",
    title: "Idées d'automations Home Assistant",
    content: "Créer un rappel si fenêtre ouverte + absence > 30 min.",
    createdAt: "2026-03-10"
  }
];

export default function NotesPage() {
  const { value: notes, setValue: setNotes, ready } = useLocalStorage<Note[]>("lifeos.notes", initialNotes);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  function addNote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!title.trim()) {
      return;
    }

    setNotes([
      {
        id: `n-${Date.now()}`,
        title: title.trim(),
        content: content.trim(),
        createdAt: new Date().toISOString().slice(0, 10)
      },
      ...notes
    ]);
    setTitle("");
    setContent("");
  }

  function removeNote(noteId: string) {
    setNotes(notes.filter((note) => note.id !== noteId));
  }

  if (!ready) {
    return <section className="card">Chargement des notes...</section>;
  }

  return (
    <section className="stack page-enter">
      <article className="card">
        <h2>Notes</h2>
        <p className="muted-text">Capture rapide et transformation en actions.</p>
      </article>

      <article className="card">
        <form className="stack" onSubmit={addNote}>
          <input
            className="search-input"
            placeholder="Titre de la note"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <textarea
            className="text-area"
            placeholder="Contenu"
            value={content}
            onChange={(event) => setContent(event.target.value)}
          />
          <button className="button-primary" type="submit">
            + Ajouter note
          </button>
        </form>
      </article>

      <article className="card">
        <h3>Dernières notes</h3>
        <ul className="list-clean">
          {notes.map((note) => (
            <li key={note.id} className="list-item-col">
              <div>
                <strong>{note.title}</strong>
                <p className="muted-text">{note.createdAt}</p>
                {note.content ? <p>{note.content}</p> : null}
              </div>
              <button className="danger-button" type="button" onClick={() => removeNote(note.id)}>
                Suppr.
              </button>
            </li>
          ))}
        </ul>
      </article>
    </section>
  );
}
