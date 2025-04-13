"use client";

import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
  DragEndEvent,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  useSortable,
  rectSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import {
  CalendarDays,
  ChevronDown,
  Copy,
  CopyCheck,
  GripVertical,
  Heading,
  ListMinus,
  Plus,
  Square,
  User,
} from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import { Button } from "./ui/button"

type ComponentItem = {
  id: string
  icon: JSX.Element
  label: string
}

const icons = {
  user: <User className="text-blue-500 size-5" />,
  heading: <Heading className="text-blue-500 size-5" />,
  square: <Square className="text-blue-500 size-5" />,
  copyCheck: <CopyCheck className="text-blue-500 size-5" />,
  copy: <Copy className="text-blue-500 size-5" />,
}

const initialComponents: ComponentItem[] = [
  { id: "identity", icon: icons.user, label: "Identity" },
  { id: "disclaimer", icon: icons.heading, label: "Disclai.." },
  { id: "next", icon: icons.square, label: "Next But.." },
  { id: "multi", icon: icons.copyCheck, label: "Multipl.." },
  { id: "graphic", icon: icons.copy, label: "Graphi.." },
  { id: "heading", icon: icons.heading, label: "Heading.." },
]

const SortableItem: React.FC<ComponentItem> = ({ id, icon, label }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="w-[48%] py-3 cursor-move"
    >
      <div className="flex items-center gap-4">
        <GripVertical className="size-5" />
        <div className="flex items-center gap-4">
          {icon}
          <span className="text-gray-800 font-medium">{label}</span>
        </div>
      </div>
    </li>
  )
}

const DragDropComponent: React.FC = () => {
  const [components, setComponents] = useState<ComponentItem[]>(
    initialComponents
  )

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (active.id !== over?.id) {
      const oldIndex = components.findIndex((c) => c.id === active.id)
      const newIndex = components.findIndex((c) => c.id === over?.id)

      setComponents((items) => arrayMove(items, oldIndex, newIndex))
    }
  }

  const addComponent = (id: string, icon: JSX.Element, label: string) => {
    setComponents((prev) => [
      ...prev,
      { id: `${id}-${Date.now()}`, icon, label },
    ])
  }

  return (
    <div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={components.map((c) => c.id)}
          strategy={rectSortingStrategy}
        >
          <ul className="flex flex-wrap items-start gap-3">
            {components.map((item) => (
              <SortableItem key={item.id} {...item} />
            ))}
          </ul>
        </SortableContext>
      </DndContext>

      <div className="my-4 border-y-[1px] py-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="flex items-center gap-3 text-blue-500" variant="ghost">
              <Plus />
              Add Component
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() =>
                  addComponent(
                    "dropdown",
                    <ChevronDown className="text-purple-500 size-5" />,
                    "Dropdown"
                  )
                }
              >
                <ChevronDown className="text-purple-500 size-5 mr-2" />
                Dropdown
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  addComponent(
                    "short",
                    <ListMinus className="text-green-600 size-5" />,
                    "Short Input"
                  )
                }
              >
                <ListMinus className="text-green-600 size-5 mr-2" />
                Short Input
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  addComponent(
                    "long",
                    <ListMinus className="text-orange-700 size-5" />,
                    "Long Input"
                  )
                }
              >
                <ListMinus className="text-orange-700 size-5 mr-2" />
                Long Input
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  addComponent(
                    "schedule",
                    <CalendarDays className="text-orange-500 size-5" />,
                    "Scheduler"
                  )
                }
              >
                <CalendarDays className="text-orange-500 size-5 mr-2" />
                Scheduler
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  addComponent(
                    "header",
                    <Heading className="text-red-500 size-5" />,
                    "Header"
                  )
                }
              >
                <Heading className="text-red-500 size-5 mr-2" />
                Header
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  addComponent(
                    "text",
                    <Heading className="text-blue-500 size-5" />,
                    "Text"
                  )
                }
              >
                <Heading className="text-blue-500 size-5 mr-2" />
                Text
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

export default DragDropComponent
