import { useEffect, useState } from "react";
import type { Sprint } from "./sprints";
import { sprints as baseSprints } from "./sprints";

const STORAGE_KEY = "sprint.userSprints";
const META_KEY = "sprint.meta";
const UPDATE_EVENT = "sprint-updated";

export type SprintStatus = "active" | "review" | "done" | "closed";

export type SprintMeta = {
  id: string;
  status: SprintStatus;
  applicantTeams: number;
  createdAt: number;
};

const canUseStorage = () =>
  typeof window !== "undefined" && typeof window.localStorage !== "undefined";

const safeParse = (raw: string | null): Sprint[] => {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(Boolean) as Sprint[];
  } catch {
    return [];
  }
};

const safeParseMeta = (raw: string | null): Record<string, SprintMeta> => {
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return {};
    return parsed as Record<string, SprintMeta>;
  } catch {
    return {};
  }
};

export const getStoredSprints = (): Sprint[] => {
  if (!canUseStorage()) return [];
  return safeParse(window.localStorage.getItem(STORAGE_KEY));
};

export const getStoredSprintMeta = (): Record<string, SprintMeta> => {
  if (!canUseStorage()) return {};
  return safeParseMeta(window.localStorage.getItem(META_KEY));
};

const setStoredSprintMeta = (next: Record<string, SprintMeta>) => {
  if (!canUseStorage()) return;
  window.localStorage.setItem(META_KEY, JSON.stringify(next));
};

const hashString = (value: string) => {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 31 + value.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
};

const seededNumber = (seed: string, min: number, max: number) => {
  const range = max - min + 1;
  return min + (hashString(seed) % range);
};

export const getSprintMeta = (sprint: Sprint): SprintMeta => {
  const stored = getStoredSprintMeta();
  const existing = stored[sprint.id];
  if (existing) return existing;

  const statusPool: SprintStatus[] = ["active", "review", "done", "closed"];
  const status = statusPool[hashString(sprint.id) % statusPool.length];
  const baseEpoch = 1700000000000;
  const createdAt = baseEpoch + seededNumber(sprint.id, 0, 400) * 86400000;
  return {
    id: sprint.id,
    status,
    applicantTeams: seededNumber(sprint.id, 3, 12),
    createdAt,
  };
};

export const saveSprintMeta = (meta: SprintMeta) => {
  const stored = getStoredSprintMeta();
  const next = { ...stored, [meta.id]: meta };
  setStoredSprintMeta(next);
  window.dispatchEvent(new Event(UPDATE_EVENT));
};

export const getAllSprints = (): Sprint[] => {
  const stored = getStoredSprints();
  const merged = new Map<string, Sprint>();
  for (const item of [...stored, ...baseSprints]) {
    if (!merged.has(item.id)) merged.set(item.id, item);
  }
  return Array.from(merged.values());
};

export const saveSprint = (sprint: Sprint) => {
  if (!canUseStorage()) return;
  const stored = getStoredSprints();
  const next = [sprint, ...stored.filter((item) => item.id !== sprint.id)];
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  saveSprintMeta({
    id: sprint.id,
    status: "active",
    applicantTeams: 0,
    createdAt: Date.now(),
  });
  window.dispatchEvent(new Event(UPDATE_EVENT));
};

export const updateSprint = (sprint: Sprint) => {
  if (!canUseStorage()) return;
  const stored = getStoredSprints();
  const exists = stored.some((item) => item.id === sprint.id);
  const next = exists
    ? stored.map((item) => (item.id === sprint.id ? sprint : item))
    : [sprint, ...stored];
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  window.dispatchEvent(new Event(UPDATE_EVENT));
};

export const setSprintStatus = (id: string, status: SprintStatus) => {
  const stored = getStoredSprintMeta();
  const existing = stored[id];
  const applicantTeams = existing?.applicantTeams ?? seededNumber(id, 3, 12);
  const createdAt =
    existing?.createdAt ??
    1700000000000 + seededNumber(id, 0, 400) * 86400000;
  saveSprintMeta({ id, status, applicantTeams, createdAt });
};

export const useSprints = () => {
  const [items, setItems] = useState<Sprint[]>(() => getAllSprints());

  useEffect(() => {
    const handleUpdate = () => setItems(getAllSprints());
    window.addEventListener("storage", handleUpdate);
    window.addEventListener(UPDATE_EVENT, handleUpdate);
    return () => {
      window.removeEventListener("storage", handleUpdate);
      window.removeEventListener(UPDATE_EVENT, handleUpdate);
    };
  }, []);

  return items;
};
