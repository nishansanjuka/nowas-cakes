"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from "react";
import type { CartLine } from "@/types";

type AddPayload = Omit<CartLine, "lineId">;

type Action =
  | { type: "add"; line: AddPayload }
  | { type: "remove"; lineId: string }
  | { type: "quantity"; lineId: string; quantity: number }
  | { type: "clear" };

const lineKey = (line: AddPayload) => `${line.productId}:${line.sizeId}:${line.flavorId}`;

function reducer(state: CartLine[], action: Action): CartLine[] {
  switch (action.type) {
    case "add": {
      const key = lineKey(action.line);
      const existing = state.find((line) => line.lineId === key);
      if (existing) {
        return state.map((line) =>
          line.lineId === key
            ? { ...line, quantity: Math.min(line.quantity + action.line.quantity, 20) }
            : line,
        );
      }
      return [...state, { ...action.line, lineId: key }];
    }
    case "remove":
      return state.filter((line) => line.lineId !== action.lineId);
    case "quantity":
      return state.map((line) =>
        line.lineId === action.lineId
          ? { ...line, quantity: Math.min(Math.max(action.quantity, 1), 20) }
          : line,
      );
    case "clear":
      return [];
  }
}

interface CartValue {
  lines: CartLine[];
  count: number;
  subtotal: number;
  currency: string;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addLine: (line: AddPayload) => void;
  removeLine: (lineId: string) => void;
  setQuantity: (lineId: string, quantity: number) => void;
  clear: () => void;
}

const CartContext = createContext<CartValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, dispatch] = useReducer(reducer, []);
  const [isOpen, setOpen] = useState(false);

  const addLine = useCallback((line: AddPayload) => {
    dispatch({ type: "add", line });
    setOpen(true);
  }, []);

  const value = useMemo<CartValue>(() => {
    const count = lines.reduce((total, line) => total + line.quantity, 0);
    const subtotal = lines.reduce((total, line) => total + line.unitPrice * line.quantity, 0);
    return {
      lines,
      count,
      subtotal,
      currency: lines[0]?.currency ?? "USD",
      isOpen,
      openCart: () => setOpen(true),
      closeCart: () => setOpen(false),
      addLine,
      removeLine: (lineId) => dispatch({ type: "remove", lineId }),
      setQuantity: (lineId, quantity) => dispatch({ type: "quantity", lineId, quantity }),
      clear: () => dispatch({ type: "clear" }),
    };
  }, [lines, isOpen, addLine]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartValue {
  const value = useContext(CartContext);
  if (!value) throw new Error("useCart must be used inside CartProvider");
  return value;
}
