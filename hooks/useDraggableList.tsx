import { useEffect, useState } from "react";

export const useDraggableList = (initialItems: any[]) => {
  const [items, setItems] = useState(initialItems);
  const [draggedItemId, setDraggedItemId] = useState<string | number | null>(null);

  useEffect(() => {
    setItems(initialItems);
  }, [initialItems]);

  const handleDragStart = (e: React.DragEvent, id: string | number) => {
    setDraggedItemId(id);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent, id: string | number) => {
    e.preventDefault();
    if (draggedItemId === id) return;

    const draggedIndex = items.findIndex((item) => item.id === draggedItemId);
    const targetIndex = items.findIndex((item) => item.id === id);

    if (draggedIndex !== -1 && targetIndex !== -1) {
      const updatedItems = [...items];
      const [draggedItem] = updatedItems.splice(draggedIndex, 1);
      updatedItems.splice(targetIndex, 0, draggedItem);
      setItems(updatedItems);
    }
  };

  const handleDragEnd = () => {
    setDraggedItemId(null);
  };

  return {
    items,
    setItems,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    draggedItemId
  };
};