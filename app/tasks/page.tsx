"use client";

import { FormEvent, useMemo, useState } from "react";
import { useLocalStorage } from "@/lib/use-local-storage";

type TaskItem = {
  id: string;
  title: string;
  done: boolean;
  bucket: "Inbox" | "Today" | "Upcoming";
};

const defaultTasks: TaskItem[] = [
  { id: "t1", title: "Préparer déclaration impôts", done: false, bucket: "Inbox" },
  { id: "t2", title: "Payer facture eau", done: false, bucket: "Today" },
  { id: "t3", title: "Contrôle voiture", done: false, bucket: "Upcoming" }
];

const buckets: TaskItem["bucket"][] = ["Inbox", "Today", "Upcoming"];

export default function TasksPage() {
  const { value: tasks, setValue: setTasks, ready } = useLocalStorage<TaskItem[]>(
    "lifeos.tasks",
    defaultTasks
  );
  const [title, setTitle] = useState("");
  const [bucket, setBucket] = useState<TaskItem["bucket"]>("Inbox");

  const completion = useMemo(() => {
    const done = tasks.filter((task) => task.done).length;
    return `${done}/${tasks.length}`;
  }, [tasks]);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) {
      return;
    }

    setTasks([
      {
        id: `t-${Date.now()}`,
        title: trimmed,
        done: false,
        bucket
      },
      ...tasks
    ]);
    setTitle("");
  }

  function toggleTask(taskId: string) {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, done: !task.done } : task)));
  }

  function removeTask(taskId: string) {
    setTasks(tasks.filter((task) => task.id !== taskId));
  }

  if (!ready) {
    return <section className="card">Chargement des tâches...</section>;
  }

  return (
    <section className="stack page-enter">
      <article className="card card-header-row">
        <div>
          <h2>Tasks & Routines</h2>
          <p className="muted-text">Progression: {completion} terminées.</p>
        </div>
      </article>

      <article className="card">
        <form className="form-grid" onSubmit={onSubmit}>
          <input
            className="search-input"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Nouvelle tâche"
          />
          <select
            className="select-input"
            value={bucket}
            onChange={(event) => setBucket(event.target.value as TaskItem["bucket"])}
          >
            {buckets.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <button className="button-primary" type="submit">
            + Ajouter
          </button>
        </form>
      </article>

      <section className="grid-three">
        {buckets.map((group) => (
          <article key={group} className="card">
            <h3>{group}</h3>
            <ul className="list-clean">
              {tasks
                .filter((task) => task.bucket === group)
                .map((task) => (
                  <li key={task.id}>
                    <button className="icon-button" type="button" onClick={() => toggleTask(task.id)}>
                      {task.done ? "✅" : "⬜"}
                    </button>
                    <span className={task.done ? "line-through" : ""}>{task.title}</span>
                    <button className="danger-button" type="button" onClick={() => removeTask(task.id)}>
                      Suppr.
                    </button>
                  </li>
                ))}
            </ul>
          </article>
        ))}
      </section>
    </section>
  );
}
