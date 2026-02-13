import React from 'react';

export type TabView = 'DASHBOARD' | 'GERMAN' | 'TECH' | 'ISLAM' | 'STORIES' | 'DICTIONARY' | 'LEVELS' | 'DISCIPLINE' | 'LIBRARY';

export interface Lesson {
  title: string;
  track: 'Grammatik B1' | 'Hören & Lesen' | 'Sprechen & Schreiben' | 'Fachinformatik' | 'Exam Prep';
  order: number;
  notes: string;
  examWeight: 'High' | 'Medium' | 'Low';
  completed: boolean;
  certification?: 'CISCO' | 'MICROSOFT' | 'GOOGLE' | null;
}

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export type DayStatus = 'SUCCESS' | 'FAIL' | 'PENDING';
export type CalendarHistory = Record<string, DayStatus>;

// --- LIBRARY SYSTEM ---
export type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1';
export type LibraryCategory = 'STORY' | 'VIDEO' | 'AUDIOBOOK' | 'EXAM_SCENARIO';

export interface LibraryItem {
  id: string;
  title: string;
  author?: string;
  level: CEFRLevel;
  category: LibraryCategory;
  tags: string[]; // e.g., "Arbeit", "Reisen", "Humor"
  coverGradient: string; // CSS gradient string for UI
  content?: string; // HTML/Text for reading
  url?: string; // External link for Nicos Weg/Videos
  duration?: string; // "5 min read" or "10:00 video"
}

// --- GERMAN BLOCK SYSTEM ---
export interface GermanBlock {
  title: string;
  content: string; // HTML/Markdown allowed
  type: 'GRAMMAR_CORE' | 'VOCAB_CLUSTER' | 'EXAM_SKILLS' | 'VIDEO_HUB' | 'STORY_MODE';
  vocabData?: { german: string; arabic: string }[]; // Specific for Vocab tables
}

export interface GermanContent {
  blocks: GermanBlock[];
}

export type StaticGermanContent = GermanContent;

// --- TECH LAB SYSTEM ---
export interface TechLabStep {
  cmd?: string;
  desc: string;
}

export interface TechResource {
  title: string;
  url: string;
  type: 'VIDEO' | 'DOC' | 'LAB';
}

export interface TechContent {
  summary: string;
  labTitle: string;
  labSteps: TechLabStep[];
  portfolioTask: string;
  resources: TechResource[];
}

export type StaticTechContent = TechContent;

// --- ISLAM & EXTRAS ---
export interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}

export interface DictionaryEntry {
  id?: string;
  word: string;
  translation: string;
  context: 'TECH' | 'GERMAN';
  example: string;
  addedAt?: Date;
}

// --- STORY ENGINE ---
export interface StoryChoice {
  text: string;
  nextStageId: string;
  requiredXp?: number;
}

export interface StoryStage {
  id: string;
  title: string;
  text: string; // German text
  translation: string; // Arabic context
  choices: StoryChoice[];
  bgImage?: string;
}

export interface Story {
  id: string;
  title: string;
  stages: Record<string, StoryStage>;
  startStageId: string;
}