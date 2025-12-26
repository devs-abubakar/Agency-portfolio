
"use client"
import { createContext, useContext } from 'react';

export const CursorContext = createContext({
  cursorState: { active: false, text: '' },
  setCursorState: () => {},
  setHover: () => {},
});

export const useCursor = () => useContext(CursorContext);